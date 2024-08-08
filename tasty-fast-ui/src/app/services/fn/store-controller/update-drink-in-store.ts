/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { DrinkRequest } from '../../models/drink-request';
import { DrinksResponse } from '../../models/drinks-response';

export interface UpdateDrinkInStore$Params {
  storeId: number;
  drinkId: number;
      body: DrinkRequest
}

export function updateDrinkInStore(http: HttpClient, rootUrl: string, params: UpdateDrinkInStore$Params, context?: HttpContext): Observable<StrictHttpResponse<DrinksResponse>> {
  const rb = new RequestBuilder(rootUrl, updateDrinkInStore.PATH, 'put');
  if (params) {
    rb.path('storeId', params.storeId, {});
    rb.path('drinkId', params.drinkId, {});
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

updateDrinkInStore.PATH = '/stores/{storeId}/drinks/{drinkId}';
