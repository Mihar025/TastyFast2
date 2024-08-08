/* tslint:disable */
/* eslint-disable */
import { OrderItemResponse } from '../models/order-item-response';
export interface OrderResponse {
  id?: number;
  items?: Array<OrderItemResponse>;
  orderDate?: string;
  status?: string;
  totalAmount?: number;
}
