/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { cancelOrder } from '../fn/order-controller/cancel-order';
import { CancelOrder$Params } from '../fn/order-controller/cancel-order';
import { createOrder } from '../fn/order-controller/create-order';
import { CreateOrder$Params } from '../fn/order-controller/create-order';
import { createOrderFromCart } from '../fn/order-controller/create-order-from-cart';
import { CreateOrderFromCart$Params } from '../fn/order-controller/create-order-from-cart';
import { createOrderFromSingleItem } from '../fn/order-controller/create-order-from-single-item';
import { CreateOrderFromSingleItem$Params } from '../fn/order-controller/create-order-from-single-item';
import { deleteOrder } from '../fn/order-controller/delete-order';
import { DeleteOrder$Params } from '../fn/order-controller/delete-order';
import { getOrderById } from '../fn/order-controller/get-order-by-id';
import { GetOrderById$Params } from '../fn/order-controller/get-order-by-id';
import { getOrderDetails } from '../fn/order-controller/get-order-details';
import { GetOrderDetails$Params } from '../fn/order-controller/get-order-details';
import { getUserOrders } from '../fn/order-controller/get-user-orders';
import { GetUserOrders$Params } from '../fn/order-controller/get-user-orders';
import { OrderDetailsResponse } from '../models/order-details-response';
import { OrderResponse } from '../models/order-response';
import { PageResponseOrderResponse } from '../models/page-response-order-response';

@Injectable({ providedIn: 'root' })
export class OrderControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `createOrder()` */
  static readonly CreateOrderPath = '/orders';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createOrder()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createOrder$Response(params: CreateOrder$Params, context?: HttpContext): Observable<StrictHttpResponse<OrderResponse>> {
    return createOrder(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createOrder$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createOrder(params: CreateOrder$Params, context?: HttpContext): Observable<OrderResponse> {
    return this.createOrder$Response(params, context).pipe(
      map((r: StrictHttpResponse<OrderResponse>): OrderResponse => r.body)
    );
  }

  /** Path part for operation `cancelOrder()` */
  static readonly CancelOrderPath = '/orders/{orderId}/cancel';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `cancelOrder()` instead.
   *
   * This method doesn't expect any request body.
   */
  cancelOrder$Response(params: CancelOrder$Params, context?: HttpContext): Observable<StrictHttpResponse<OrderResponse>> {
    return cancelOrder(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `cancelOrder$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  cancelOrder(params: CancelOrder$Params, context?: HttpContext): Observable<OrderResponse> {
    return this.cancelOrder$Response(params, context).pipe(
      map((r: StrictHttpResponse<OrderResponse>): OrderResponse => r.body)
    );
  }

  /** Path part for operation `createOrderFromSingleItem()` */
  static readonly CreateOrderFromSingleItemPath = '/orders/single-item';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createOrderFromSingleItem()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createOrderFromSingleItem$Response(params: CreateOrderFromSingleItem$Params, context?: HttpContext): Observable<StrictHttpResponse<OrderResponse>> {
    return createOrderFromSingleItem(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createOrderFromSingleItem$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createOrderFromSingleItem(params: CreateOrderFromSingleItem$Params, context?: HttpContext): Observable<OrderResponse> {
    return this.createOrderFromSingleItem$Response(params, context).pipe(
      map((r: StrictHttpResponse<OrderResponse>): OrderResponse => r.body)
    );
  }

  /** Path part for operation `createOrderFromCart()` */
  static readonly CreateOrderFromCartPath = '/orders/from-cart';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createOrderFromCart()` instead.
   *
   * This method doesn't expect any request body.
   */
  createOrderFromCart$Response(params?: CreateOrderFromCart$Params, context?: HttpContext): Observable<StrictHttpResponse<OrderResponse>> {
    return createOrderFromCart(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createOrderFromCart$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  createOrderFromCart(params?: CreateOrderFromCart$Params, context?: HttpContext): Observable<OrderResponse> {
    return this.createOrderFromCart$Response(params, context).pipe(
      map((r: StrictHttpResponse<OrderResponse>): OrderResponse => r.body)
    );
  }

  /** Path part for operation `getOrderById()` */
  static readonly GetOrderByIdPath = '/orders/{orderId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOrderById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOrderById$Response(params: GetOrderById$Params, context?: HttpContext): Observable<StrictHttpResponse<OrderResponse>> {
    return getOrderById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getOrderById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOrderById(params: GetOrderById$Params, context?: HttpContext): Observable<OrderResponse> {
    return this.getOrderById$Response(params, context).pipe(
      map((r: StrictHttpResponse<OrderResponse>): OrderResponse => r.body)
    );
  }

  /** Path part for operation `getOrderDetails()` */
  static readonly GetOrderDetailsPath = '/orders/{orderId}/details';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOrderDetails()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOrderDetails$Response(params: GetOrderDetails$Params, context?: HttpContext): Observable<StrictHttpResponse<OrderDetailsResponse>> {
    return getOrderDetails(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getOrderDetails$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOrderDetails(params: GetOrderDetails$Params, context?: HttpContext): Observable<OrderDetailsResponse> {
    return this.getOrderDetails$Response(params, context).pipe(
      map((r: StrictHttpResponse<OrderDetailsResponse>): OrderDetailsResponse => r.body)
    );
  }

  /** Path part for operation `getUserOrders()` */
  static readonly GetUserOrdersPath = '/orders/users/{userId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUserOrders()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserOrders$Response(params: GetUserOrders$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseOrderResponse>> {
    return getUserOrders(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getUserOrders$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserOrders(params: GetUserOrders$Params, context?: HttpContext): Observable<PageResponseOrderResponse> {
    return this.getUserOrders$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseOrderResponse>): PageResponseOrderResponse => r.body)
    );
  }

  /** Path part for operation `deleteOrder()` */
  static readonly DeleteOrderPath = '/orders/deleteOrder/{orderId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteOrder()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteOrder$Response(params: DeleteOrder$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteOrder(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteOrder$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteOrder(params: DeleteOrder$Params, context?: HttpContext): Observable<void> {
    return this.deleteOrder$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
