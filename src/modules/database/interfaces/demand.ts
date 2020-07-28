import { IUser } from './user';

export interface IDemand {
  id?: number;
  name: string;
  userId?: number;
  user?: IUser;
}
