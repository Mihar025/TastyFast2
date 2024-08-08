/* tslint:disable */
/* eslint-disable */
import { OrderItemRequest } from '../models/order-item-request';
export interface OrderRequest {
  items?: Array<OrderItemRequest>;
  orderType?: string;
  sourceId?: number;
}
