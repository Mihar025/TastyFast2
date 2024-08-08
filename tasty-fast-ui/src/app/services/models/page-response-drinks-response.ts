/* tslint:disable */
/* eslint-disable */
import { DrinksResponse } from '../models/drinks-response';
export interface PageResponseDrinksResponse {
  content?: Array<DrinksResponse>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElement?: number;
  totalPages?: number;
}
