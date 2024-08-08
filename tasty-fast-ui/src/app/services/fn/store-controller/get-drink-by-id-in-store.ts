/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { DrinksResponse } from '../../models/drinks-response';

export interface GetDrinkByIdInStore$Params {
  storeId: number;
  drinkId: number;
}

export function getDrinkByIdInStore(http: HttpClient, rootUrl: string, params: GetDrinkByIdInStore$Params, context?: HttpContext): Observable<StrictHttpResponse<DrinksResponse>> {
  const rb = new RequestBuilder(rootUrl, getDrinkByIdInStore.PATH, 'get');
  if (params) {
    rb.path('storeId', params.storeId, {});
    rb.path('drinkId', params.drinkId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<DrinksResponse>;
    })
  );
}

getDrinkByIdInStore.PATH = '/stores/{storeId}/drinks/{drinkId}';
