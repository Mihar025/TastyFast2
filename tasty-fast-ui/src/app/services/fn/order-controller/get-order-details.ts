/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { OrderDetailsResponse } from '../../models/order-details-response';

export interface GetOrderDetails$Params {
  orderId: number;
}

export function getOrderDetails(http: HttpClient, rootUrl: string, params: GetOrderDetails$Params, context?: HttpContext): Observable<StrictHttpResponse<OrderDetailsResponse>> {
  const rb = new RequestBuilder(rootUrl, getOrderDetails.PATH, 'get');
  if (params) {
    rb.path('orderId', params.orderId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<OrderDetailsResponse>;
    })
  );
}

getOrderDetails.PATH = '/orders/{orderId}/details';
