/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { DrinkRequest } from '../../models/drink-request';
import { DrinksResponse } from '../../models/drinks-response';

export interface UpdateDrinkInRestaurant$Params {
  restaurantId: number;
  drinkId: number;
      body: DrinkRequest
}

export function updateDrinkInRestaurant(http: HttpClient, rootUrl: string, params: UpdateDrinkInRestaurant$Params, context?: HttpContext): Observable<StrictHttpResponse<DrinksResponse>> {
  const rb = new RequestBuilder(rootUrl, updateDrinkInRestaurant.PATH, 'put');
  if (params) {
    rb.path('restaurantId', params.restaurantId, {});
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

updateDrinkInRestaurant.PATH = '/restaurants/{restaurantId}/drinks/{drinkId}';
