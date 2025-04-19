import { IUser } from '../data/types/user';

export const getProfilePictureValue = (user: IUser) => {
  if (!user.image) {
    return 'https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351974-stock-illustration-default-placeholder-woman.jpg'; // a generic user profile image
  }
  return `data:image/jpeg;base64,${user.image}`;
};

export const getFullName = (user: IUser) => {
  return `${user.first_name || 'UNKNOWN'} ${user.first_name || 'UNKNOWN'}`;
};
