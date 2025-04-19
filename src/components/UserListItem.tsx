import { IUser } from '../data/types/user';
import './UserListItem.css';
import { Link } from 'react-router-dom';

interface Props {
  user: IUser;
}

export function UserListItem({ user }: Props) {
  const getFullName = () => {
    if (!user) return '';
    return `${user.first_name || 'UNKNOWN'} ${user.first_name || 'UNKNOWN'}`;
  };

  const getProfilePictureValue = () => {
    if (!user?.image) {
      return 'https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351974-stock-illustration-default-placeholder-woman.jpg'; // a generic user profile image
    }
    return `data:image/jpeg;base64,${user?.image}`;
  };

  return (
    <div className="user-list-item" id={user.id.toString()}>
      <Link to={`/user/${user.id}`}>
        <div className="profile-image-wrapper">
          <img className="profile-image" src={getProfilePictureValue()} alt={getFullName()} />
        </div>
        <div className="fullname-wrapper">
          <p>{getFullName()}</p>
        </div>
      </Link>
    </div>
  );
}
