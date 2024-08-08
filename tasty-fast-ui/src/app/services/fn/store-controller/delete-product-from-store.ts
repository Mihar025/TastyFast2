/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface DeleteProductFromStore$Params {
  storeId: number;
  productId: number;
}

export function deleteProductFromStore(http: HttpClient, rootUrl: string, params: DeleteProductFromStore$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
  const rb = new RequestBuilder(rootUrl, deleteProductFromStore.PATH, 'delete');
  if (params) {
    rb.path('storeId', params.storeId, {});
    rb.path('productId', params.productId, {});
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

deleteProductFromStore.PATH = '/stores/{storeId}/products/{productId}';
