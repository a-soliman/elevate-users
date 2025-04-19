import { useEffect, useRef, useState } from 'react';
import { useUserContext } from '../contexts/UserContext';
import { CarouselItem } from './CarouselItem';
import './Carousel.css';

export function Carousel() {
  const { usersList } = useUserContext();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [angle, setAngle] = useState<number>(0);
  const angleIncrement = 360 / usersList.length;

  const containerRef = useRef<HTMLDivElement | null>(null);
  // const scrollLock = useRef<boolean>(false);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const rotateCarousel = (direction: number) => {
    setAngle((prevAngle) => {
      const newAngle = prevAngle + direction * angleIncrement;

      // Wait for 2 animation frames to ensure DOM has updated
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          updateActiveIndex();
        });
      });

      return newAngle;
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let maxY = -Infinity;
    let indexAtBottom = 0;

    itemRefs.current.forEach((item, index) => {
      if (!item) return;
      const rect = item.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;

      if (centerY > maxY) {
        maxY = centerY;
        indexAtBottom = index;
      }
    });

    setActiveIndex(indexAtBottom);
  }, [angle]);

  // Scroll Handler
  useEffect(() => {
    let deltaSum = 0;
    const scrollLock = { locked: false };

    const handleWheel = (evt: WheelEvent) => {
      evt.stopPropagation();
      evt.preventDefault();

      if (scrollLock.locked) return;

      const scrollAmount = evt.deltaY !== 0 ? evt.deltaY : -evt.deltaX;
      deltaSum += scrollAmount;

      const threshold = 40;

      if (deltaSum > threshold) {
        rotateCarousel(1);
        lockScroll();
      } else if (deltaSum < -threshold) {
        rotateCarousel(-1);
        lockScroll();
      }
    };

    const lockScroll = () => {
      scrollLock.locked = true;
      deltaSum = 0;
      setTimeout(() => {
        scrollLock.locked = false;
      }, 300);
    };

    const container = containerRef.current;

    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [angleIncrement]);

  const updateActiveIndex = () => {
    let maxY = -Infinity;
    let indexAtBottom = 0;

    itemRefs.current.forEach((item, index) => {
      if (!item) return;

      const rect = item.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;

      if (centerY > maxY) {
        maxY = centerY;
        indexAtBottom = index;
      }
    });

    setActiveIndex(indexAtBottom);
  };

  return (
    <div className="carousel-container" ref={containerRef}>
      <div className="carousel" style={{ transform: `rotate(${angle}deg)` }}>
        {usersList.map((user, index) => {
          const itemAngle = index * angleIncrement;
          return (
            <CarouselItem
              key={index}
              angle={itemAngle}
              user={user}
              isActive={activeIndex === index}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
