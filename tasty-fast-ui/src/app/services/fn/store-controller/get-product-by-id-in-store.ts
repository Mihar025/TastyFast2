/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ProductResponse } from '../../models/product-response';

export interface GetProductByIdInStore$Params {
  storeId: number;
  productId: number;
}

export function getProductByIdInStore(http: HttpClient, rootUrl: string, params: GetProductByIdInStore$Params, context?: HttpContext): Observable<StrictHttpResponse<ProductResponse>> {
  const rb = new RequestBuilder(rootUrl, getProductByIdInStore.PATH, 'get');
  if (params) {
    rb.path('storeId', params.storeId, {});
    rb.path('productId', params.productId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ProductResponse>;
    })
  );
}

getProductByIdInStore.PATH = '/stores/{storeId}/products/{productId}';
