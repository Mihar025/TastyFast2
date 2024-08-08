/* tslint:disable */
/* eslint-disable */
import { Cart } from '../models/cart';
export interface CartItem {
  cart?: Cart;
  cartItem_id?: number;
  itemId?: number;
  itemName?: string;
  itemType?: string;
  price?: number;
  quantity?: number;
}
