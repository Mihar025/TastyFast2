/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseDrinksResponse } from '../../models/page-response-drinks-response';

export interface GetAllDrinksInRestaurant$Params {
  restaurantId: number;
  page?: number;
  size?: number;
}

export function getAllDrinksInRestaurant(http: HttpClient, rootUrl: string, params: GetAllDrinksInRestaurant$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseDrinksResponse>> {
  const rb = new RequestBuilder(rootUrl, getAllDrinksInRestaurant.PATH, 'get');
  if (params) {
    rb.path('restaurantId', params.restaurantId, {});
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseDrinksResponse>;
    })
  );
}

getAllDrinksInRestaurant.PATH = '/restaurants/{restaurantId}/drinks';
