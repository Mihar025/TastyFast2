/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { StreetRequest } from '../../models/street-request';

export interface ChangeStreet$Params {
  userId: number;
      body: StreetRequest
}

export function changeStreet(http: HttpClient, rootUrl: string, params: ChangeStreet$Params, context?: HttpContext): Observable<StrictHttpResponse<StreetRequest>> {
  const rb = new RequestBuilder(rootUrl, changeStreet.PATH, 'patch');
  if (params) {
    rb.path('userId', params.userId, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<StreetRequest>;
    })
  );
}

changeStreet.PATH = '/user-settings/{userId}/street';
