/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { DrinkRequest } from '../../models/drink-request';
import { DrinksResponse } from '../../models/drinks-response';

export interface AddDrinkToRestaurant$Params {
  restaurantId: number;
      body: DrinkRequest
}

export function addDrinkToRestaurant(http: HttpClient, rootUrl: string, params: AddDrinkToRestaurant$Params, context?: HttpContext): Observable<StrictHttpResponse<DrinksResponse>> {
  const rb = new RequestBuilder(rootUrl, addDrinkToRestaurant.PATH, 'post');
  if (params) {
    rb.path('restaurantId', params.restaurantId, {});
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

addDrinkToRestaurant.PATH = '/restaurants/{restaurantId}/drinks';
