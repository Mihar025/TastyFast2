/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseDishesResponse } from '../../models/page-response-dishes-response';

export interface GetAllDishes$Params {
  page?: number;
  size?: number;
}

export function getAllDishes(http: HttpClient, rootUrl: string, params?: GetAllDishes$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseDishesResponse>> {
  const rb = new RequestBuilder(rootUrl, getAllDishes.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseDishesResponse>;
    })
  );
}

getAllDishes.PATH = '/dishes';
