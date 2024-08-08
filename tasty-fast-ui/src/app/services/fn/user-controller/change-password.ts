/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PasswordChangeRequest } from '../../models/password-change-request';
import { PasswordChangeResponse } from '../../models/password-change-response';

export interface ChangePassword$Params {
  userId: number;
      body: PasswordChangeRequest
}

export function changePassword(http: HttpClient, rootUrl: string, params: ChangePassword$Params, context?: HttpContext): Observable<StrictHttpResponse<PasswordChangeResponse>> {
  const rb = new RequestBuilder(rootUrl, changePassword.PATH, 'patch');
  if (params) {
    rb.path('userId', params.userId, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PasswordChangeResponse>;
    })
  );
}

changePassword.PATH = '/user-settings/{userId}/password';
