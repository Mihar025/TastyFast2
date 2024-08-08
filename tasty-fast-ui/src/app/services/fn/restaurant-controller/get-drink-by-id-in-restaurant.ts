/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { DrinksResponse } from '../../models/drinks-response';

export interface GetDrinkByIdInRestaurant$Params {
  restaurantId: number;
  drinkId: number;
}

export function getDrinkByIdInRestaurant(http: HttpClient, rootUrl: string, params: GetDrinkByIdInRestaurant$Params, context?: HttpContext): Observable<StrictHttpResponse<DrinksResponse>> {
  const rb = new RequestBuilder(rootUrl, getDrinkByIdInRestaurant.PATH, 'get');
  if (params) {
    rb.path('restaurantId', params.restaurantId, {});
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

getDrinkByIdInRestaurant.PATH = '/restaurants/{restaurantId}/drinks/{drinkId}';
