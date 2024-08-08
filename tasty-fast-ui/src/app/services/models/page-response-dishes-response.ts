/* tslint:disable */
/* eslint-disable */
import { DishesResponse } from '../models/dishes-response';
export interface PageResponseDishesResponse {
  content?: Array<DishesResponse>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElement?: number;
  totalPages?: number;
}
