/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { DishesResponse } from '../../models/dishes-response';

export interface GetDishById$Params {
  dishId: number;
}

export function getDishById(http: HttpClient, rootUrl: string, params: GetDishById$Params, context?: HttpContext): Observable<StrictHttpResponse<DishesResponse>> {
  const rb = new RequestBuilder(rootUrl, getDishById.PATH, 'get');
  if (params) {
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

getDishById.PATH = '/dishes/{dishId}';
