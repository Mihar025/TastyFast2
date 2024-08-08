import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MainPageRoutingModule } from './mainpage-routing.module';
import {MyMainPageComponent} from "./pages/my-main-page/my-main-page.component";
import {UserSettingsComponent} from "./pages/user-settings/user-settings.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {WatchProfileComponent} from "./pages/watch-profile/watch-profile.component";
import {OrdersComponent} from "./pages/orders/orders.component";
import {CartComponent} from "./pages/cart/cart.component";
import {RestaurantFeedbacksComponent} from "./pages/restaurant-feedbacks/restaurant-feedbacks.component";
import {StoreFeedbackComponent} from "./pages/store-feedback/store-feedback.component";
import {UpdateRestaurantComponent} from "./pages/update-restaurant/update-restaurant.component";
import {StoreUpdateComponent} from "./pages/store-update/store-update.component";
import {UpdateDrinkStoreComponent} from "./pages/update-drink-store/update-drink-store.component";
import {UpdateProductStoreComponent} from "./pages/update-product-store/update-product-store.component";
import {UpdateRestaurantDishesComponent} from "./pages/update-restaurant-dishes/update-restaurant-dishes.component";
import {UpdateDrinkRestaurantComponent} from "./pages/update-drink-restaurant/update-drink-restaurant.component";
import {AddDishRestaurantComponent} from "./pages/add-dish-restaurant/add-dish-restaurant.component";
import {AddDrinkRestaurantComponent} from "./pages/add-drink-restaurant/add-drink-restaurant.component";
import {AddDrinkStoreComponent} from "./pages/add-drink-store/add-drink-store.component";
import {AddProductStoreComponent} from "./pages/add-product-store/add-product-store.component";
import {CreateStoreComponent} from "./pages/create-store/create-store.component";
import {CreateRestaurantComponent} from "./pages/create-restaurant/create-restaurant.component";






@NgModule({
  declarations: [
    MyMainPageComponent,
    UserSettingsComponent,
    WatchProfileComponent,
    OrdersComponent,
    CartComponent,
    RestaurantFeedbacksComponent,
    StoreFeedbackComponent,
    UpdateRestaurantComponent,
    StoreUpdateComponent,
    UpdateDrinkStoreComponent,
    UpdateProductStoreComponent,
    UpdateRestaurantDishesComponent,
    UpdateDrinkRestaurantComponent,
    AddDishRestaurantComponent,
    AddDrinkRestaurantComponent,
    AddDrinkStoreComponent,
    AddProductStoreComponent,
    CreateStoreComponent,
    CreateRestaurantComponent
  ],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class MainPageModule { }
