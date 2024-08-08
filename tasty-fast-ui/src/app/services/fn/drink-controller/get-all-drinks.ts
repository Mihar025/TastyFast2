/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseDrinksResponse } from '../../models/page-response-drinks-response';

export interface GetAllDrinks$Params {
  page?: number;
  size?: number;
}

export function getAllDrinks(http: HttpClient, rootUrl: string, params?: GetAllDrinks$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseDrinksResponse>> {
  const rb = new RequestBuilder(rootUrl, getAllDrinks.PATH, 'get');
  if (params) {
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

getAllDrinks.PATH = '/drink';
