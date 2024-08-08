/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface UploadDishesLogo$FormData$Params {
  dishesId: number;
      body?: {
'file': Blob;
}
}

export function uploadDishesLogo$FormData(http: HttpClient, rootUrl: string, params: UploadDishesLogo$FormData$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
  const rb = new RequestBuilder(rootUrl, uploadDishesLogo$FormData.PATH, 'post');
  if (params) {
    rb.path('dishesId', params.dishesId, {});
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

uploadDishesLogo$FormData.PATH = '/dishes/dishes-logo/{dishesId}';
