import { IUser } from '../data/types/user';
import { getStats } from '../utils/userUtils';
import { AnimatedSkillBar } from './AnimatedSkillBar';
import './UserProgress.css';
interface Props {
  user: IUser
}
export function UserProgress({ user }: Props) {
  return (
    <div className="progress">
      {Object.entries(getStats(user)).map(([key, value]) => (
        <AnimatedSkillBar key={key} title={key} state={value} />
      ))}
    </div>
  );
}
