/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { LastNameRequest } from '../../models/last-name-request';

export interface ChangeLastName$Params {
  userId: number;
      body: LastNameRequest
}

export function changeLastName(http: HttpClient, rootUrl: string, params: ChangeLastName$Params, context?: HttpContext): Observable<StrictHttpResponse<LastNameRequest>> {
  const rb = new RequestBuilder(rootUrl, changeLastName.PATH, 'patch');
  if (params) {
    rb.path('userId', params.userId, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<LastNameRequest>;
    })
  );
}

changeLastName.PATH = '/user-settings/{userId}/lastName';
