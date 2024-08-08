/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addDishToRestaurant } from '../fn/restaurant-controller/add-dish-to-restaurant';
import { AddDishToRestaurant$Params } from '../fn/restaurant-controller/add-dish-to-restaurant';
import { addDrinkToRestaurant } from '../fn/restaurant-controller/add-drink-to-restaurant';
import { AddDrinkToRestaurant$Params } from '../fn/restaurant-controller/add-drink-to-restaurant';
import { createRestaurant } from '../fn/restaurant-controller/create-restaurant';
import { CreateRestaurant$Params } from '../fn/restaurant-controller/create-restaurant';
import { deleteDishFromRestaurant } from '../fn/restaurant-controller/delete-dish-from-restaurant';
import { DeleteDishFromRestaurant$Params } from '../fn/restaurant-controller/delete-dish-from-restaurant';
import { deleteDrinkFromRestaurant } from '../fn/restaurant-controller/delete-drink-from-restaurant';
import { DeleteDrinkFromRestaurant$Params } from '../fn/restaurant-controller/delete-drink-from-restaurant';
import { deleteRestaurant } from '../fn/restaurant-controller/delete-restaurant';
import { DeleteRestaurant$Params } from '../fn/restaurant-controller/delete-restaurant';
import { DishesResponse } from '../models/dishes-response';
import { DrinksResponse } from '../models/drinks-response';
import { getAllDishesInRestaurant } from '../fn/restaurant-controller/get-all-dishes-in-restaurant';
import { GetAllDishesInRestaurant$Params } from '../fn/restaurant-controller/get-all-dishes-in-restaurant';
import { getAllDrinksInRestaurant } from '../fn/restaurant-controller/get-all-drinks-in-restaurant';
import { GetAllDrinksInRestaurant$Params } from '../fn/restaurant-controller/get-all-drinks-in-restaurant';
import { getAllRestaurants } from '../fn/restaurant-controller/get-all-restaurants';
import { GetAllRestaurants$Params } from '../fn/restaurant-controller/get-all-restaurants';
import { getAllRestaurantsByOwner } from '../fn/restaurant-controller/get-all-restaurants-by-owner';
import { GetAllRestaurantsByOwner$Params } from '../fn/restaurant-controller/get-all-restaurants-by-owner';
import { getAllRestaurantsWithoutDelivery } from '../fn/restaurant-controller/get-all-restaurants-without-delivery';
import { GetAllRestaurantsWithoutDelivery$Params } from '../fn/restaurant-controller/get-all-restaurants-without-delivery';
import { getDishByIdInRestaurant } from '../fn/restaurant-controller/get-dish-by-id-in-restaurant';
import { GetDishByIdInRestaurant$Params } from '../fn/restaurant-controller/get-dish-by-id-in-restaurant';
import { getDrinkByIdInRestaurant } from '../fn/restaurant-controller/get-drink-by-id-in-restaurant';
import { GetDrinkByIdInRestaurant$Params } from '../fn/restaurant-controller/get-drink-by-id-in-restaurant';
import { getRestaurantById } from '../fn/restaurant-controller/get-restaurant-by-id';
import { GetRestaurantById$Params } from '../fn/restaurant-controller/get-restaurant-by-id';
import { getRestaurantLogo1 } from '../fn/restaurant-controller/get-restaurant-logo-1';
import { GetRestaurantLogo1$Params } from '../fn/restaurant-controller/get-restaurant-logo-1';
import { PageResponseDishesResponse } from '../models/page-response-dishes-response';
import { PageResponseDrinksResponse } from '../models/page-response-drinks-response';
import { PageResponseRestaurantResponse } from '../models/page-response-restaurant-response';
import { RestaurantResponse } from '../models/restaurant-response';
import { updateDishInRestaurant } from '../fn/restaurant-controller/update-dish-in-restaurant';
import { UpdateDishInRestaurant$Params } from '../fn/restaurant-controller/update-dish-in-restaurant';
import { updateDrinkInRestaurant } from '../fn/restaurant-controller/update-drink-in-restaurant';
import { UpdateDrinkInRestaurant$Params } from '../fn/restaurant-controller/update-drink-in-restaurant';
import { updateRestaurant } from '../fn/restaurant-controller/update-restaurant';
import { UpdateRestaurant$Params } from '../fn/restaurant-controller/update-restaurant';
import { uploadRestaurantLogo$FormData } from '../fn/restaurant-controller/upload-restaurant-logo-form-data';
import { UploadRestaurantLogo$FormData$Params } from '../fn/restaurant-controller/upload-restaurant-logo-form-data';
import { uploadRestaurantLogo$Webp } from '../fn/restaurant-controller/upload-restaurant-logo-webp';
import { UploadRestaurantLogo$Webp$Params } from '../fn/restaurant-controller/upload-restaurant-logo-webp';

@Injectable({ providedIn: 'root' })
export class RestaurantControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getRestaurantById()` */
  static readonly GetRestaurantByIdPath = '/restaurants/{restaurantId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getRestaurantById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRestaurantById$Response(params: GetRestaurantById$Params, context?: HttpContext): Observable<StrictHttpResponse<RestaurantResponse>> {
    return getRestaurantById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getRestaurantById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRestaurantById(params: GetRestaurantById$Params, context?: HttpContext): Observable<RestaurantResponse> {
    return this.getRestaurantById$Response(params, context).pipe(
      map((r: StrictHttpResponse<RestaurantResponse>): RestaurantResponse => r.body)
    );
  }

  /** Path part for operation `updateRestaurant()` */
  static readonly UpdateRestaurantPath = '/restaurants/{restaurantId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateRestaurant()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateRestaurant$Response(params: UpdateRestaurant$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return updateRestaurant(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateRestaurant$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateRestaurant(params: UpdateRestaurant$Params, context?: HttpContext): Observable<{
}> {
    return this.updateRestaurant$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `deleteRestaurant()` */
  static readonly DeleteRestaurantPath = '/restaurants/{restaurantId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteRestaurant()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteRestaurant$Response(params: DeleteRestaurant$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteRestaurant(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteRestaurant$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteRestaurant(params: DeleteRestaurant$Params, context?: HttpContext): Observable<void> {
    return this.deleteRestaurant$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `getDrinkByIdInRestaurant()` */
  static readonly GetDrinkByIdInRestaurantPath = '/restaurants/{restaurantId}/drinks/{drinkId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDrinkByIdInRestaurant()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDrinkByIdInRestaurant$Response(params: GetDrinkByIdInRestaurant$Params, context?: HttpContext): Observable<StrictHttpResponse<DrinksResponse>> {
    return getDrinkByIdInRestaurant(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getDrinkByIdInRestaurant$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDrinkByIdInRestaurant(params: GetDrinkByIdInRestaurant$Params, context?: HttpContext): Observable<DrinksResponse> {
    return this.getDrinkByIdInRestaurant$Response(params, context).pipe(
      map((r: StrictHttpResponse<DrinksResponse>): DrinksResponse => r.body)
    );
  }

  /** Path part for operation `updateDrinkInRestaurant()` */
  static readonly UpdateDrinkInRestaurantPath = '/restaurants/{restaurantId}/drinks/{drinkId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateDrinkInRestaurant()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateDrinkInRestaurant$Response(params: UpdateDrinkInRestaurant$Params, context?: HttpContext): Observable<StrictHttpResponse<DrinksResponse>> {
    return updateDrinkInRestaurant(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateDrinkInRestaurant$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateDrinkInRestaurant(params: UpdateDrinkInRestaurant$Params, context?: HttpContext): Observable<DrinksResponse> {
    return this.updateDrinkInRestaurant$Response(params, context).pipe(
      map((r: StrictHttpResponse<DrinksResponse>): DrinksResponse => r.body)
    );
  }

  /** Path part for operation `deleteDrinkFromRestaurant()` */
  static readonly DeleteDrinkFromRestaurantPath = '/restaurants/{restaurantId}/drinks/{drinkId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteDrinkFromRestaurant()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteDrinkFromRestaurant$Response(params: DeleteDrinkFromRestaurant$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteDrinkFromRestaurant(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteDrinkFromRestaurant$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteDrinkFromRestaurant(params: DeleteDrinkFromRestaurant$Params, context?: HttpContext): Observable<void> {
    return this.deleteDrinkFromRestaurant$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `getDishByIdInRestaurant()` */
  static readonly GetDishByIdInRestaurantPath = '/restaurants/{restaurantId}/dishes/{dishId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDishByIdInRestaurant()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDishByIdInRestaurant$Response(params: GetDishByIdInRestaurant$Params, context?: HttpContext): Observable<StrictHttpResponse<DishesResponse>> {
    return getDishByIdInRestaurant(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getDishByIdInRestaurant$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDishByIdInRestaurant(params: GetDishByIdInRestaurant$Params, context?: HttpContext): Observable<DishesResponse> {
    return this.getDishByIdInRestaurant$Response(params, context).pipe(
      map((r: StrictHttpResponse<DishesResponse>): DishesResponse => r.body)
    );
  }

  /** Path part for operation `updateDishInRestaurant()` */
  static readonly UpdateDishInRestaurantPath = '/restaurants/{restaurantId}/dishes/{dishId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateDishInRestaurant()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateDishInRestaurant$Response(params: UpdateDishInRestaurant$Params, context?: HttpContext): Observable<StrictHttpResponse<DishesResponse>> {
    return updateDishInRestaurant(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateDishInRestaurant$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateDishInRestaurant(params: UpdateDishInRestaurant$Params, context?: HttpContext): Observable<DishesResponse> {
    return this.updateDishInRestaurant$Response(params, context).pipe(
      map((r: StrictHttpResponse<DishesResponse>): DishesResponse => r.body)
    );
  }

  /** Path part for operation `getAllDrinksInRestaurant()` */
  static readonly GetAllDrinksInRestaurantPath = '/restaurants/{restaurantId}/drinks';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllDrinksInRestaurant()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllDrinksInRestaurant$Response(params: GetAllDrinksInRestaurant$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseDrinksResponse>> {
    return getAllDrinksInRestaurant(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllDrinksInRestaurant$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllDrinksInRestaurant(params: GetAllDrinksInRestaurant$Params, context?: HttpContext): Observable<PageResponseDrinksResponse> {
    return this.getAllDrinksInRestaurant$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseDrinksResponse>): PageResponseDrinksResponse => r.body)
    );
  }

  /** Path part for operation `addDrinkToRestaurant()` */
  static readonly AddDrinkToRestaurantPath = '/restaurants/{restaurantId}/drinks';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addDrinkToRestaurant()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addDrinkToRestaurant$Response(params: AddDrinkToRestaurant$Params, context?: HttpContext): Observable<StrictHttpResponse<DrinksResponse>> {
    return addDrinkToRestaurant(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addDrinkToRestaurant$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addDrinkToRestaurant(params: AddDrinkToRestaurant$Params, context?: HttpContext): Observable<DrinksResponse> {
    return this.addDrinkToRestaurant$Response(params, context).pipe(
      map((r: StrictHttpResponse<DrinksResponse>): DrinksResponse => r.body)
    );
  }

  /** Path part for operation `getAllDishesInRestaurant()` */
  static readonly GetAllDishesInRestaurantPath = '/restaurants/{restaurantId}/dishes';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllDishesInRestaurant()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllDishesInRestaurant$Response(params: GetAllDishesInRestaurant$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseDishesResponse>> {
    return getAllDishesInRestaurant(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllDishesInRestaurant$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllDishesInRestaurant(params: GetAllDishesInRestaurant$Params, context?: HttpContext): Observable<PageResponseDishesResponse> {
    return this.getAllDishesInRestaurant$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseDishesResponse>): PageResponseDishesResponse => r.body)
    );
  }

  /** Path part for operation `addDishToRestaurant()` */
  static readonly AddDishToRestaurantPath = '/restaurants/{restaurantId}/dishes';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addDishToRestaurant()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addDishToRestaurant$Response(params: AddDishToRestaurant$Params, context?: HttpContext): Observable<StrictHttpResponse<DishesResponse>> {
    return addDishToRestaurant(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addDishToRestaurant$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addDishToRestaurant(params: AddDishToRestaurant$Params, context?: HttpContext): Observable<DishesResponse> {
    return this.addDishToRestaurant$Response(params, context).pipe(
      map((r: StrictHttpResponse<DishesResponse>): DishesResponse => r.body)
    );
  }

  /** Path part for operation `uploadRestaurantLogo()` */
  static readonly UploadRestaurantLogoPath = '/restaurants/restaurant-logo/{restaurantId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadRestaurantLogo$Webp()` instead.
   *
   * This method sends `image/webp` and handles request body of type `image/webp`.
   */
  uploadRestaurantLogo$Webp$Response(params: UploadRestaurantLogo$Webp$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return uploadRestaurantLogo$Webp(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `uploadRestaurantLogo$Webp$Response()` instead.
   *
   * This method sends `image/webp` and handles request body of type `image/webp`.
   */
  uploadRestaurantLogo$Webp(params: UploadRestaurantLogo$Webp$Params, context?: HttpContext): Observable<{
}> {
    return this.uploadRestaurantLogo$Webp$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadRestaurantLogo$FormData()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadRestaurantLogo$FormData$Response(params: UploadRestaurantLogo$FormData$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return uploadRestaurantLogo$FormData(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `uploadRestaurantLogo$FormData$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadRestaurantLogo$FormData(params: UploadRestaurantLogo$FormData$Params, context?: HttpContext): Observable<{
}> {
    return this.uploadRestaurantLogo$FormData$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `createRestaurant()` */
  static readonly CreateRestaurantPath = '/restaurants/create-restaurant/{ownerId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createRestaurant()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createRestaurant$Response(params: CreateRestaurant$Params, context?: HttpContext): Observable<StrictHttpResponse<RestaurantResponse>> {
    return createRestaurant(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createRestaurant$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createRestaurant(params: CreateRestaurant$Params, context?: HttpContext): Observable<RestaurantResponse> {
    return this.createRestaurant$Response(params, context).pipe(
      map((r: StrictHttpResponse<RestaurantResponse>): RestaurantResponse => r.body)
    );
  }

  /** Path part for operation `getAllRestaurants()` */
  static readonly GetAllRestaurantsPath = '/restaurants';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllRestaurants()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllRestaurants$Response(params?: GetAllRestaurants$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseRestaurantResponse>> {
    return getAllRestaurants(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllRestaurants$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllRestaurants(params?: GetAllRestaurants$Params, context?: HttpContext): Observable<PageResponseRestaurantResponse> {
    return this.getAllRestaurants$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseRestaurantResponse>): PageResponseRestaurantResponse => r.body)
    );
  }

  /** Path part for operation `getAllRestaurantsWithoutDelivery()` */
  static readonly GetAllRestaurantsWithoutDeliveryPath = '/restaurants/no-delivery';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllRestaurantsWithoutDelivery()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllRestaurantsWithoutDelivery$Response(params?: GetAllRestaurantsWithoutDelivery$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseRestaurantResponse>> {
    return getAllRestaurantsWithoutDelivery(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllRestaurantsWithoutDelivery$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllRestaurantsWithoutDelivery(params?: GetAllRestaurantsWithoutDelivery$Params, context?: HttpContext): Observable<PageResponseRestaurantResponse> {
    return this.getAllRestaurantsWithoutDelivery$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseRestaurantResponse>): PageResponseRestaurantResponse => r.body)
    );
  }

  /** Path part for operation `getRestaurantLogo1()` */
  static readonly GetRestaurantLogo1Path = '/restaurants/logo/{restaurantId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getRestaurantLogo1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRestaurantLogo1$Response(params: GetRestaurantLogo1$Params, context?: HttpContext): Observable<StrictHttpResponse<Blob>> {
    return getRestaurantLogo1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getRestaurantLogo1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRestaurantLogo1(params: GetRestaurantLogo1$Params, context?: HttpContext): Observable<Blob> {
    return this.getRestaurantLogo1$Response(params, context).pipe(
      map((r: StrictHttpResponse<Blob>): Blob => r.body)
    );
  }

  /** Path part for operation `getAllRestaurantsByOwner()` */
  static readonly GetAllRestaurantsByOwnerPath = '/restaurants/business-restaurant-owner/{ownerId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllRestaurantsByOwner()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllRestaurantsByOwner$Response(params: GetAllRestaurantsByOwner$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseRestaurantResponse>> {
    return getAllRestaurantsByOwner(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllRestaurantsByOwner$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllRestaurantsByOwner(params: GetAllRestaurantsByOwner$Params, context?: HttpContext): Observable<PageResponseRestaurantResponse> {
    return this.getAllRestaurantsByOwner$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseRestaurantResponse>): PageResponseRestaurantResponse => r.body)
    );
  }

  /** Path part for operation `deleteDishFromRestaurant()` */
  static readonly DeleteDishFromRestaurantPath = '/restaurants/{restaurantId}/dish/{dishId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteDishFromRestaurant()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteDishFromRestaurant$Response(params: DeleteDishFromRestaurant$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteDishFromRestaurant(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteDishFromRestaurant$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteDishFromRestaurant(params: DeleteDishFromRestaurant$Params, context?: HttpContext): Observable<void> {
    return this.deleteDishFromRestaurant$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
