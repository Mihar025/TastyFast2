import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { RestaurantListComponent } from './pages/restaurant-list/restaurant-list.component';
import { StoreListComponent } from './pages/store-list/store-list.component';
import { RestaurantDetailsComponent } from "./pages/restaurant-details/restaurant-details.component";
import { StoresDetailsComponent } from "./pages/stores-details/stores-details.component";
import { MyMainPageComponent } from "./pages/my-main-page/my-main-page.component";
import { UserSettingsComponent } from "./pages/user-settings/user-settings.component";
import { WatchProfileComponent } from "./pages/watch-profile/watch-profile.component";
import { CartComponent } from "./pages/cart/cart.component";
import { OrdersComponent } from "./pages/orders/orders.component";
import { RestaurantFeedbacksComponent } from "./pages/restaurant-feedbacks/restaurant-feedbacks.component";
import { StoreFeedbackComponent } from "./pages/store-feedback/store-feedback.component";
import { UpdateRestaurantComponent } from "./pages/update-restaurant/update-restaurant.component";
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
import {MyBusinessesComponent} from "./pages/my-businesses/my-businesses.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'restaurants', component: RestaurantListComponent },
      { path: 'stores', component: StoreListComponent },
      { path: 'my-businesses', component: MyBusinessesComponent },
      { path: 'restaurants/details/:id', component: RestaurantDetailsComponent },


      { path: 'restaurants/update/:id', component: UpdateRestaurantComponent }, // Новый маршрут
      { path: 'restaurants/addDish/:id', component: AddDishRestaurantComponent },
      { path: 'restaurants/addDrink/:id', component: AddDrinkRestaurantComponent },
      { path: 'stores/update/:id', component: StoreUpdateComponent },
      { path: 'restaurants/:restaurantId/drinks/:drinkId/update', component: UpdateDrinkRestaurantComponent }, //Вот также зделать только для магазина
      { path: 'restaurants/:restaurantId/dish/:dishId/update', component: UpdateRestaurantDishesComponent },
      { path: 'stores/:storeId/drinks/:drinkId/update', component: UpdateDrinkStoreComponent },
      { path: 'stores/:storeId/product/:productId/update', component: UpdateProductStoreComponent },
      { path: 'restaurants/:id', component: RestaurantDetailsComponent },

      { path: 'stores/addDrink/:id', component: AddDrinkStoreComponent },
      { path: 'stores/addProduct/:id', component: AddProductStoreComponent },

     { path: 'stores/create-store/:userId', component: CreateStoreComponent },
      { path: 'restaurants/create-restaurant/:userId', component: CreateRestaurantComponent },

      // Новый маршрут
      { path: 'stores/details/:id', component: StoresDetailsComponent },
      { path: 'home', component: MyMainPageComponent },
      { path: 'user-settings', component: UserSettingsComponent },
      { path: 'profile', component: WatchProfileComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'cart', component: CartComponent },
      { path: 'restaurant-feedback/:id', component: RestaurantFeedbacksComponent },
      { path: 'store-feedback/:id', component: StoreFeedbackComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainPageRoutingModule { }
