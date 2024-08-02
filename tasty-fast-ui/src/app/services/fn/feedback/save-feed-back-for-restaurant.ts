/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { FeedBackRequest } from '../../models/feed-back-request';
import { FeedBackResponse } from '../../models/feed-back-response';

export interface SaveFeedBackForRestaurant$Params {
  restaurantId: number;
      body: FeedBackRequest
}

export function saveFeedBackForRestaurant(http: HttpClient, rootUrl: string, params: SaveFeedBackForRestaurant$Params, context?: HttpContext): Observable<StrictHttpResponse<FeedBackResponse>> {
  const rb = new RequestBuilder(rootUrl, saveFeedBackForRestaurant.PATH, 'post');
  if (params) {
    rb.path('restaurantId', params.restaurantId, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<FeedBackResponse>;
    })
  );
}

saveFeedBackForRestaurant.PATH = '/feedbacks/restaurant-feedback/{restaurantId}';
