/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addFavorite } from '../fn/favorite-controller/add-favorite';
import { AddFavorite$Params } from '../fn/favorite-controller/add-favorite';
import { FavoriteItemResponse } from '../models/favorite-item-response';
import { FavoriteResponse } from '../models/favorite-response';
import { getUserFavorites } from '../fn/favorite-controller/get-user-favorites';
import { GetUserFavorites$Params } from '../fn/favorite-controller/get-user-favorites';

@Injectable({ providedIn: 'root' })
export class FavoriteControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getUserFavorites()` */
  static readonly GetUserFavoritesPath = '/favorite';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUserFavorites()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserFavorites$Response(params?: GetUserFavorites$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<FavoriteItemResponse>>> {
    return getUserFavorites(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getUserFavorites$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserFavorites(params?: GetUserFavorites$Params, context?: HttpContext): Observable<Array<FavoriteItemResponse>> {
    return this.getUserFavorites$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<FavoriteItemResponse>>): Array<FavoriteItemResponse> => r.body)
    );
  }

  /** Path part for operation `addFavorite()` */
  static readonly AddFavoritePath = '/favorite';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addFavorite()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addFavorite$Response(params: AddFavorite$Params, context?: HttpContext): Observable<StrictHttpResponse<FavoriteResponse>> {
    return addFavorite(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addFavorite$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addFavorite(params: AddFavorite$Params, context?: HttpContext): Observable<FavoriteResponse> {
    return this.addFavorite$Response(params, context).pipe(
      map((r: StrictHttpResponse<FavoriteResponse>): FavoriteResponse => r.body)
    );
  }

}
