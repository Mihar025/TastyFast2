/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface CheckStoreOwnership$Params {
  ownerId: number;
  storeId: number;
}

export function checkStoreOwnership(http: HttpClient, rootUrl: string, params: CheckStoreOwnership$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
  const rb = new RequestBuilder(rootUrl, checkStoreOwnership.PATH, 'get');
  if (params) {
    rb.path('ownerId', params.ownerId, {});
    rb.path('storeId', params.storeId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: String((r as HttpResponse<any>).body) === 'true' }) as StrictHttpResponse<boolean>;
    })
  );
}

checkStoreOwnership.PATH = '/auth/check-store-ownership/{ownerId}/{storeId}';
