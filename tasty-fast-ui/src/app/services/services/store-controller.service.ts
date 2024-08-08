/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addDrinkToStore } from '../fn/store-controller/add-drink-to-store';
import { AddDrinkToStore$Params } from '../fn/store-controller/add-drink-to-store';
import { addProductToStore } from '../fn/store-controller/add-product-to-store';
import { AddProductToStore$Params } from '../fn/store-controller/add-product-to-store';
import { changeStoreAddress } from '../fn/store-controller/change-store-address';
import { ChangeStoreAddress$Params } from '../fn/store-controller/change-store-address';
import { changeStoreDeliveryAvailability } from '../fn/store-controller/change-store-delivery-availability';
import { ChangeStoreDeliveryAvailability$Params } from '../fn/store-controller/change-store-delivery-availability';
import { changeStoreDescription } from '../fn/store-controller/change-store-description';
import { ChangeStoreDescription$Params } from '../fn/store-controller/change-store-description';
import { changeStoreEmail } from '../fn/store-controller/change-store-email';
import { ChangeStoreEmail$Params } from '../fn/store-controller/change-store-email';
import { changeStoreName } from '../fn/store-controller/change-store-name';
import { ChangeStoreName$Params } from '../fn/store-controller/change-store-name';
import { changeStoreOpeningHours } from '../fn/store-controller/change-store-opening-hours';
import { ChangeStoreOpeningHours$Params } from '../fn/store-controller/change-store-opening-hours';
import { changeStorePhoneNumber } from '../fn/store-controller/change-store-phone-number';
import { ChangeStorePhoneNumber$Params } from '../fn/store-controller/change-store-phone-number';
import { changeStoreWebsite } from '../fn/store-controller/change-store-website';
import { ChangeStoreWebsite$Params } from '../fn/store-controller/change-store-website';
import { createStore } from '../fn/store-controller/create-store';
import { CreateStore$Params } from '../fn/store-controller/create-store';
import { deleteDrinkFromStore } from '../fn/store-controller/delete-drink-from-store';
import { DeleteDrinkFromStore$Params } from '../fn/store-controller/delete-drink-from-store';
import { deleteProductFromStore } from '../fn/store-controller/delete-product-from-store';
import { DeleteProductFromStore$Params } from '../fn/store-controller/delete-product-from-store';
import { deleteStore } from '../fn/store-controller/delete-store';
import { DeleteStore$Params } from '../fn/store-controller/delete-store';
import { DrinksResponse } from '../models/drinks-response';
import { getAllStoreInformation } from '../fn/store-controller/get-all-store-information';
import { GetAllStoreInformation$Params } from '../fn/store-controller/get-all-store-information';
import { getAllStores } from '../fn/store-controller/get-all-stores';
import { GetAllStores$Params } from '../fn/store-controller/get-all-stores';
import { getAllStoresByOwner } from '../fn/store-controller/get-all-stores-by-owner';
import { GetAllStoresByOwner$Params } from '../fn/store-controller/get-all-stores-by-owner';
import { getAllStoresWithoutDelivery } from '../fn/store-controller/get-all-stores-without-delivery';
import { GetAllStoresWithoutDelivery$Params } from '../fn/store-controller/get-all-stores-without-delivery';
import { getDrinkByIdInStore } from '../fn/store-controller/get-drink-by-id-in-store';
import { GetDrinkByIdInStore$Params } from '../fn/store-controller/get-drink-by-id-in-store';
import { getDrinksInStore } from '../fn/store-controller/get-drinks-in-store';
import { GetDrinksInStore$Params } from '../fn/store-controller/get-drinks-in-store';
import { getProductByIdInStore } from '../fn/store-controller/get-product-by-id-in-store';
import { GetProductByIdInStore$Params } from '../fn/store-controller/get-product-by-id-in-store';
import { getProductsInStore } from '../fn/store-controller/get-products-in-store';
import { GetProductsInStore$Params } from '../fn/store-controller/get-products-in-store';
import { getRestaurantLogo } from '../fn/store-controller/get-restaurant-logo';
import { GetRestaurantLogo$Params } from '../fn/store-controller/get-restaurant-logo';
import { getStoreById } from '../fn/store-controller/get-store-by-id';
import { GetStoreById$Params } from '../fn/store-controller/get-store-by-id';
import { PageResponseDrinksResponse } from '../models/page-response-drinks-response';
import { PageResponseProductResponse } from '../models/page-response-product-response';
import { PageResponseStoreResponse } from '../models/page-response-store-response';
import { ProductResponse } from '../models/product-response';
import { StoreResponse } from '../models/store-response';
import { updateDrinkInStore } from '../fn/store-controller/update-drink-in-store';
import { UpdateDrinkInStore$Params } from '../fn/store-controller/update-drink-in-store';
import { updateProductInStore } from '../fn/store-controller/update-product-in-store';
import { UpdateProductInStore$Params } from '../fn/store-controller/update-product-in-store';
import { updateStore } from '../fn/store-controller/update-store';
import { UpdateStore$Params } from '../fn/store-controller/update-store';
import { uploadStoreLogo$FormData } from '../fn/store-controller/upload-store-logo-form-data';
import { UploadStoreLogo$FormData$Params } from '../fn/store-controller/upload-store-logo-form-data';
import { uploadStoreLogo$Webp } from '../fn/store-controller/upload-store-logo-webp';
import { UploadStoreLogo$Webp$Params } from '../fn/store-controller/upload-store-logo-webp';

@Injectable({ providedIn: 'root' })
export class StoreControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getStoreById()` */
  static readonly GetStoreByIdPath = '/stores/{storeId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getStoreById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStoreById$Response(params: GetStoreById$Params, context?: HttpContext): Observable<StrictHttpResponse<StoreResponse>> {
    return getStoreById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getStoreById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStoreById(params: GetStoreById$Params, context?: HttpContext): Observable<StoreResponse> {
    return this.getStoreById$Response(params, context).pipe(
      map((r: StrictHttpResponse<StoreResponse>): StoreResponse => r.body)
    );
  }

  /** Path part for operation `updateStore()` */
  static readonly UpdateStorePath = '/stores/{storeId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateStore()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateStore$Response(params: UpdateStore$Params, context?: HttpContext): Observable<StrictHttpResponse<StoreResponse>> {
    return updateStore(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateStore$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateStore(params: UpdateStore$Params, context?: HttpContext): Observable<StoreResponse> {
    return this.updateStore$Response(params, context).pipe(
      map((r: StrictHttpResponse<StoreResponse>): StoreResponse => r.body)
    );
  }

  /** Path part for operation `deleteStore()` */
  static readonly DeleteStorePath = '/stores/{storeId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteStore()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteStore$Response(params: DeleteStore$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteStore(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteStore$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteStore(params: DeleteStore$Params, context?: HttpContext): Observable<void> {
    return this.deleteStore$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `getProductByIdInStore()` */
  static readonly GetProductByIdInStorePath = '/stores/{storeId}/products/{productId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProductByIdInStore()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProductByIdInStore$Response(params: GetProductByIdInStore$Params, context?: HttpContext): Observable<StrictHttpResponse<ProductResponse>> {
    return getProductByIdInStore(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getProductByIdInStore$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProductByIdInStore(params: GetProductByIdInStore$Params, context?: HttpContext): Observable<ProductResponse> {
    return this.getProductByIdInStore$Response(params, context).pipe(
      map((r: StrictHttpResponse<ProductResponse>): ProductResponse => r.body)
    );
  }

  /** Path part for operation `updateProductInStore()` */
  static readonly UpdateProductInStorePath = '/stores/{storeId}/products/{productId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateProductInStore()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateProductInStore$Response(params: UpdateProductInStore$Params, context?: HttpContext): Observable<StrictHttpResponse<ProductResponse>> {
    return updateProductInStore(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateProductInStore$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateProductInStore(params: UpdateProductInStore$Params, context?: HttpContext): Observable<ProductResponse> {
    return this.updateProductInStore$Response(params, context).pipe(
      map((r: StrictHttpResponse<ProductResponse>): ProductResponse => r.body)
    );
  }

  /** Path part for operation `deleteProductFromStore()` */
  static readonly DeleteProductFromStorePath = '/stores/{storeId}/products/{productId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteProductFromStore()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteProductFromStore$Response(params: DeleteProductFromStore$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteProductFromStore(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteProductFromStore$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteProductFromStore(params: DeleteProductFromStore$Params, context?: HttpContext): Observable<void> {
    return this.deleteProductFromStore$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `getDrinkByIdInStore()` */
  static readonly GetDrinkByIdInStorePath = '/stores/{storeId}/drinks/{drinkId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDrinkByIdInStore()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDrinkByIdInStore$Response(params: GetDrinkByIdInStore$Params, context?: HttpContext): Observable<StrictHttpResponse<DrinksResponse>> {
    return getDrinkByIdInStore(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getDrinkByIdInStore$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDrinkByIdInStore(params: GetDrinkByIdInStore$Params, context?: HttpContext): Observable<DrinksResponse> {
    return this.getDrinkByIdInStore$Response(params, context).pipe(
      map((r: StrictHttpResponse<DrinksResponse>): DrinksResponse => r.body)
    );
  }

  /** Path part for operation `updateDrinkInStore()` */
  static readonly UpdateDrinkInStorePath = '/stores/{storeId}/drinks/{drinkId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateDrinkInStore()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateDrinkInStore$Response(params: UpdateDrinkInStore$Params, context?: HttpContext): Observable<StrictHttpResponse<DrinksResponse>> {
    return updateDrinkInStore(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateDrinkInStore$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateDrinkInStore(params: UpdateDrinkInStore$Params, context?: HttpContext): Observable<DrinksResponse> {
    return this.updateDrinkInStore$Response(params, context).pipe(
      map((r: StrictHttpResponse<DrinksResponse>): DrinksResponse => r.body)
    );
  }

  /** Path part for operation `deleteDrinkFromStore()` */
  static readonly DeleteDrinkFromStorePath = '/stores/{storeId}/drinks/{drinkId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteDrinkFromStore()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteDrinkFromStore$Response(params: DeleteDrinkFromStore$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteDrinkFromStore(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteDrinkFromStore$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteDrinkFromStore(params: DeleteDrinkFromStore$Params, context?: HttpContext): Observable<void> {
    return this.deleteDrinkFromStore$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `getProductsInStore()` */
  static readonly GetProductsInStorePath = '/stores/{storeId}/products';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProductsInStore()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProductsInStore$Response(params: GetProductsInStore$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseProductResponse>> {
    return getProductsInStore(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getProductsInStore$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProductsInStore(params: GetProductsInStore$Params, context?: HttpContext): Observable<PageResponseProductResponse> {
    return this.getProductsInStore$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseProductResponse>): PageResponseProductResponse => r.body)
    );
  }

  /** Path part for operation `addProductToStore()` */
  static readonly AddProductToStorePath = '/stores/{storeId}/products';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addProductToStore()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addProductToStore$Response(params: AddProductToStore$Params, context?: HttpContext): Observable<StrictHttpResponse<ProductResponse>> {
    return addProductToStore(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addProductToStore$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addProductToStore(params: AddProductToStore$Params, context?: HttpContext): Observable<ProductResponse> {
    return this.addProductToStore$Response(params, context).pipe(
      map((r: StrictHttpResponse<ProductResponse>): ProductResponse => r.body)
    );
  }

  /** Path part for operation `getDrinksInStore()` */
  static readonly GetDrinksInStorePath = '/stores/{storeId}/drinks';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDrinksInStore()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDrinksInStore$Response(params: GetDrinksInStore$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseDrinksResponse>> {
    return getDrinksInStore(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getDrinksInStore$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDrinksInStore(params: GetDrinksInStore$Params, context?: HttpContext): Observable<PageResponseDrinksResponse> {
    return this.getDrinksInStore$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseDrinksResponse>): PageResponseDrinksResponse => r.body)
    );
  }

  /** Path part for operation `addDrinkToStore()` */
  static readonly AddDrinkToStorePath = '/stores/{storeId}/drinks';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addDrinkToStore()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addDrinkToStore$Response(params: AddDrinkToStore$Params, context?: HttpContext): Observable<StrictHttpResponse<DrinksResponse>> {
    return addDrinkToStore(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addDrinkToStore$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addDrinkToStore(params: AddDrinkToStore$Params, context?: HttpContext): Observable<DrinksResponse> {
    return this.addDrinkToStore$Response(params, context).pipe(
      map((r: StrictHttpResponse<DrinksResponse>): DrinksResponse => r.body)
    );
  }

  /** Path part for operation `uploadStoreLogo()` */
  static readonly UploadStoreLogoPath = '/stores/store-logo/{storeId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadStoreLogo$Webp()` instead.
   *
   * This method sends `image/webp` and handles request body of type `image/webp`.
   */
  uploadStoreLogo$Webp$Response(params: UploadStoreLogo$Webp$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return uploadStoreLogo$Webp(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `uploadStoreLogo$Webp$Response()` instead.
   *
   * This method sends `image/webp` and handles request body of type `image/webp`.
   */
  uploadStoreLogo$Webp(params: UploadStoreLogo$Webp$Params, context?: HttpContext): Observable<{
}> {
    return this.uploadStoreLogo$Webp$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadStoreLogo$FormData()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadStoreLogo$FormData$Response(params: UploadStoreLogo$FormData$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return uploadStoreLogo$FormData(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `uploadStoreLogo$FormData$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadStoreLogo$FormData(params: UploadStoreLogo$FormData$Params, context?: HttpContext): Observable<{
}> {
    return this.uploadStoreLogo$FormData$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `createStore()` */
  static readonly CreateStorePath = '/stores/create-store/{ownerId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createStore()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createStore$Response(params: CreateStore$Params, context?: HttpContext): Observable<StrictHttpResponse<StoreResponse>> {
    return createStore(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createStore$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createStore(params: CreateStore$Params, context?: HttpContext): Observable<StoreResponse> {
    return this.createStore$Response(params, context).pipe(
      map((r: StrictHttpResponse<StoreResponse>): StoreResponse => r.body)
    );
  }

  /** Path part for operation `changeStoreWebsite()` */
  static readonly ChangeStoreWebsitePath = '/stores/{storeId}/website';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `changeStoreWebsite()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changeStoreWebsite$Response(params: ChangeStoreWebsite$Params, context?: HttpContext): Observable<StrictHttpResponse<StoreResponse>> {
    return changeStoreWebsite(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `changeStoreWebsite$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changeStoreWebsite(params: ChangeStoreWebsite$Params, context?: HttpContext): Observable<StoreResponse> {
    return this.changeStoreWebsite$Response(params, context).pipe(
      map((r: StrictHttpResponse<StoreResponse>): StoreResponse => r.body)
    );
  }

  /** Path part for operation `changeStorePhoneNumber()` */
  static readonly ChangeStorePhoneNumberPath = '/stores/{storeId}/phone';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `changeStorePhoneNumber()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changeStorePhoneNumber$Response(params: ChangeStorePhoneNumber$Params, context?: HttpContext): Observable<StrictHttpResponse<StoreResponse>> {
    return changeStorePhoneNumber(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `changeStorePhoneNumber$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changeStorePhoneNumber(params: ChangeStorePhoneNumber$Params, context?: HttpContext): Observable<StoreResponse> {
    return this.changeStorePhoneNumber$Response(params, context).pipe(
      map((r: StrictHttpResponse<StoreResponse>): StoreResponse => r.body)
    );
  }

  /** Path part for operation `changeStoreOpeningHours()` */
  static readonly ChangeStoreOpeningHoursPath = '/stores/{storeId}/opening-hours';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `changeStoreOpeningHours()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changeStoreOpeningHours$Response(params: ChangeStoreOpeningHours$Params, context?: HttpContext): Observable<StrictHttpResponse<StoreResponse>> {
    return changeStoreOpeningHours(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `changeStoreOpeningHours$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changeStoreOpeningHours(params: ChangeStoreOpeningHours$Params, context?: HttpContext): Observable<StoreResponse> {
    return this.changeStoreOpeningHours$Response(params, context).pipe(
      map((r: StrictHttpResponse<StoreResponse>): StoreResponse => r.body)
    );
  }

  /** Path part for operation `changeStoreName()` */
  static readonly ChangeStoreNamePath = '/stores/{storeId}/name';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `changeStoreName()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changeStoreName$Response(params: ChangeStoreName$Params, context?: HttpContext): Observable<StrictHttpResponse<StoreResponse>> {
    return changeStoreName(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `changeStoreName$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changeStoreName(params: ChangeStoreName$Params, context?: HttpContext): Observable<StoreResponse> {
    return this.changeStoreName$Response(params, context).pipe(
      map((r: StrictHttpResponse<StoreResponse>): StoreResponse => r.body)
    );
  }

  /** Path part for operation `changeStoreEmail()` */
  static readonly ChangeStoreEmailPath = '/stores/{storeId}/email';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `changeStoreEmail()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changeStoreEmail$Response(params: ChangeStoreEmail$Params, context?: HttpContext): Observable<StrictHttpResponse<StoreResponse>> {
    return changeStoreEmail(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `changeStoreEmail$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changeStoreEmail(params: ChangeStoreEmail$Params, context?: HttpContext): Observable<StoreResponse> {
    return this.changeStoreEmail$Response(params, context).pipe(
      map((r: StrictHttpResponse<StoreResponse>): StoreResponse => r.body)
    );
  }

  /** Path part for operation `changeStoreDescription()` */
  static readonly ChangeStoreDescriptionPath = '/stores/{storeId}/description';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `changeStoreDescription()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changeStoreDescription$Response(params: ChangeStoreDescription$Params, context?: HttpContext): Observable<StrictHttpResponse<StoreResponse>> {
    return changeStoreDescription(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `changeStoreDescription$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changeStoreDescription(params: ChangeStoreDescription$Params, context?: HttpContext): Observable<StoreResponse> {
    return this.changeStoreDescription$Response(params, context).pipe(
      map((r: StrictHttpResponse<StoreResponse>): StoreResponse => r.body)
    );
  }

  /** Path part for operation `changeStoreDeliveryAvailability()` */
  static readonly ChangeStoreDeliveryAvailabilityPath = '/stores/{storeId}/delivery';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `changeStoreDeliveryAvailability()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changeStoreDeliveryAvailability$Response(params: ChangeStoreDeliveryAvailability$Params, context?: HttpContext): Observable<StrictHttpResponse<StoreResponse>> {
    return changeStoreDeliveryAvailability(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `changeStoreDeliveryAvailability$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changeStoreDeliveryAvailability(params: ChangeStoreDeliveryAvailability$Params, context?: HttpContext): Observable<StoreResponse> {
    return this.changeStoreDeliveryAvailability$Response(params, context).pipe(
      map((r: StrictHttpResponse<StoreResponse>): StoreResponse => r.body)
    );
  }

  /** Path part for operation `changeStoreAddress()` */
  static readonly ChangeStoreAddressPath = '/stores/{storeId}/address';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `changeStoreAddress()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changeStoreAddress$Response(params: ChangeStoreAddress$Params, context?: HttpContext): Observable<StrictHttpResponse<StoreResponse>> {
    return changeStoreAddress(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `changeStoreAddress$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changeStoreAddress(params: ChangeStoreAddress$Params, context?: HttpContext): Observable<StoreResponse> {
    return this.changeStoreAddress$Response(params, context).pipe(
      map((r: StrictHttpResponse<StoreResponse>): StoreResponse => r.body)
    );
  }

  /** Path part for operation `getAllStores()` */
  static readonly GetAllStoresPath = '/stores';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllStores()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllStores$Response(params?: GetAllStores$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseStoreResponse>> {
    return getAllStores(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllStores$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllStores(params?: GetAllStores$Params, context?: HttpContext): Observable<PageResponseStoreResponse> {
    return this.getAllStores$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseStoreResponse>): PageResponseStoreResponse => r.body)
    );
  }

  /** Path part for operation `getAllStoreInformation()` */
  static readonly GetAllStoreInformationPath = '/stores/{storeId}/all-info';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllStoreInformation()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllStoreInformation$Response(params: GetAllStoreInformation$Params, context?: HttpContext): Observable<StrictHttpResponse<StoreResponse>> {
    return getAllStoreInformation(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllStoreInformation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllStoreInformation(params: GetAllStoreInformation$Params, context?: HttpContext): Observable<StoreResponse> {
    return this.getAllStoreInformation$Response(params, context).pipe(
      map((r: StrictHttpResponse<StoreResponse>): StoreResponse => r.body)
    );
  }

  /** Path part for operation `getAllStoresWithoutDelivery()` */
  static readonly GetAllStoresWithoutDeliveryPath = '/stores/no-delivery';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllStoresWithoutDelivery()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllStoresWithoutDelivery$Response(params?: GetAllStoresWithoutDelivery$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseStoreResponse>> {
    return getAllStoresWithoutDelivery(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllStoresWithoutDelivery$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllStoresWithoutDelivery(params?: GetAllStoresWithoutDelivery$Params, context?: HttpContext): Observable<PageResponseStoreResponse> {
    return this.getAllStoresWithoutDelivery$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseStoreResponse>): PageResponseStoreResponse => r.body)
    );
  }

  /** Path part for operation `getRestaurantLogo()` */
  static readonly GetRestaurantLogoPath = '/stores/logo/{restaurantId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getRestaurantLogo()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRestaurantLogo$Response(params: GetRestaurantLogo$Params, context?: HttpContext): Observable<StrictHttpResponse<Blob>> {
    return getRestaurantLogo(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getRestaurantLogo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRestaurantLogo(params: GetRestaurantLogo$Params, context?: HttpContext): Observable<Blob> {
    return this.getRestaurantLogo$Response(params, context).pipe(
      map((r: StrictHttpResponse<Blob>): Blob => r.body)
    );
  }

  /** Path part for operation `getAllStoresByOwner()` */
  static readonly GetAllStoresByOwnerPath = '/stores/business-store-owner/{ownerId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllStoresByOwner()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllStoresByOwner$Response(params: GetAllStoresByOwner$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseStoreResponse>> {
    return getAllStoresByOwner(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllStoresByOwner$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllStoresByOwner(params: GetAllStoresByOwner$Params, context?: HttpContext): Observable<PageResponseStoreResponse> {
    return this.getAllStoresByOwner$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseStoreResponse>): PageResponseStoreResponse => r.body)
    );
  }

}
