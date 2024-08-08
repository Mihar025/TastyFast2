/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { RestaurantRequest } from '../../models/restaurant-request';

export interface UpdateRestaurant$Params {
  restaurantId: number;
      body: RestaurantRequest
}

export function updateRestaurant(http: HttpClient, rootUrl: string, params: UpdateRestaurant$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
  const rb = new RequestBuilder(rootUrl, updateRestaurant.PATH, 'put');
  if (params) {
    rb.path('restaurantId', params.restaurantId, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<{
      }>;
    })
  );
}

updateRestaurant.PATH = '/restaurants/{restaurantId}';
