/* tslint:disable */
/* eslint-disable */
import { CartItem } from '../models/cart-item';
import { User } from '../models/user';
export interface Cart {
  cartItems?: Array<CartItem>;
  cart_id?: number;
  createdAt?: string;
  updatedAt?: string;
  user?: User;
}
