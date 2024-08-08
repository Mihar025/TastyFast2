/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { StoreRequest } from '../../models/store-request';
import { StoreResponse } from '../../models/store-response';

export interface CreateStore$Params {
  ownerId: number;
      body: StoreRequest
}

export function createStore(http: HttpClient, rootUrl: string, params: CreateStore$Params, context?: HttpContext): Observable<StrictHttpResponse<StoreResponse>> {
  const rb = new RequestBuilder(rootUrl, createStore.PATH, 'post');
  if (params) {
    rb.path('ownerId', params.ownerId, {});
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

createStore.PATH = '/stores/create-store/{ownerId}';
