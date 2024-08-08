/* tslint:disable */
/* eslint-disable */
import { ProductResponse } from '../models/product-response';
export interface PageResponseProductResponse {
  content?: Array<ProductResponse>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElement?: number;
  totalPages?: number;
}
