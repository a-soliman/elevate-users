import { useRef } from 'react';
import { IUser } from '../../data/types/user';
import { getFullName, getProfilePictureValue } from '../../utils/userUtils';
import './CarouselItem.css';
import { UserProgress } from '../UserProgress';

interface Props {
  user: IUser;
  active: boolean;
}

export function CarouselItem({ user, active }: Props) {
  const itemRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className={`carousel-item ${active ? 'active' : ''}`} ref={itemRef} id={user.id.toString()}>
      <div className="permanent-content">
        <img src={getProfilePictureValue(user)} alt={getFullName(user)} />
        <div className="name">{getFullName(user)}</div>
      </div>

      <div className="stats">{active && <UserProgress user={user} />}</div>
    </div>
  );
}
