/* tslint:disable */
/* eslint-disable */
import { OrderResponse } from '../models/order-response';
export interface PageResponseOrderResponse {
  content?: Array<OrderResponse>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElement?: number;
  totalPages?: number;
}
