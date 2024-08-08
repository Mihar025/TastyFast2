import { Component, OnInit } from '@angular/core';
import { PageResponseRestaurantResponse } from "../../../../services/models/page-response-restaurant-response";
import { Router } from "@angular/router";
import { RestaurantControllerService } from "../../../../services/services/restaurant-controller.service";
import { RestaurantResponse } from "../../../../services/models/restaurant-response";
import { TokenService } from "../../../../services/token/token.service";

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss']
})
export class RestaurantListComponent implements OnInit {

  restaurantResponse: PageResponseRestaurantResponse = {};
  page = 0;
  size = 5;
  pages: number[] = [];
  message = '';
  level: 'success' | 'error' = 'success';
  baseUrl = 'http://localhost:8088/api/v1';

  constructor(
    public restaurantService: RestaurantControllerService,
    private router: Router,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.findAllRestaurants();
  }

   findAllRestaurants() {
    console.log('Current token:', this.tokenService.token);

    this.restaurantService.getAllRestaurants({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (restaurant) => {
        console.log('Restaurants fetched successfully:', restaurant);
        this.restaurantResponse = restaurant;
        this.pages = Array(this.restaurantResponse.totalPages)
          .fill(0)
          .map((_, i) => i);
      },
      error: (err) => {
        console.error('Error fetching restaurants:', err);
        if (err.status === 403) {
          console.error('Access forbidden. Redirecting to login...');
          this.message = 'Access denied. Please log in.';
        } else {
          this.message = 'Failed to load restaurants. Please try again later.';
        }
        this.level = 'error';
      }
    });
  }



/*
  getRestaurantImage(restaurant: RestaurantResponse): string {
    if (restaurant.restaurantId === 1) {
      console.log('Using sprite image for restaurant 1');
      return 'public/images/sprite.jpeg';
    }
    console.log('Using logo URL:', restaurant.logoUrl);
    return restaurant.logoUrl || 'public/images/sprite.jpeg';
  }
 */
  getRestaurantImage(restaurant: RestaurantResponse): string {
    if (restaurant.logoUrl) {
      return `${this.baseUrl}/restaurants/logo/${restaurant.restaurantId}`;
    }
//    return `https://source.unsplash.com/300x200/?restaurant,interior,dining&sig=${restaurant.restaurantId}`;

    return `https://picsum.photos/300/200?restaurant&sig=${restaurant.restaurantId}`;

  }

  gotToPage(page: number) {
    this.page = page;
    this.findAllRestaurants();
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllRestaurants();
  }

  goToPreviousPage() {
    this.page--;
    this.findAllRestaurants();
  }

  goToLastPage() {
    this.page = this.restaurantResponse.totalPages as number - 1;
    this.findAllRestaurants();
  }

  goToNextPage() {
    this.page++;
    this.findAllRestaurants();
  }

  get isLastPage() {
    return this.page === this.restaurantResponse.totalPages as number - 1;
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
}
