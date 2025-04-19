import { useParams } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';
import { UserDetails } from '../components/UserDetails';

export default function UserPage() {
  const { getUser } = useUserContext();
  const { id = '100' } = useParams();

  const user = getUser(parseInt(id));
  return <UserDetails user={user} />;
}
