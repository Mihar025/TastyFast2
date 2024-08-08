/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseOrderResponse } from '../../models/page-response-order-response';

export interface GetUserOrders$Params {
  userId: number;
  page?: number;
  size?: number;
}

export function getUserOrders(http: HttpClient, rootUrl: string, params: GetUserOrders$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseOrderResponse>> {
  const rb = new RequestBuilder(rootUrl, getUserOrders.PATH, 'get');
  if (params) {
    rb.path('userId', params.userId, {});
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseOrderResponse>;
    })
  );
}

getUserOrders.PATH = '/orders/users/{userId}';
