import {Component, OnInit} from '@angular/core';
import {RestaurantResponse} from "../../../../services/models/restaurant-response";
import {StoreResponse} from "../../../../services/models/store-response";
import {RestaurantControllerService} from "../../../../services/services/restaurant-controller.service";
import {StoreControllerService} from "../../../../services/services/store-controller.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-main-page',
  templateUrl: './my-main-page.component.html',
  styleUrl: './my-main-page.component.scss'
})
export class MyMainPageComponent implements OnInit{
restaurants: RestaurantResponse [] = [];
stores: StoreResponse [] = [];
error: string[] = [];
specialOffer: RestaurantResponse | null = null;
  baseUrl = 'http://localhost:8088/api/v1';

    constructor(
      private restaurantService: RestaurantControllerService,
      private storeService: StoreControllerService,
      private route: Router
    ) {}

  ngOnInit() {
    this.loadRestaurants();
    this.loadStores();
    this.loadSpecialOffer();
    }


  loadRestaurants() {
    this.restaurantService.getAllRestaurants({ page: 0, size: 5 }).subscribe({
      next: (response) => {
        this.restaurants = response.content || [];
      },
      error: (error) => console.error('Error loading restaurants', error)
    });
  }
  loadSpecialOffer() {
    this.restaurantService.getAllRestaurants({ page: 0, size: 1 }).subscribe({
      next: (response) => {
        if (response.content && response.content.length > 0) {
          this.specialOffer = response.content[0];
        }
      },
      error: (error) => console.error('Error loading special offer', error)
    });
  }





   loadStores() {
      this.storeService.getAllStores({page: 0, size: 5})
        .subscribe({
          next: (response) => {
            this.stores = response.content || [];
          },
          error: (error) => console.error('Error loading stores', error)
        });
   }

  goToRestaurantDetails(restaurant: RestaurantResponse) {
    if (restaurant.restaurantId) {
      this.route.navigate(['/tasty-fast/restaurants/details', restaurant.restaurantId]);
    }
  }

  goToStoreDetails(store: StoreResponse) {
    if (store.id) {
      this.route.navigate(['/tasty-fast/stores/details', store.id]);
    }
  }

  getRestaurantImage(restaurant: RestaurantResponse): string {
    if (restaurant.logoUrl) {
      return `${this.baseUrl}/restaurants/logo/${restaurant.restaurantId}`;
    }
//    return `https://source.unsplash.com/300x200/?restaurant,interior,dining&sig=${restaurant.restaurantId}`;

    return `https://picsum.photos/300/200?restaurant&sig=${restaurant.restaurantId}`;

  }

  getStoreImage(stores: StoreResponse): string {
    return `https://picsum.photos/300/200?restaurant&sig=${stores.id}`;
  }
}
