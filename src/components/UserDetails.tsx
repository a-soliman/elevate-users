import { IUser } from '../data/types/user';
import { getFullName, getProfilePictureValue } from '../utils/userUtils';
import { UserProgress } from './UserProgress';
import './UserDetails.css';

interface Props {
  user: IUser;
}
export function UserDetails({ user }: Props) {
  return (
    <section className="user-details">
      <div className="row">
        <div className="profile-image-wrapper">
          <img className="profile-image" src={getProfilePictureValue(user)} alt={getFullName(user)} />
        </div>
        <div className="details-wrapper">
          <div className="name">{getFullName(user)}</div>
          <div>{user.stats.current_streak_in_days}-day Streak</div>
          <div>{user.stats.total_sessions_played} Sessions</div>
        </div>
      </div>
      <UserProgress user={user} />
    </section>
  );
}
