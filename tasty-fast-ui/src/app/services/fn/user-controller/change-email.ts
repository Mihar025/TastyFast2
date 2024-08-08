/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { EmailRequest } from '../../models/email-request';

export interface ChangeEmail$Params {
  userId: number;
      body: EmailRequest
}

export function changeEmail(http: HttpClient, rootUrl: string, params: ChangeEmail$Params, context?: HttpContext): Observable<StrictHttpResponse<EmailRequest>> {
  const rb = new RequestBuilder(rootUrl, changeEmail.PATH, 'patch');
  if (params) {
    rb.path('userId', params.userId, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<EmailRequest>;
    })
  );
}

changeEmail.PATH = '/user-settings/{userId}/email';
