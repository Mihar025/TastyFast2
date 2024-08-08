/* tslint:disable */
/* eslint-disable */
import { RestaurantResponse } from '../models/restaurant-response';
export interface PageResponseRestaurantResponse {
  content?: Array<RestaurantResponse>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElement?: number;
  totalPages?: number;
}
