/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { FavoriteRequest } from '../../models/favorite-request';
import { FavoriteResponse } from '../../models/favorite-response';

export interface AddFavorite$Params {
      body: FavoriteRequest
}

export function addFavorite(http: HttpClient, rootUrl: string, params: AddFavorite$Params, context?: HttpContext): Observable<StrictHttpResponse<FavoriteResponse>> {
  const rb = new RequestBuilder(rootUrl, addFavorite.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<FavoriteResponse>;
    })
  );
}

addFavorite.PATH = '/favorite';
