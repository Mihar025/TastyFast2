/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { deleteFeedback } from '../fn/feedback/delete-feedback';
import { DeleteFeedback$Params } from '../fn/feedback/delete-feedback';
import { FeedBackResponse } from '../models/feed-back-response';
import { findAllFeedBacksByRestaurant } from '../fn/feedback/find-all-feed-backs-by-restaurant';
import { FindAllFeedBacksByRestaurant$Params } from '../fn/feedback/find-all-feed-backs-by-restaurant';
import { findAllFeedBacksByStore } from '../fn/feedback/find-all-feed-backs-by-store';
import { FindAllFeedBacksByStore$Params } from '../fn/feedback/find-all-feed-backs-by-store';
import { PageResponseFeedBackResponse } from '../models/page-response-feed-back-response';
import { saveFeedBackForRestaurant } from '../fn/feedback/save-feed-back-for-restaurant';
import { SaveFeedBackForRestaurant$Params } from '../fn/feedback/save-feed-back-for-restaurant';
import { saveFeedBackForStore } from '../fn/feedback/save-feed-back-for-store';
import { SaveFeedBackForStore$Params } from '../fn/feedback/save-feed-back-for-store';

@Injectable({ providedIn: 'root' })
export class FeedbackService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `saveFeedBackForStore()` */
  static readonly SaveFeedBackForStorePath = '/feedbacks/store-feedback/{storeId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveFeedBackForStore()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveFeedBackForStore$Response(params: SaveFeedBackForStore$Params, context?: HttpContext): Observable<StrictHttpResponse<FeedBackResponse>> {
    return saveFeedBackForStore(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveFeedBackForStore$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveFeedBackForStore(params: SaveFeedBackForStore$Params, context?: HttpContext): Observable<FeedBackResponse> {
    return this.saveFeedBackForStore$Response(params, context).pipe(
      map((r: StrictHttpResponse<FeedBackResponse>): FeedBackResponse => r.body)
    );
  }

  /** Path part for operation `saveFeedBackForRestaurant()` */
  static readonly SaveFeedBackForRestaurantPath = '/feedbacks/restaurant-feedback/{restaurantId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveFeedBackForRestaurant()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveFeedBackForRestaurant$Response(params: SaveFeedBackForRestaurant$Params, context?: HttpContext): Observable<StrictHttpResponse<FeedBackResponse>> {
    return saveFeedBackForRestaurant(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveFeedBackForRestaurant$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveFeedBackForRestaurant(params: SaveFeedBackForRestaurant$Params, context?: HttpContext): Observable<FeedBackResponse> {
    return this.saveFeedBackForRestaurant$Response(params, context).pipe(
      map((r: StrictHttpResponse<FeedBackResponse>): FeedBackResponse => r.body)
    );
  }

  /** Path part for operation `findAllFeedBacksByStore()` */
  static readonly FindAllFeedBacksByStorePath = '/feedbacks/store/{storeId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllFeedBacksByStore()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllFeedBacksByStore$Response(params: FindAllFeedBacksByStore$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseFeedBackResponse>> {
    return findAllFeedBacksByStore(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllFeedBacksByStore$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllFeedBacksByStore(params: FindAllFeedBacksByStore$Params, context?: HttpContext): Observable<PageResponseFeedBackResponse> {
    return this.findAllFeedBacksByStore$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseFeedBackResponse>): PageResponseFeedBackResponse => r.body)
    );
  }

  /** Path part for operation `findAllFeedBacksByRestaurant()` */
  static readonly FindAllFeedBacksByRestaurantPath = '/feedbacks/restaurant/{restaurantId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllFeedBacksByRestaurant()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllFeedBacksByRestaurant$Response(params: FindAllFeedBacksByRestaurant$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseFeedBackResponse>> {
    return findAllFeedBacksByRestaurant(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllFeedBacksByRestaurant$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllFeedBacksByRestaurant(params: FindAllFeedBacksByRestaurant$Params, context?: HttpContext): Observable<PageResponseFeedBackResponse> {
    return this.findAllFeedBacksByRestaurant$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseFeedBackResponse>): PageResponseFeedBackResponse => r.body)
    );
  }

  /** Path part for operation `deleteFeedback()` */
  static readonly DeleteFeedbackPath = '/feedbacks/{feedbackId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteFeedback()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteFeedback$Response(params: DeleteFeedback$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteFeedback(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteFeedback$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteFeedback(params: DeleteFeedback$Params, context?: HttpContext): Observable<void> {
    return this.deleteFeedback$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
