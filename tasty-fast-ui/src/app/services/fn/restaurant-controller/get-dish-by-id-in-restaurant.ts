/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { DishesResponse } from '../../models/dishes-response';

export interface GetDishByIdInRestaurant$Params {
  restaurantId: number;
  dishId: number;
}

export function getDishByIdInRestaurant(http: HttpClient, rootUrl: string, params: GetDishByIdInRestaurant$Params, context?: HttpContext): Observable<StrictHttpResponse<DishesResponse>> {
  const rb = new RequestBuilder(rootUrl, getDishByIdInRestaurant.PATH, 'get');
  if (params) {
    rb.path('restaurantId', params.restaurantId, {});
    rb.path('dishId', params.dishId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<DishesResponse>;
    })
  );
}

getDishByIdInRestaurant.PATH = '/restaurants/{restaurantId}/dishes/{dishId}';
