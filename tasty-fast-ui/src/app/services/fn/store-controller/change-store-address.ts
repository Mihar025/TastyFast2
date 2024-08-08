/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { StoreResponse } from '../../models/store-response';

export interface ChangeStoreAddress$Params {
  storeId: number;
      body: string
}

export function changeStoreAddress(http: HttpClient, rootUrl: string, params: ChangeStoreAddress$Params, context?: HttpContext): Observable<StrictHttpResponse<StoreResponse>> {
  const rb = new RequestBuilder(rootUrl, changeStoreAddress.PATH, 'patch');
  if (params) {
    rb.path('storeId', params.storeId, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<StoreResponse>;
    })
  );
}

changeStoreAddress.PATH = '/stores/{storeId}/address';
