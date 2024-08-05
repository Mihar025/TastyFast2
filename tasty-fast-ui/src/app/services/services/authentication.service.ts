import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
import { checkStoreOwnership } from '../fn/authentication/check-store-ownership';
import { CheckStoreOwnership$Params } from '../fn/authentication/check-store-ownership';
import { checkRestaurantOwnership } from '../fn/authentication/check-restaurant-ownership';
import { CheckRestaurantOwnership$Params } from '../fn/authentication/check-restaurant-ownership';

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
  registerUser$Response(params: RegisterUser$Params, context?: HttpContext): Observable<StrictHttpResponse<{
  }>> {
    return registerUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `registerUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registerUser(params: RegisterUser$Params): Observable<string> {
    return this.http.post(this.rootUrl + '/auth/register', params.body, { responseType: 'text' });
  }

  /** Path part for operation `registerBusinessAccount()` */
  static readonly RegisterBusinessAccountPath = '/auth/register/business';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registerBusinessAccount()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registerBusinessAccount$Response(params: RegisterBusinessAccount$Params, context?: HttpContext): Observable<StrictHttpResponse<{
  }>> {
    return registerBusinessAccount(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `registerBusinessAccount$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registerBusinessAccount(params: RegisterBusinessAccount$Params): Observable<string> {
    return this.http.post(this.rootUrl + '/auth/register/business', params.body, { responseType: 'text' });
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
  logout$Response(params: Logout$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return logout(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `logout$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  logout(params: Logout$Params, context?: HttpContext): Observable<string> {
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

  /** Path part for operation `checkStoreOwnership()` */
  static readonly CheckStoreOwnershipPath = '/auth/check-store-ownership/{ownerId}/{storeId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `checkStoreOwnership()` instead.
   *
   * This method doesn't expect any request body.
   */
  checkStoreOwnership$Response(params: CheckStoreOwnership$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return checkStoreOwnership(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `checkStoreOwnership$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  checkStoreOwnership(params: CheckStoreOwnership$Params, context?: HttpContext): Observable<boolean> {
    return this.checkStoreOwnership$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

  /** Path part for operation `checkRestaurantOwnership()` */
  static readonly CheckRestaurantOwnershipPath = '/auth/check-restaurant-ownership/{ownerId}/{restaurantId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `checkRestaurantOwnership()` instead.
   *
   * This method doesn't expect any request body.
   */
  checkRestaurantOwnership$Response(params: CheckRestaurantOwnership$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return checkRestaurantOwnership(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `checkRestaurantOwnership$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  checkRestaurantOwnership(params: CheckRestaurantOwnership$Params, context?: HttpContext): Observable<boolean> {
    return this.checkRestaurantOwnership$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }
}
