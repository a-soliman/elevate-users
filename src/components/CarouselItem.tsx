import { forwardRef } from 'react';
import { IUser } from '../data/types/user';
import { getFullName, getProfilePictureValue } from '../utils/userUtils';
import './CarouselItem.css';

interface Props {
  angle: number;
  user: IUser;
  isActive: boolean;
}

export const CarouselItem = forwardRef<HTMLDivElement, Props>(({ angle, user, isActive }, ref) => {
  return (
    <>
      <div
        ref={ref}
        className={`carousel-item ${isActive ? 'active' : ''}`}
        style={{
          transform: `rotate(${angle}deg) translate(0, -200px)`,
        }}
      >
        <div
          className="carousel-item-inner"
          style={{
            transform: `rotate(${-angle}deg)`,
          }}
        >
          <img src={getProfilePictureValue(user)} alt={getFullName(user)} />
          {/* <div>name name</div> */}
        </div>
      </div>
    </>
  );
});
