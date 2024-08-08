/* tslint:disable */
/* eslint-disable */
import { OrderItemResponse } from '../models/order-item-response';
export interface OrderDetailsResponse {
  items?: Array<OrderItemResponse>;
  orderDate?: string;
  orderId?: number;
  orderType?: string;
  status?: string;
  totalAmount?: number;
  totalQuantity?: number;
}
