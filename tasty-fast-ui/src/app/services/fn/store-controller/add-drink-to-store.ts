/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { DrinkRequestForStore } from '../../models/drink-request-for-store';
import { DrinksResponse } from '../../models/drinks-response';

export interface AddDrinkToStore$Params {
  storeId: number;
      body: DrinkRequestForStore
}

export function addDrinkToStore(http: HttpClient, rootUrl: string, params: AddDrinkToStore$Params, context?: HttpContext): Observable<StrictHttpResponse<DrinksResponse>> {
  const rb = new RequestBuilder(rootUrl, addDrinkToStore.PATH, 'post');
  if (params) {
    rb.path('storeId', params.storeId, {});
    rb.body(params.body, 'application/json');
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

addDrinkToStore.PATH = '/stores/{storeId}/drinks';
