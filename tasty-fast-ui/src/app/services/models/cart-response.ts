/* tslint:disable */
/* eslint-disable */
import { CartItemResponse } from '../models/cart-item-response';
export interface CartResponse {
  id?: number;
  items?: Array<CartItemResponse>;
  totalAmount?: number;
}
