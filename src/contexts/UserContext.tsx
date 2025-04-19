import { createContext, useState, useEffect, useContext } from 'react';
import { ID, IUser } from '../data/types/user';
import logger from '../services/loggerService';
import { apiService } from '../services/apiService';

interface UserContextProps {
  users: Record<ID, IUser>;
  usersList: IUser[];
  pending: boolean;
  error: string;
  getUser: (id: ID) => IUser;
}

const defaultContextValue: UserContextProps = {
  users: {},
  usersList: [],
  pending: false,
  error: '',
  getUser: (id: ID) => {
    return {} as IUser;
  },
};

const UserContext = createContext<UserContextProps>(defaultContextValue);

export const useUserContext = () => useContext(UserContext);

interface ProviderProps {
  children?: React.ReactNode;
}

export const UserProvider = ({ children }: ProviderProps) => {
  const [pending, setPending] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [users, setUsers] = useState<Record<ID, IUser>>({});

  useEffect(() => {
    async function populateAllUsers(userIds: ID[], resultHash: Record<ID, IUser>): Promise<void[]> {
      return Promise.all(userIds.map((id) => populateUser(id, resultHash)));
    }

    (async () => {
      logger.info('Init getUsers');
      setPending(true);

      try {
        const userIds = await apiService.getUsers();
        const resultHash: Record<ID, IUser> = {};
        await populateAllUsers(userIds, resultHash);
        setUsers(resultHash);
      } catch (err) {
        logger.error(`Error while running getUsers(), err = `, err);
        setError('We encountered an error, out team is working on it - please try again later');
      } finally {
        setPending(false);
      }
    })();
  }, []);

  const populateUser = async (id: ID, resultHash: Record<ID, IUser>): Promise<void> => {
    try {
      const response = await apiService.getUserInfo(id);
      resultHash[id] = response;
    } catch (err) {
      logger.error(`Error while running getUserInfo(), userId = ${id} = err = `, err);
    }
  };

  const usersList = (): IUser[] => {
    return Object.values(users);
  };

  const getUser = (id: ID): IUser => {
    return users[id];
  };

  const contextValue: UserContextProps = {
    users,
    pending,
    error,
    usersList: usersList(),
    getUser,
  };

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};
