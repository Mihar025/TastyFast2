/* tslint:disable */
/* eslint-disable */
import { StoreResponse } from '../models/store-response';
export interface PageResponseStoreResponse {
  content?: Array<StoreResponse>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElement?: number;
  totalPages?: number;
}
