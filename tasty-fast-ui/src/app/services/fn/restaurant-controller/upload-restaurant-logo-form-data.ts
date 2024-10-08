/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface UploadRestaurantLogo$FormData$Params {
  restaurantId: number;
      body?: {
'file': Blob;
}
}

export function uploadRestaurantLogo$FormData(http: HttpClient, rootUrl: string, params: UploadRestaurantLogo$FormData$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
  const rb = new RequestBuilder(rootUrl, uploadRestaurantLogo$FormData.PATH, 'post');
  if (params) {
    rb.path('restaurantId', params.restaurantId, {});
    rb.body(params.body, 'multipart/form-data');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<{
      }>;
    })
  );
}

uploadRestaurantLogo$FormData.PATH = '/restaurants/restaurant-logo/{restaurantId}';
