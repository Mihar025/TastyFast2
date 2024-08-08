/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface ServeFile$Params {
  type: string;
  id: string;
  fileName: string;
}

export function serveFile(http: HttpClient, rootUrl: string, params: ServeFile$Params, context?: HttpContext): Observable<StrictHttpResponse<Blob>> {
  const rb = new RequestBuilder(rootUrl, serveFile.PATH, 'get');
  if (params) {
    rb.path('type', params.type, {});
    rb.path('id', params.id, {});
    rb.path('fileName', params.fileName, {});
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

serveFile.PATH = '/uploads/{type}/{id}/{fileName}';
