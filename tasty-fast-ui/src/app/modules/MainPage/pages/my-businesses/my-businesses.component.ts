import {Component, OnInit} from '@angular/core';
import {PageResponseRestaurantResponse} from "../../../../services/models/page-response-restaurant-response";
import {RestaurantControllerService} from "../../../../services/services/restaurant-controller.service";
import {Router} from "@angular/router";
import {TokenService} from "../../../../services/token/token.service";
import {NgForOf, NgIf} from "@angular/common";
import {RestaurantResponse} from "../../../../services/models/restaurant-response";
import {StoreResponse} from "../../../../services/models/store-response";
import {PageResponseStoreResponse} from "../../../../services/models/page-response-store-response";
import {StoreControllerService} from "../../../../services/services/store-controller.service";

@Component({
  selector: 'app-my-businesses',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './my-businesses.component.html',
  styleUrl: './my-businesses.component.scss'
})
export class MyBusinessesComponent  implements OnInit{
  restaurantResponse: PageResponseRestaurantResponse = {};
  storeResponse: PageResponseStoreResponse = {};
  page = 0;
  size = 5;
  pages: number[] = [];
  message = '';
  level: 'success' | 'error' = 'success';

  constructor(
    public restaurantService: RestaurantControllerService,
    public storeService: StoreControllerService,
    private router: Router,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.findAllRestaurantsByOwnerId();
    this.findAllStoresByOwnerId();
  }

  private findAllStoresByOwnerId() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User ID not found in localStorage');
      return;
    }

    const ownerId = parseInt(userId, 10);
    if (isNaN(ownerId)) {
      console.error('Invalid user ID in localStorage');
      return;
    }
    console.log('Current token', this.tokenService.token);
    this.storeService.getAllStoresByOwner({
      page: this.page,
      size: this.size,
      ownerId: ownerId
    }).subscribe((response: PageResponseStoreResponse) => {
      this.storeResponse = response;
      this.pages = Array.from({length: response.totalPages || 0}, (_, i) => i);
      this.message = 'Store loaded successfully';
      this.level = 'success';
    },
      (error) => {
        console.error('Error fetching restaurants:', error);
        this.message = 'Error loading restaurants';
        this.level = 'error';
    }
      );
  }

  findAllRestaurantsByOwnerId() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User ID not found in localStorage');
      return;
    }

    const ownerId = parseInt(userId, 10);
    if (isNaN(ownerId)) {
      console.error('Invalid user ID in localStorage');
      return;
    }
    console.log('Current token', this.tokenService.token);

    this.restaurantService.getAllRestaurantsByOwner({
      page: this.page,
      size: this.size,
      ownerId: ownerId
    }).subscribe(
      (response: PageResponseRestaurantResponse) => {
        this.restaurantResponse = response;
        this.pages = Array.from({length: response.totalPages || 0}, (_, i) => i);
        this.message = 'Restaurants loaded successfully';
        this.level = 'success';
      },
      (error) => {
        console.error('Error fetching restaurants:', error);
        this.message = 'Error loading restaurants';
        this.level = 'error';
      }
    );
  }




  getRestaurantImage(restaurant: RestaurantResponse): string {
//    return `https://source.unsplash.com/300x200/?restaurant,interior,dining&sig=${restaurant.restaurantId}`;
    return `https://picsum.photos/300/200?restaurant&sig=${restaurant.restaurantId}`;
  }

  getStoreImage(store: StoreResponse): string
  {
//  return `https://source.unsplash.com/300x200/?restaurant,interior,dining&sig=${restaurant.restaurantId}`;
    return `https://picsum.photos/300/200?restaurant&sig=${store.id}`;
  }

  displayRestaurantDetails(restaurant: RestaurantResponse) {
    if (restaurant.restaurantId) {
      console.log('Navigating to restaurant details with ID:', restaurant.restaurantId);
      this.router.navigate(['/tasty-fast/restaurants/details', restaurant.restaurantId]);
    } else {
      console.error('Restaurant ID is undefined', restaurant);
      this.message = 'Unable to display restaurant details. Invalid restaurant ID.';
      this.level = 'error';
    }
  }

  displayStoreDetails(store: StoreResponse){
    if(store.id){
      this.router.navigate(['/tasty-fast/stores/details', store.id]);
    }
    else {
      console.error('Store ID is undefined');
      this.message = 'Unable to display store details. Invalid store ID.';
      this.level = 'error';
    }
  }


  gotToPage(page: number) {
    this.page = page;
    this.findAllRestaurantsByOwnerId();
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllRestaurantsByOwnerId();
  }

  goToPreviousPage() {
    this.page--;
    this.findAllRestaurantsByOwnerId();
  }

  goToLastPage() {
    this.page = this.restaurantResponse.totalPages as number - 1;
    this.findAllRestaurantsByOwnerId();
  }

  goToNextPage() {
    this.page++;
    this.findAllRestaurantsByOwnerId();
  }

  get isLastPage() {
    return this.page === this.restaurantResponse.totalPages as number - 1;
  }


  navigateToCreateRestaurant() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.router.navigate(['/tasty-fast/restaurants/create-restaurant', userId]);
    } else {
      console.error('User ID not found in localStorage');
      this.message = 'Unable to create restaurant. User ID not found.';
      this.level = 'error';
    }
  }


  navigateToCreateStore() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.router.navigate(['/tasty-fast/stores/create-store', userId]);
    } else {
      console.error('User ID not found in localStorage');
      this.message = 'Unable to create store. User ID not found.';
      this.level = 'error';
    }
  }
}
