import { useEffect, useRef, useState } from 'react';
import { useUserContext } from '../../contexts/UserContext';
import { CarouselController, Direction } from './CarouselController';
import { CarouselItem } from './CarouselItem';
import './Carousel.css';

export function Carousel() {
  const { usersList } = useUserContext();
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let deltaSum = 0;
    const scrollLock = { locked: false };

    // This function makes sure that we scroll smoothly
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (scrollLock.locked) return;

      const scrollAmount = e.deltaY !== 0 ? e.deltaY : -e.deltaX;
      deltaSum += scrollAmount;

      const threshold = 40;

      if (deltaSum > threshold) {
        handleControllerClick(Direction.Right);
        lockScroll();
      } else if (deltaSum < -threshold) {
        handleControllerClick(Direction.Left);
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

    // now we bind the event
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('wheel', handleWheel, { passive: false });
    }

    // and clean up
    return () => {
      if (carousel) {
        carousel.removeEventListener('wheel', handleWheel);
      }
    };
  }, [handleControllerClick]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function handleControllerClick(direction: Direction) {
    let newActiveIndex = activeIdx;
    if (direction === Direction.Left) {
      newActiveIndex--;
      if (newActiveIndex < 0) newActiveIndex = usersList.length - 1;
    } else {
      newActiveIndex++;
      if (newActiveIndex === usersList.length) newActiveIndex = 0;
    }
    shouldScroll(newActiveIndex);
    setActiveIdx(newActiveIndex);
  }

  const shouldScroll = (index: number) => {
    const activeItem = document.getElementById(`${index.toString()}`);
    if (!activeItem || !carouselRef.current || !containerRef.current) return;

    const delta = -50;
    const itemRect = activeItem.getBoundingClientRect();
    const containerRect = carouselRef.current?.getBoundingClientRect();
    const shouldScrollLeft = itemRect.right + delta > containerRect.right;
    const shouldScrollRight = itemRect.left - delta < containerRect.left;
    if (shouldScrollLeft) {
      containerRef.current.scrollLeft -= containerRect.right - itemRect.right + delta;
    }
    if (shouldScrollRight) {
      containerRef.current.scrollLeft += itemRect.left - containerRect.left + delta;
    }
  };

  return (
    <section className="carousel" ref={carouselRef}>
      <CarouselController direction={Direction.Left} clickHandler={handleControllerClick} />
      <div className="items-container" ref={containerRef}>
        {usersList.map((user, idx) => (
          <CarouselItem user={user} key={idx} active={activeIdx === idx} />
        ))}
      </div>
      <CarouselController direction={Direction.Right} clickHandler={handleControllerClick} />
    </section>
  );
}
