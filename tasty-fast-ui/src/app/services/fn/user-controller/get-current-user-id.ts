/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UserIdResponse } from '../../models/user-id-response';

export interface GetCurrentUserId$Params {
  userId: number;
}

export function getCurrentUserId(http: HttpClient, rootUrl: string, params: GetCurrentUserId$Params, context?: HttpContext): Observable<StrictHttpResponse<UserIdResponse>> {
  const rb = new RequestBuilder(rootUrl, getCurrentUserId.PATH, 'get');
  if (params) {
    rb.path('userId', params.userId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<UserIdResponse>;
    })
  );
}

getCurrentUserId.PATH = '/user-settings/currentId/{userId}';
