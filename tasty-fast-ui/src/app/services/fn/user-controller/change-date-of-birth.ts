/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { DateOfBirthRequest } from '../../models/date-of-birth-request';

export interface ChangeDateOfBirth$Params {
  userId: number;
      body: DateOfBirthRequest
}

export function changeDateOfBirth(http: HttpClient, rootUrl: string, params: ChangeDateOfBirth$Params, context?: HttpContext): Observable<StrictHttpResponse<DateOfBirthRequest>> {
  const rb = new RequestBuilder(rootUrl, changeDateOfBirth.PATH, 'patch');
  if (params) {
    rb.path('userId', params.userId, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<DateOfBirthRequest>;
    })
  );
}

changeDateOfBirth.PATH = '/user-settings/{userId}/dateOfBirth';
