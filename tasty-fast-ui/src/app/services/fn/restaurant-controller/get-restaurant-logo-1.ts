/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface GetRestaurantLogo1$Params {
  restaurantId: number;
}

export function getRestaurantLogo1(http: HttpClient, rootUrl: string, params: GetRestaurantLogo1$Params, context?: HttpContext): Observable<StrictHttpResponse<Blob>> {
  const rb = new RequestBuilder(rootUrl, getRestaurantLogo1.PATH, 'get');
  if (params) {
    rb.path('restaurantId', params.restaurantId, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Blob>;
    })
  );
}

getRestaurantLogo1.PATH = '/restaurants/logo/{restaurantId}';
