/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface UploadDishesLogo$Webp$Params {
  dishesId: number;
      body?: {
'file': Blob;
}
}

export function uploadDishesLogo$Webp(http: HttpClient, rootUrl: string, params: UploadDishesLogo$Webp$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
  const rb = new RequestBuilder(rootUrl, uploadDishesLogo$Webp.PATH, 'post');
  if (params) {
    rb.path('dishesId', params.dishesId, {});
    rb.body(params.body, 'image/webp');
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

uploadDishesLogo$Webp.PATH = '/dishes/dishes-logo/{dishesId}';
