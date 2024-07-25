/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseFeedBackResponse } from '../../models/page-response-feed-back-response';

export interface FindAllFeedBacksByRestaurant$Params {
  restaurantId: number;
  page?: number;
  size?: number;
}

export function findAllFeedBacksByRestaurant(http: HttpClient, rootUrl: string, params: FindAllFeedBacksByRestaurant$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseFeedBackResponse>> {
  const rb = new RequestBuilder(rootUrl, findAllFeedBacksByRestaurant.PATH, 'get');
  if (params) {
    rb.path('restaurantId', params.restaurantId, {});
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseFeedBackResponse>;
    })
  );
}

findAllFeedBacksByRestaurant.PATH = '/feedbacks/restaurant/{restaurantId}';
