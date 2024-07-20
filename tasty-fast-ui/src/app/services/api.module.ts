/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { StoreControllerService } from './services/store-controller.service';
import { RestaurantControllerService } from './services/restaurant-controller.service';
import { CartControllerService } from './services/cart-controller.service';
import { ProductControllerService } from './services/product-controller.service';
import { OrderControllerService } from './services/order-controller.service';
import { NotificationControllerService } from './services/notification-controller.service';
import { FeedbackService } from './services/feedback.service';
import { FavoriteControllerService } from './services/favorite-controller.service';
import { DrinkControllerService } from './services/drink-controller.service';
import { DishesControllerService } from './services/dishes-controller.service';
import { AuthenticationService } from './services/authentication.service';
import { UserControllerService } from './services/user-controller.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    StoreControllerService,
    RestaurantControllerService,
    CartControllerService,
    ProductControllerService,
    OrderControllerService,
    NotificationControllerService,
    FeedbackService,
    FavoriteControllerService,
    DrinkControllerService,
    DishesControllerService,
    AuthenticationService,
    UserControllerService,
    ApiConfiguration
  ],
})
export class ApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: ApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
