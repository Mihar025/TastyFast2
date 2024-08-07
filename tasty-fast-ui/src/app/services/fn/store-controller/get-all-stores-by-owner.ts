/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseStoreResponse } from '../../models/page-response-store-response';

export interface GetAllStoresByOwner$Params {
  page?: number;
  size?: number;
  ownerId: number;
}

export function getAllStoresByOwner(http: HttpClient, rootUrl: string, params: GetAllStoresByOwner$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseStoreResponse>> {
  const rb = new RequestBuilder(rootUrl, getAllStoresByOwner.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
    rb.path('ownerId', params.ownerId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseStoreResponse>;
    })
  );
}

getAllStoresByOwner.PATH = '/stores/business-store-owner/{ownerId}';
