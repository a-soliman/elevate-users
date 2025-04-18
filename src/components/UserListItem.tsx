import { useEffect, useState } from 'react';
import { ID, IUser } from '../data/types/user';
import logger from '../services/logger';
import { apiService } from '../services/api';
import { Loading } from './Loading';
import './UserListItem.css';

interface Props {
  id: ID;
}

export function UserListItem({ id }: Props) {
  const [pending, setPending] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    (async () => {
      setPending(true);
      try {
        const response = await apiService.getUserInfo(id);
        setUser(response);
      } catch (err) {
        logger.error(`Error while running getUserInfo(), userId = ${id} = err = `, err);
        setError('We encountered an error, out team is working on it - please try again later');
      } finally {
        setPending(false);
      }
    })();
  }, [id]);

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

  if (pending) return <Loading />;

  if (error) return null; // we already logged the error, IMO no benefit from telling the user here that this failed, hence not rendering anything

  return (
    <div className="user-list-item" id={id.toString()}>
      <div className="profile-image-wrapper">
        <img className="profile-image" src={getProfilePictureValue()} alt={getFullName()} />
      </div>
      <div className="fullname-wrapper">
        <p>{getFullName()}</p>
      </div>
    </div>
  );
}
