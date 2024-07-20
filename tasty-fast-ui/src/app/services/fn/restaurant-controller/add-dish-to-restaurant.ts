/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { DishesRequest } from '../../models/dishes-request';
import { DishesResponse } from '../../models/dishes-response';

export interface AddDishToRestaurant$Params {
  restaurantId: number;
      body: DishesRequest
}

export function addDishToRestaurant(http: HttpClient, rootUrl: string, params: AddDishToRestaurant$Params, context?: HttpContext): Observable<StrictHttpResponse<DishesResponse>> {
  const rb = new RequestBuilder(rootUrl, addDishToRestaurant.PATH, 'post');
  if (params) {
    rb.path('restaurantId', params.restaurantId, {});
    rb.body(params.body, 'application/json');
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

addDishToRestaurant.PATH = '/restaurants/{restaurantId}/dishes';
