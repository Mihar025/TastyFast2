/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface UploadStoreLogo$Webp$Params {
  storeId: number;
      body?: {
'file': Blob;
}
}

export function uploadStoreLogo$Webp(http: HttpClient, rootUrl: string, params: UploadStoreLogo$Webp$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
  const rb = new RequestBuilder(rootUrl, uploadStoreLogo$Webp.PATH, 'post');
  if (params) {
    rb.path('storeId', params.storeId, {});
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

uploadStoreLogo$Webp.PATH = '/stores/store-logo/{storeId}';
