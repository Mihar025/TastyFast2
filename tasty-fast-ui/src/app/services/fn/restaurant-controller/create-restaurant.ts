/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { RestaurantRequest } from '../../models/restaurant-request';
import { RestaurantResponse } from '../../models/restaurant-response';

export interface CreateRestaurant$Params {
  ownerId: number;
      body: RestaurantRequest
}

export function createRestaurant(http: HttpClient, rootUrl: string, params: CreateRestaurant$Params, context?: HttpContext): Observable<StrictHttpResponse<RestaurantResponse>> {
  const rb = new RequestBuilder(rootUrl, createRestaurant.PATH, 'post');
  if (params) {
    rb.path('ownerId', params.ownerId, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<RestaurantResponse>;
    })
  );
}

createRestaurant.PATH = '/restaurants/create-restaurant/{ownerId}';
