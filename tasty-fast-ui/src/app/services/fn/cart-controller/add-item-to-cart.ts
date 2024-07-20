/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CartItemRequest } from '../../models/cart-item-request';
import { CartResponse } from '../../models/cart-response';

export interface AddItemToCart$Params {
      body: CartItemRequest
}

export function addItemToCart(http: HttpClient, rootUrl: string, params: AddItemToCart$Params, context?: HttpContext): Observable<StrictHttpResponse<CartResponse>> {
  const rb = new RequestBuilder(rootUrl, addItemToCart.PATH, 'post');
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

addItemToCart.PATH = '/items';
