
import {HttpClient, HttpContext, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, throwError} from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { authenticate } from '../fn/authentication/authenticate';
import { Authenticate$Params } from '../fn/authentication/authenticate';
import { AuthenticationResponse } from '../models/authentication-response';
import { confirm } from '../fn/authentication/confirm';
import { Confirm$Params } from '../fn/authentication/confirm';
import { logout } from '../fn/authentication/logout';
import { Logout$Params } from '../fn/authentication/logout';
import { registerAdmin } from '../fn/authentication/register-admin';
import { RegisterAdmin$Params } from '../fn/authentication/register-admin';
import { registerBusinessAccount } from '../fn/authentication/register-business-account';
import { RegisterBusinessAccount$Params } from '../fn/authentication/register-business-account';
import { registerUser } from '../fn/authentication/register-user';
import { RegisterUser$Params } from '../fn/authentication/register-user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `registerUser()` */
  static readonly RegisterUserPath = '/auth/register';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registerUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */



  registerUser$Response(params: RegisterUser$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return this.http.post(`${this.rootUrl}${AuthenticationService.RegisterUserPath}`, params.body, {
      responseType: 'text',
      observe: 'response',
      context
    }).pipe(
      map((response: HttpResponse<string>) => {
        console.log('Raw server response:', response.body);
        let parsedBody: any;
        try {
          parsedBody = JSON.parse(response.body || '');
        } catch (e) {
          parsedBody = { message: response.body };
        }

        return {
          body: parsedBody,
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
          url: response.url || '',
          type: response.type,
          clone: response.clone,
          ok: response.ok
        };
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    let errorMessage = 'An unexpected error occurred';
    if (error.error instanceof ErrorEvent) {
      // Клиентская ошибка
      errorMessage = `Error: ${error.error.message}`;
    } else if (typeof error.error === 'string') {
      // Сервер вернул строку ошибки
      errorMessage = error.error;
    } else if (error.status) {
      // Сервер вернул код ошибки
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => errorMessage);
  }
  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `registerUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registerUser(params: RegisterUser$Params, context?: HttpContext): Observable<any> {
    return this.registerUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `registerBusinessAccount()` */
  static readonly RegisterBusinessAccountPath = '/auth/register/business';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registerBusinessAccount()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */

  registerBusinessAccount$Response(params: RegisterBusinessAccount$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return this.http.post(`${this.rootUrl}${AuthenticationService.RegisterBusinessAccountPath}`, params.body, {
      responseType: 'text',
      observe: 'response',
      context
    }).pipe(
      map((response: HttpResponse<string>) => {
        console.log('Raw server response for business account:', response.body);
        let parsedBody: any;
        try {
          parsedBody = JSON.parse(response.body || '');
        } catch (e) {
          parsedBody = { message: response.body };
        }

        return {
          body: parsedBody,
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
          url: response.url || '',
          type: response.type,
          clone: response.clone,
          ok: response.ok
        };
      }),
      catchError(this.handleError)
    );
  }


  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `registerBusinessAccount$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registerBusinessAccount(params: RegisterBusinessAccount$Params, context?: HttpContext): Observable<any> {
    return this.registerBusinessAccount$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>) => r.body)
    );
  }


  /** Path part for operation `registerAdmin()` */
  static readonly RegisterAdminPath = '/auth/register/admin';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registerAdmin()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registerAdmin$Response(params: RegisterAdmin$Params, context?: HttpContext): Observable<StrictHttpResponse<{
  }>> {
    return registerAdmin(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `registerAdmin$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registerAdmin(params: RegisterAdmin$Params, context?: HttpContext): Observable<{
  }> {
    return this.registerAdmin$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
      }>): {
      } => r.body)
    );
  }

  /** Path part for operation `logout()` */
  static readonly LogoutPath = '/auth/logout';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `logout()` instead.
   *
   * This method doesn't expect any request body.
   */
  logout$Response(params: {} , context?: HttpContext | undefined): Observable<StrictHttpResponse<string>> {

    return logout(this.http, this.rootUrl,<Logout$Params>params,context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `logout$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  logout(params: {}, context?: HttpContext): Observable<string> {
    return this.logout$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `authenticate()` */
  static readonly AuthenticatePath = '/auth/authenticate';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authenticate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authenticate$Response(params: Authenticate$Params, context?: HttpContext): Observable<StrictHttpResponse<AuthenticationResponse>> {
    return authenticate(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authenticate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authenticate(params: Authenticate$Params, context?: HttpContext): Observable<AuthenticationResponse> {
    return this.authenticate$Response(params, context).pipe(
      map((r: StrictHttpResponse<AuthenticationResponse>): AuthenticationResponse => r.body)
    );
  }

  /** Path part for operation `confirm()` */
  static readonly ConfirmPath = '/auth/activate-account';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `confirm()` instead.
   *
   * This method doesn't expect any request body.
   */
  confirm$Response(params: Confirm$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return confirm(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `confirm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  confirm(params: Confirm$Params, context?: HttpContext): Observable<void> {
    return this.confirm$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
