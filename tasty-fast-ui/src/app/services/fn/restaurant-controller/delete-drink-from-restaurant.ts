/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface DeleteDrinkFromRestaurant$Params {
  restaurantId: number;
  drinkId: number;
}

export function deleteDrinkFromRestaurant(http: HttpClient, rootUrl: string, params: DeleteDrinkFromRestaurant$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
  const rb = new RequestBuilder(rootUrl, deleteDrinkFromRestaurant.PATH, 'delete');
  if (params) {
    rb.path('restaurantId', params.restaurantId, {});
    rb.path('drinkId', params.drinkId, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
    })
  );
}

deleteDrinkFromRestaurant.PATH = '/restaurants/{restaurantId}/drinks/{drinkId}';
