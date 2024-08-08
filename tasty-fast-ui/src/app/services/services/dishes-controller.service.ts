/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createDish } from '../fn/dishes-controller/create-dish';
import { CreateDish$Params } from '../fn/dishes-controller/create-dish';
import { DishesResponse } from '../models/dishes-response';
import { getAllDishes } from '../fn/dishes-controller/get-all-dishes';
import { GetAllDishes$Params } from '../fn/dishes-controller/get-all-dishes';
import { getDishById } from '../fn/dishes-controller/get-dish-by-id';
import { GetDishById$Params } from '../fn/dishes-controller/get-dish-by-id';
import { getDishesLogo } from '../fn/dishes-controller/get-dishes-logo';
import { GetDishesLogo$Params } from '../fn/dishes-controller/get-dishes-logo';
import { getMyDishes } from '../fn/dishes-controller/get-my-dishes';
import { GetMyDishes$Params } from '../fn/dishes-controller/get-my-dishes';
import { PageResponseDishesResponse } from '../models/page-response-dishes-response';
import { uploadDishCover } from '../fn/dishes-controller/upload-dish-cover';
import { UploadDishCover$Params } from '../fn/dishes-controller/upload-dish-cover';
import { uploadDishesLogo$FormData } from '../fn/dishes-controller/upload-dishes-logo-form-data';
import { UploadDishesLogo$FormData$Params } from '../fn/dishes-controller/upload-dishes-logo-form-data';
import { uploadDishesLogo$Webp } from '../fn/dishes-controller/upload-dishes-logo-webp';
import { UploadDishesLogo$Webp$Params } from '../fn/dishes-controller/upload-dishes-logo-webp';

@Injectable({ providedIn: 'root' })
export class DishesControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllDishes()` */
  static readonly GetAllDishesPath = '/dishes';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllDishes()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllDishes$Response(params?: GetAllDishes$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseDishesResponse>> {
    return getAllDishes(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllDishes$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllDishes(params?: GetAllDishes$Params, context?: HttpContext): Observable<PageResponseDishesResponse> {
    return this.getAllDishes$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseDishesResponse>): PageResponseDishesResponse => r.body)
    );
  }

  /** Path part for operation `createDish()` */
  static readonly CreateDishPath = '/dishes';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createDish()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createDish$Response(params: CreateDish$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return createDish(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createDish$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createDish(params: CreateDish$Params, context?: HttpContext): Observable<number> {
    return this.createDish$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `uploadDishCover()` */
  static readonly UploadDishCoverPath = '/dishes/{dishId}/cover';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadDishCover()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  uploadDishCover$Response(params: UploadDishCover$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return uploadDishCover(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `uploadDishCover$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  uploadDishCover(params: UploadDishCover$Params, context?: HttpContext): Observable<void> {
    return this.uploadDishCover$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `uploadDishesLogo()` */
  static readonly UploadDishesLogoPath = '/dishes/dishes-logo/{dishesId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadDishesLogo$Webp()` instead.
   *
   * This method sends `image/webp` and handles request body of type `image/webp`.
   */
  uploadDishesLogo$Webp$Response(params: UploadDishesLogo$Webp$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return uploadDishesLogo$Webp(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `uploadDishesLogo$Webp$Response()` instead.
   *
   * This method sends `image/webp` and handles request body of type `image/webp`.
   */
  uploadDishesLogo$Webp(params: UploadDishesLogo$Webp$Params, context?: HttpContext): Observable<{
}> {
    return this.uploadDishesLogo$Webp$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadDishesLogo$FormData()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadDishesLogo$FormData$Response(params: UploadDishesLogo$FormData$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return uploadDishesLogo$FormData(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `uploadDishesLogo$FormData$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadDishesLogo$FormData(params: UploadDishesLogo$FormData$Params, context?: HttpContext): Observable<{
}> {
    return this.uploadDishesLogo$FormData$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `getDishById()` */
  static readonly GetDishByIdPath = '/dishes/{dishId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDishById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDishById$Response(params: GetDishById$Params, context?: HttpContext): Observable<StrictHttpResponse<DishesResponse>> {
    return getDishById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getDishById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDishById(params: GetDishById$Params, context?: HttpContext): Observable<DishesResponse> {
    return this.getDishById$Response(params, context).pipe(
      map((r: StrictHttpResponse<DishesResponse>): DishesResponse => r.body)
    );
  }

  /** Path part for operation `getMyDishes()` */
  static readonly GetMyDishesPath = '/dishes/my-dishes';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getMyDishes()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMyDishes$Response(params?: GetMyDishes$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseDishesResponse>> {
    return getMyDishes(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getMyDishes$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMyDishes(params?: GetMyDishes$Params, context?: HttpContext): Observable<PageResponseDishesResponse> {
    return this.getMyDishes$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseDishesResponse>): PageResponseDishesResponse => r.body)
    );
  }

  /** Path part for operation `getDishesLogo()` */
  static readonly GetDishesLogoPath = '/dishes/logo/{dishesId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDishesLogo()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDishesLogo$Response(params: GetDishesLogo$Params, context?: HttpContext): Observable<StrictHttpResponse<Blob>> {
    return getDishesLogo(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getDishesLogo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDishesLogo(params: GetDishesLogo$Params, context?: HttpContext): Observable<Blob> {
    return this.getDishesLogo$Response(params, context).pipe(
      map((r: StrictHttpResponse<Blob>): Blob => r.body)
    );
  }

}
