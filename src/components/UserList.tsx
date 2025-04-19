import { Loading } from './Loading';
import { UserListItem } from './UserListItem';
import './UserList.css';
import { useUserContext } from '../contexts/UserContext';

export function UserList() {
  const { usersList, pending, error } = useUserContext();

  return (
    <div className="user-list">
      <div className="user-list-header">Users</div>
      {pending ? <Loading /> : error ? <div className="error">{error}</div> : usersList.map((user) => <UserListItem user={user} key={user.id} />)}
    </div>
  );
}
