/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { serveFile } from '../fn/file-controller/serve-file';
import { ServeFile$Params } from '../fn/file-controller/serve-file';

@Injectable({ providedIn: 'root' })
export class FileControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `serveFile()` */
  static readonly ServeFilePath = '/uploads/{type}/{id}/{fileName}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `serveFile()` instead.
   *
   * This method doesn't expect any request body.
   */
  serveFile$Response(params: ServeFile$Params, context?: HttpContext): Observable<StrictHttpResponse<Blob>> {
    return serveFile(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `serveFile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  serveFile(params: ServeFile$Params, context?: HttpContext): Observable<Blob> {
    return this.serveFile$Response(params, context).pipe(
      map((r: StrictHttpResponse<Blob>): Blob => r.body)
    );
  }

}
