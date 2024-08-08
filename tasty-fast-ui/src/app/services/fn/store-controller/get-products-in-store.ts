/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseProductResponse } from '../../models/page-response-product-response';

export interface GetProductsInStore$Params {
  storeId: number;
  page?: number;
  size?: number;
}

export function getProductsInStore(http: HttpClient, rootUrl: string, params: GetProductsInStore$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseProductResponse>> {
  const rb = new RequestBuilder(rootUrl, getProductsInStore.PATH, 'get');
  if (params) {
    rb.path('storeId', params.storeId, {});
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseProductResponse>;
    })
  );
}

getProductsInStore.PATH = '/stores/{storeId}/products';
