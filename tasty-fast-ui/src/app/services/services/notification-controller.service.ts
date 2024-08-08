/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { getUnreadNotifications } from '../fn/notification-controller/get-unread-notifications';
import { GetUnreadNotifications$Params } from '../fn/notification-controller/get-unread-notifications';
import { markAsRead } from '../fn/notification-controller/mark-as-read';
import { MarkAsRead$Params } from '../fn/notification-controller/mark-as-read';
import { Notification } from '../models/notification';

@Injectable({ providedIn: 'root' })
export class NotificationControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `markAsRead()` */
  static readonly MarkAsReadPath = '/notifications/{id}/read';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `markAsRead()` instead.
   *
   * This method doesn't expect any request body.
   */
  markAsRead$Response(params: MarkAsRead$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return markAsRead(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `markAsRead$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  markAsRead(params: MarkAsRead$Params, context?: HttpContext): Observable<{
}> {
    return this.markAsRead$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `getUnreadNotifications()` */
  static readonly GetUnreadNotificationsPath = '/notifications';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUnreadNotifications()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUnreadNotifications$Response(params?: GetUnreadNotifications$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Notification>>> {
    return getUnreadNotifications(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getUnreadNotifications$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUnreadNotifications(params?: GetUnreadNotifications$Params, context?: HttpContext): Observable<Array<Notification>> {
    return this.getUnreadNotifications$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Notification>>): Array<Notification> => r.body)
    );
  }

}
