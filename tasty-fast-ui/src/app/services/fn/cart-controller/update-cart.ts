/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CartRequest } from '../../models/cart-request';
import { CartResponse } from '../../models/cart-response';

export interface UpdateCart$Params {
      body: CartRequest
}

export function updateCart(http: HttpClient, rootUrl: string, params: UpdateCart$Params, context?: HttpContext): Observable<StrictHttpResponse<CartResponse>> {
  const rb = new RequestBuilder(rootUrl, updateCart.PATH, 'put');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<CartResponse>;
    })
  );
}

updateCart.PATH = '/cart';
