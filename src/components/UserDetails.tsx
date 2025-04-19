import { IUser, IUserSkillItem } from '../data/types/user';
import { getFullName, getProfilePictureValue } from '../utils/userUtils';
import { AnimatedSkillBar } from './AnimatedSkillBar';
import './UserDetails.css';

interface Props {
  user: IUser;
}
export function UserDetails({ user }: Props) {
  const stats: Record<string, IUserSkillItem> = {
    math: user.stats.skills.math,
    reading: user.stats.skills.reading,
    speaking: user.stats.skills.speaking,
    writing: user.stats.skills.writing,
  };

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
      <div className="progress">
        {Object.entries(stats).map(([key, value]) => (
          <AnimatedSkillBar key={key} title={key} state={value} />
        ))}
      </div>
    </section>
  );
}
