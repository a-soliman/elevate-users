import { IUser } from '../data/types/user';
import { getFullName, getProfilePictureValue } from '../utils/userUtils';
import './UserListItem.css';
import { Link } from 'react-router-dom';

interface Props {
  user: IUser;
}

export function UserListItem({ user }: Props) {
  return (
    <div className="user-list-item" id={user.id.toString()}>
      <Link to={`/user/${user.id}`}>
        <div className="profile-image-wrapper">
          <img className="profile-image" src={getProfilePictureValue(user)} alt={getFullName(user)} />
        </div>
        <div className="fullname-wrapper">
          <p>{getFullName(user)}</p>
        </div>
      </Link>
    </div>
  );
}
