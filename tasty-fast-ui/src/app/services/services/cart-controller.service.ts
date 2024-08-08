/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addItemToCart } from '../fn/cart-controller/add-item-to-cart';
import { AddItemToCart$Params } from '../fn/cart-controller/add-item-to-cart';
import { CartResponse } from '../models/cart-response';
import { clearCart } from '../fn/cart-controller/clear-cart';
import { ClearCart$Params } from '../fn/cart-controller/clear-cart';
import { getCart } from '../fn/cart-controller/get-cart';
import { GetCart$Params } from '../fn/cart-controller/get-cart';
import { removeItemFromCart } from '../fn/cart-controller/remove-item-from-cart';
import { RemoveItemFromCart$Params } from '../fn/cart-controller/remove-item-from-cart';
import { updateCart } from '../fn/cart-controller/update-cart';
import { UpdateCart$Params } from '../fn/cart-controller/update-cart';

@Injectable({ providedIn: 'root' })
export class CartControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getCart()` */
  static readonly GetCartPath = '/cart';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCart()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCart$Response(params?: GetCart$Params, context?: HttpContext): Observable<StrictHttpResponse<CartResponse>> {
    return getCart(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCart$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCart(params?: GetCart$Params, context?: HttpContext): Observable<CartResponse> {
    return this.getCart$Response(params, context).pipe(
      map((r: StrictHttpResponse<CartResponse>): CartResponse => r.body)
    );
  }

  /** Path part for operation `updateCart()` */
  static readonly UpdateCartPath = '/cart';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateCart()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCart$Response(params: UpdateCart$Params, context?: HttpContext): Observable<StrictHttpResponse<CartResponse>> {
    return updateCart(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateCart$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCart(params: UpdateCart$Params, context?: HttpContext): Observable<CartResponse> {
    return this.updateCart$Response(params, context).pipe(
      map((r: StrictHttpResponse<CartResponse>): CartResponse => r.body)
    );
  }

  /** Path part for operation `clearCart()` */
  static readonly ClearCartPath = '/cart';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `clearCart()` instead.
   *
   * This method doesn't expect any request body.
   */
  clearCart$Response(params?: ClearCart$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return clearCart(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `clearCart$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  clearCart(params?: ClearCart$Params, context?: HttpContext): Observable<void> {
    return this.clearCart$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `addItemToCart()` */
  static readonly AddItemToCartPath = '/cart/items';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addItemToCart()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addItemToCart$Response(params: AddItemToCart$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return addItemToCart(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addItemToCart$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addItemToCart(params: AddItemToCart$Params, context?: HttpContext): Observable<{
}> {
    return this.addItemToCart$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `removeItemFromCart()` */
  static readonly RemoveItemFromCartPath = '/cart/items/{itemId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removeItemFromCart()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeItemFromCart$Response(params: RemoveItemFromCart$Params, context?: HttpContext): Observable<StrictHttpResponse<CartResponse>> {
    return removeItemFromCart(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `removeItemFromCart$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removeItemFromCart(params: RemoveItemFromCart$Params, context?: HttpContext): Observable<CartResponse> {
    return this.removeItemFromCart$Response(params, context).pipe(
      map((r: StrictHttpResponse<CartResponse>): CartResponse => r.body)
    );
  }

}
