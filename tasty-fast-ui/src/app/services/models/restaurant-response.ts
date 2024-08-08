/* tslint:disable */
/* eslint-disable */
import { DishesResponse } from '../models/dishes-response';
import { DrinksResponse } from '../models/drinks-response';
import { FeedBackResponse } from '../models/feed-back-response';
import { OrderResponse } from '../models/order-response';
export interface RestaurantResponse {
  active?: boolean;
  address?: string;
  cuisineType?: string;
  deliveryAvailable?: boolean;
  description?: string;
  dishesResponses?: Array<DishesResponse>;
  drinksResponses?: Array<DrinksResponse>;
  email?: string;
  feedBackResponses?: Array<FeedBackResponse>;
  logoUrl?: string;
  openingHours?: string;
  orderResponses?: Array<OrderResponse>;
  ownerId?: number;
  phoneNumber?: string;
  rating?: number;
  restaurantId?: number;
  restaurantName?: string;
  seatingCapacity?: number;
  websiteUrl?: string;
}
