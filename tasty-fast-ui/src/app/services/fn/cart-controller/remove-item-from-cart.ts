/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CartResponse } from '../../models/cart-response';

export interface RemoveItemFromCart$Params {
  itemId: number;
}

export function removeItemFromCart(http: HttpClient, rootUrl: string, params: RemoveItemFromCart$Params, context?: HttpContext): Observable<StrictHttpResponse<CartResponse>> {
  const rb = new RequestBuilder(rootUrl, removeItemFromCart.PATH, 'delete');
  if (params) {
    rb.path('itemId', params.itemId, {});
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

removeItemFromCart.PATH = '/cart/items/{itemId}';
