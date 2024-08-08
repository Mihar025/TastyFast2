/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseRestaurantResponse } from '../../models/page-response-restaurant-response';

export interface GetAllRestaurants$Params {
  page?: number;
  size?: number;
}

export function getAllRestaurants(http: HttpClient, rootUrl: string, params?: GetAllRestaurants$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseRestaurantResponse>> {
  const rb = new RequestBuilder(rootUrl, getAllRestaurants.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseRestaurantResponse>;
    })
  );
}

getAllRestaurants.PATH = '/restaurants';
