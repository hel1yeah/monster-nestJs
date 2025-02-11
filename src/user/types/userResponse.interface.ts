import { UserType } from './user.type';

interface TokenInterface {
  token: string;
}

export interface UserResponseInterface {
  user: UserType & TokenInterface;
}
