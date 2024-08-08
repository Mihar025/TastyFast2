/* tslint:disable */
/* eslint-disable */
import { User } from '../models/user';
export interface Notification {
  createdAt?: string;
  id?: number;
  message?: string;
  read?: boolean;
  user?: User;
}
