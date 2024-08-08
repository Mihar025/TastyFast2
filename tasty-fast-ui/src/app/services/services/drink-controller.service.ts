/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createDrink } from '../fn/drink-controller/create-drink';
import { CreateDrink$Params } from '../fn/drink-controller/create-drink';
import { DrinksResponse } from '../models/drinks-response';
import { getAllDrinks } from '../fn/drink-controller/get-all-drinks';
import { GetAllDrinks$Params } from '../fn/drink-controller/get-all-drinks';
import { getDrinkById } from '../fn/drink-controller/get-drink-by-id';
import { GetDrinkById$Params } from '../fn/drink-controller/get-drink-by-id';
import { getDrinkLogo } from '../fn/drink-controller/get-drink-logo';
import { GetDrinkLogo$Params } from '../fn/drink-controller/get-drink-logo';
import { getMyDrinks } from '../fn/drink-controller/get-my-drinks';
import { GetMyDrinks$Params } from '../fn/drink-controller/get-my-drinks';
import { PageResponseDrinksResponse } from '../models/page-response-drinks-response';
import { uploadDrinkLogo$FormData } from '../fn/drink-controller/upload-drink-logo-form-data';
import { UploadDrinkLogo$FormData$Params } from '../fn/drink-controller/upload-drink-logo-form-data';
import { uploadDrinkLogo$Webp } from '../fn/drink-controller/upload-drink-logo-webp';
import { UploadDrinkLogo$Webp$Params } from '../fn/drink-controller/upload-drink-logo-webp';

@Injectable({ providedIn: 'root' })
export class DrinkControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllDrinks()` */
  static readonly GetAllDrinksPath = '/drink';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllDrinks()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllDrinks$Response(params?: GetAllDrinks$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseDrinksResponse>> {
    return getAllDrinks(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllDrinks$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllDrinks(params?: GetAllDrinks$Params, context?: HttpContext): Observable<PageResponseDrinksResponse> {
    return this.getAllDrinks$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseDrinksResponse>): PageResponseDrinksResponse => r.body)
    );
  }

  /** Path part for operation `createDrink()` */
  static readonly CreateDrinkPath = '/drink';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createDrink()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createDrink$Response(params: CreateDrink$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return createDrink(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createDrink$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createDrink(params: CreateDrink$Params, context?: HttpContext): Observable<number> {
    return this.createDrink$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `uploadDrinkLogo()` */
  static readonly UploadDrinkLogoPath = '/drink/drink-logo/{drinkId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadDrinkLogo$Webp()` instead.
   *
   * This method sends `image/webp` and handles request body of type `image/webp`.
   */
  uploadDrinkLogo$Webp$Response(params: UploadDrinkLogo$Webp$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return uploadDrinkLogo$Webp(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `uploadDrinkLogo$Webp$Response()` instead.
   *
   * This method sends `image/webp` and handles request body of type `image/webp`.
   */
  uploadDrinkLogo$Webp(params: UploadDrinkLogo$Webp$Params, context?: HttpContext): Observable<{
}> {
    return this.uploadDrinkLogo$Webp$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadDrinkLogo$FormData()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadDrinkLogo$FormData$Response(params: UploadDrinkLogo$FormData$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return uploadDrinkLogo$FormData(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `uploadDrinkLogo$FormData$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadDrinkLogo$FormData(params: UploadDrinkLogo$FormData$Params, context?: HttpContext): Observable<{
}> {
    return this.uploadDrinkLogo$FormData$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `getDrinkById()` */
  static readonly GetDrinkByIdPath = '/drink/{drinkId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDrinkById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDrinkById$Response(params: GetDrinkById$Params, context?: HttpContext): Observable<StrictHttpResponse<DrinksResponse>> {
    return getDrinkById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getDrinkById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDrinkById(params: GetDrinkById$Params, context?: HttpContext): Observable<DrinksResponse> {
    return this.getDrinkById$Response(params, context).pipe(
      map((r: StrictHttpResponse<DrinksResponse>): DrinksResponse => r.body)
    );
  }

  /** Path part for operation `getMyDrinks()` */
  static readonly GetMyDrinksPath = '/drink/my-drinks';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getMyDrinks()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMyDrinks$Response(params?: GetMyDrinks$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseDrinksResponse>> {
    return getMyDrinks(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getMyDrinks$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMyDrinks(params?: GetMyDrinks$Params, context?: HttpContext): Observable<PageResponseDrinksResponse> {
    return this.getMyDrinks$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseDrinksResponse>): PageResponseDrinksResponse => r.body)
    );
  }

  /** Path part for operation `getDrinkLogo()` */
  static readonly GetDrinkLogoPath = '/drink/logo/{drinkId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDrinkLogo()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDrinkLogo$Response(params: GetDrinkLogo$Params, context?: HttpContext): Observable<StrictHttpResponse<Blob>> {
    return getDrinkLogo(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getDrinkLogo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDrinkLogo(params: GetDrinkLogo$Params, context?: HttpContext): Observable<Blob> {
    return this.getDrinkLogo$Response(params, context).pipe(
      map((r: StrictHttpResponse<Blob>): Blob => r.body)
    );
  }

}
