/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createProduct } from '../fn/product-controller/create-product';
import { CreateProduct$Params } from '../fn/product-controller/create-product';
import { getAllProducts } from '../fn/product-controller/get-all-products';
import { GetAllProducts$Params } from '../fn/product-controller/get-all-products';
import { getMyProducts } from '../fn/product-controller/get-my-products';
import { GetMyProducts$Params } from '../fn/product-controller/get-my-products';
import { getProductById } from '../fn/product-controller/get-product-by-id';
import { GetProductById$Params } from '../fn/product-controller/get-product-by-id';
import { getProductLogo } from '../fn/product-controller/get-product-logo';
import { GetProductLogo$Params } from '../fn/product-controller/get-product-logo';
import { PageResponseProductResponse } from '../models/page-response-product-response';
import { ProductResponse } from '../models/product-response';
import { uploadProductCover } from '../fn/product-controller/upload-product-cover';
import { UploadProductCover$Params } from '../fn/product-controller/upload-product-cover';
import { uploadProductLogo$FormData } from '../fn/product-controller/upload-product-logo-form-data';
import { UploadProductLogo$FormData$Params } from '../fn/product-controller/upload-product-logo-form-data';
import { uploadProductLogo$Webp } from '../fn/product-controller/upload-product-logo-webp';
import { UploadProductLogo$Webp$Params } from '../fn/product-controller/upload-product-logo-webp';

@Injectable({ providedIn: 'root' })
export class ProductControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllProducts()` */
  static readonly GetAllProductsPath = '/products';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllProducts()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllProducts$Response(params?: GetAllProducts$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseProductResponse>> {
    return getAllProducts(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllProducts$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllProducts(params?: GetAllProducts$Params, context?: HttpContext): Observable<PageResponseProductResponse> {
    return this.getAllProducts$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseProductResponse>): PageResponseProductResponse => r.body)
    );
  }

  /** Path part for operation `createProduct()` */
  static readonly CreateProductPath = '/products';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createProduct()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createProduct$Response(params: CreateProduct$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return createProduct(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createProduct$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createProduct(params: CreateProduct$Params, context?: HttpContext): Observable<number> {
    return this.createProduct$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `uploadProductCover()` */
  static readonly UploadProductCoverPath = '/products/{productId}/cover';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadProductCover()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  uploadProductCover$Response(params: UploadProductCover$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return uploadProductCover(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `uploadProductCover$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  uploadProductCover(params: UploadProductCover$Params, context?: HttpContext): Observable<void> {
    return this.uploadProductCover$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `uploadProductLogo()` */
  static readonly UploadProductLogoPath = '/products/product-logo/{productId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadProductLogo$Webp()` instead.
   *
   * This method sends `image/webp` and handles request body of type `image/webp`.
   */
  uploadProductLogo$Webp$Response(params: UploadProductLogo$Webp$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return uploadProductLogo$Webp(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `uploadProductLogo$Webp$Response()` instead.
   *
   * This method sends `image/webp` and handles request body of type `image/webp`.
   */
  uploadProductLogo$Webp(params: UploadProductLogo$Webp$Params, context?: HttpContext): Observable<{
}> {
    return this.uploadProductLogo$Webp$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadProductLogo$FormData()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadProductLogo$FormData$Response(params: UploadProductLogo$FormData$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return uploadProductLogo$FormData(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `uploadProductLogo$FormData$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadProductLogo$FormData(params: UploadProductLogo$FormData$Params, context?: HttpContext): Observable<{
}> {
    return this.uploadProductLogo$FormData$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `getProductById()` */
  static readonly GetProductByIdPath = '/products/{productId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProductById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProductById$Response(params: GetProductById$Params, context?: HttpContext): Observable<StrictHttpResponse<ProductResponse>> {
    return getProductById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getProductById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProductById(params: GetProductById$Params, context?: HttpContext): Observable<ProductResponse> {
    return this.getProductById$Response(params, context).pipe(
      map((r: StrictHttpResponse<ProductResponse>): ProductResponse => r.body)
    );
  }

  /** Path part for operation `getMyProducts()` */
  static readonly GetMyProductsPath = '/products/my-products';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getMyProducts()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMyProducts$Response(params?: GetMyProducts$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseProductResponse>> {
    return getMyProducts(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getMyProducts$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMyProducts(params?: GetMyProducts$Params, context?: HttpContext): Observable<PageResponseProductResponse> {
    return this.getMyProducts$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseProductResponse>): PageResponseProductResponse => r.body)
    );
  }

  /** Path part for operation `getProductLogo()` */
  static readonly GetProductLogoPath = '/products/logo/{productId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProductLogo()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProductLogo$Response(params: GetProductLogo$Params, context?: HttpContext): Observable<StrictHttpResponse<Blob>> {
    return getProductLogo(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getProductLogo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProductLogo(params: GetProductLogo$Params, context?: HttpContext): Observable<Blob> {
    return this.getProductLogo$Response(params, context).pipe(
      map((r: StrictHttpResponse<Blob>): Blob => r.body)
    );
  }

}
