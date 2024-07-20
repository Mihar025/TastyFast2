/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ProductRequest } from '../../models/product-request';
import { ProductResponse } from '../../models/product-response';

export interface AddProductToStore$Params {
  storeId: number;
      body: ProductRequest
}

export function addProductToStore(http: HttpClient, rootUrl: string, params: AddProductToStore$Params, context?: HttpContext): Observable<StrictHttpResponse<ProductResponse>> {
  const rb = new RequestBuilder(rootUrl, addProductToStore.PATH, 'post');
  if (params) {
    rb.path('storeId', params.storeId, {});
    rb.body(params.body, 'application/json');
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

addProductToStore.PATH = '/stores/{storeId}/products';
