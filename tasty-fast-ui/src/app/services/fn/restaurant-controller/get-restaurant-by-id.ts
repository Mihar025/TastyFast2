/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { RestaurantResponse } from '../../models/restaurant-response';

export interface GetRestaurantById$Params {
  restaurantId: number;
}

export function getRestaurantById(http: HttpClient, rootUrl: string, params: GetRestaurantById$Params, context?: HttpContext): Observable<StrictHttpResponse<RestaurantResponse>> {
  const rb = new RequestBuilder(rootUrl, getRestaurantById.PATH, 'get');
  if (params) {
    rb.path('restaurantId', params.restaurantId, {});
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

getRestaurantById.PATH = '/restaurants/{restaurantId}';
