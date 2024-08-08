/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface UploadProductLogo$FormData$Params {
  productId: number;
      body?: {
'file': Blob;
}
}

export function uploadProductLogo$FormData(http: HttpClient, rootUrl: string, params: UploadProductLogo$FormData$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
  const rb = new RequestBuilder(rootUrl, uploadProductLogo$FormData.PATH, 'post');
  if (params) {
    rb.path('productId', params.productId, {});
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

uploadProductLogo$FormData.PATH = '/products/product-logo/{productId}';
