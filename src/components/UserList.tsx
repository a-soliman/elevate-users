import { useEffect, useState } from 'react';
import { ID } from '../data/types/user';
import logger from '../services/logger';
import { apiService } from '../services/api';
import { Loading } from './Loading';
import { UserListItem } from './UserListItem';
import './UserList.css';

export function UserList() {
  const [pending, setPending] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [userIds, setUserIds] = useState<ID[]>([]);

  useEffect(() => {
    (async () => {
      logger.info('Init getUsers');
      setPending(true);

      try {
        const userIds = await apiService.getUsers();
        setUserIds(userIds);
      } catch (err) {
        logger.error(`Error while running getUsers(), err = `, err);
        setError('We encountered an error, out team is working on it - please try again later');
      } finally {
        setPending(false);
      }
    })();
  }, []);

  return (
    <div className="user-list">
      <div className='user-list-header'>Users</div>
      {pending ? <Loading /> : error ? <div className="error">{error}</div> : userIds.map((id) => <UserListItem id={id} key={id} />)}
    </div>
  );
}
