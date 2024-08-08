/* tslint:disable */
/* eslint-disable */
import { DrinksResponse } from '../models/drinks-response';
import { FeedBackResponse } from '../models/feed-back-response';
import { OrderResponse } from '../models/order-response';
import { ProductResponse } from '../models/product-response';
export interface StoreResponse {
  active?: boolean;
  address?: string;
  deliveryAvailable?: boolean;
  description?: string;
  drinksResponses?: Array<DrinksResponse>;
  email?: string;
  feedBackResponses?: Array<FeedBackResponse>;
  id?: number;
  logoUrl?: string;
  openingHours?: string;
  orderResponses?: Array<OrderResponse>;
  ownerId?: number;
  phoneNumber?: string;
  productResponses?: Array<ProductResponse>;
  rating?: number;
  storeName?: string;
  websiteUrl?: string;
}
