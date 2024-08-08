/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { FirstNameRequest } from '../../models/first-name-request';

export interface ChangeFirstName$Params {
  userId: number;
      body: FirstNameRequest
}

export function changeFirstName(http: HttpClient, rootUrl: string, params: ChangeFirstName$Params, context?: HttpContext): Observable<StrictHttpResponse<FirstNameRequest>> {
  const rb = new RequestBuilder(rootUrl, changeFirstName.PATH, 'patch');
  if (params) {
    rb.path('userId', params.userId, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<FirstNameRequest>;
    })
  );
}

changeFirstName.PATH = '/user-settings/{userId}/firstName';
