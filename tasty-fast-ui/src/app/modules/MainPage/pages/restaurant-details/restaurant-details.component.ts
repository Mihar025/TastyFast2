import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantControllerService } from "../../../../services/services/restaurant-controller.service";
import { AuthenticationService } from "../../../../services/services/authentication.service";
import { CartControllerService } from "../../../../services/services/cart-controller.service";
import { OrderControllerService } from "../../../../services/services/order-controller.service";
import { RestaurantResponse } from "../../../../services/models/restaurant-response";
import { DishesResponse } from "../../../../services/models/dishes-response";
import { DrinksResponse } from "../../../../services/models/drinks-response";
import { CartItemRequest } from "../../../../services/models/cart-item-request";
import { OrderRequest } from "../../../../services/models/order-request";
import {deleteRestaurant} from "../../../../services/fn/restaurant-controller/delete-restaurant";

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.scss']
})
export class RestaurantDetailsComponent implements OnInit {
  restaurant: RestaurantResponse | null = null;
  error: string | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  isOwner: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restaurantService: RestaurantControllerService,
    private authenticationService: AuthenticationService,
    private cartService: CartControllerService,
    private orderService: OrderControllerService
  ) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadRestaurantDetails(id);
    } else {
      this.error = 'Invalid restaurant ID';
    }
  }

  loadRestaurantDetails(id: string) {
    const restaurantId = parseInt(id, 10);

    if (isNaN(restaurantId)) {
      console.error('Invalid restaurant ID');
      this.error = 'Invalid restaurant ID provided.';
      return;
    }

    this.restaurantService.getRestaurantById({restaurantId: restaurantId}).subscribe({
      next: (restaurant) => {
        console.log('Received restaurant data:', restaurant);
        this.restaurant = restaurant;
        this.checkOwnerShip();
      },
      error: (err) => {
        console.error('Error fetching restaurant details:', err);
        this.error = 'Failed to load restaurant details. Please try again later.';
      }
    });
  }

  checkOwnerShip() {
    const currentUserId = this.getCurrentUserId();
    if (currentUserId === null || !this.restaurant) {
      this.isOwner = false;
      return;
    }

    this.authenticationService.checkRestaurantOwnership({
      ownerId: currentUserId,
      restaurantId: this.restaurant.restaurantId!
    }).subscribe(
      (isOwner: boolean) => {
        this.isOwner = isOwner;
        console.log('Is owner:', this.isOwner);
      },
      (error) => {
        console.error('Error checking ownership:', error);
        this.isOwner = false;
      }
    );
  }

  private getCurrentUserId(): number | null {
    const userId = localStorage.getItem('userId');
    return userId ? parseInt(userId, 10) : null;
  }

  addToCart(item: any, type: 'DISH' | 'DRINK') {
    console.log('addToCart called with:', {item, type});

    let itemId: number;
    if (type === 'DISH') {
      itemId = item.id || item.dishesId;
    } else {
      itemId = item.id || item.drinkId;
    }

    console.log('Extracted itemId:', itemId);

    if (!itemId) {
      console.error('Item ID is missing', item);
      alert('Unable to add item to cart. Item information is incomplete.');
      return;
    }

    const cartItem: CartItemRequest = {
      itemId: itemId,
      itemType: type,
      quantity: 1
    };

    console.log('CartItem being sent:', cartItem);

    this.cartService.addItemToCart({body: cartItem}).subscribe({
      next: (response) => {
        console.log('Item added to cart', response);
        this.showSuccessMessage('Item added to cart successfully!');
      },
      error: (error) => {
        console.error('Error adding item to cart:', error);
        this.showErrorMessage(error.error?.message || 'Failed to add item to cart. Please try again.');
      }
    });
  }

  orderNow(item: any, type: 'DISH' | 'DRINK') {
    console.log('orderNow called with:', {item, type});

    let itemId: number;
    if (type === 'DISH') {
      itemId = item.id || item.dishesId;
    } else {
      itemId = item.id || item.drinkId;
    }

    console.log('Extracted itemId:', itemId);

    if (!itemId) {
      console.error('Item ID is missing', item);
      alert('Unable to place order. Item information is incomplete.');
      return;
    }

    if (!this.restaurant || !this.restaurant.restaurantId) {
      console.error('Restaurant information is incomplete', this.restaurant);
      alert('Unable to place order. Restaurant information is incomplete.');
      return;
    }

    const orderRequest: OrderRequest = {
      items: [{
        itemId: itemId,
        itemType: type,
        quantity: 1
      }],
      orderType: 'RESTAURANT',
      sourceId: this.restaurant.restaurantId
    };

    console.log('OrderRequest being sent:', orderRequest);

    this.orderService.createOrderFromSingleItem({body: orderRequest}).subscribe({
      next: (response) => {
        console.log('Order created successfully', response);
        this.showSuccessMessage('Your order has been placed successfully!');
      },
      error: (error) => {
        console.error('Error creating order:', error);
        this.showErrorMessage(error.error?.message || 'Failed to place order. Please try again!');
      }
    });
  }

  updateRestaurant() {
    if (this.restaurant) {
      this.router.navigate(['/tasty-fast/restaurants/update', this.restaurant.restaurantId]);
    }
  }






  addDish() {
    if (this.restaurant) {
      this.router.navigate(['/tasty-fast/restaurants/addDish', this.restaurant.restaurantId]);
    }
  }

  addDrink() {
    if (this.restaurant) {
      this.router.navigate(['/tasty-fast/restaurants/addDrink', this.restaurant.restaurantId]);
    }
  }







  updateDish(dishId: number) {
    if (this.restaurant) {
      this.router.navigate(['/tasty-fast/restaurants', this.restaurant.restaurantId, 'dish', dishId, 'update']);
    }
  }

  updateDrink(drinkId: number) {
    if (this.restaurant && this.restaurant.restaurantId) {
      this.router.navigate(['/tasty-fast/restaurants', this.restaurant.restaurantId, 'drinks', drinkId, 'update']);
    }
  }

  getDishImage(dish: DishesResponse): string {
    return `https://picsum.photos/300/200?restaurant&sig=${dish.id}`;
  }

  getDrinkImage(drink: DrinksResponse): string {
    return `https://picsum.photos/300/200?restaurant&sig=${drink.id}`;
  }

  private showSuccessMessage(message: string) {
    this.successMessage = message;
    this.errorMessage = null;
    setTimeout(() => this.successMessage = null, 5000); // Hide after 5 seconds
  }

  private showErrorMessage(message: string) {
    this.errorMessage = message;
    this.successMessage = null;
    setTimeout(() => this.errorMessage = null, 5000); // Hide after 5 seconds
  }

  deleteRestaurant() {
    if (!this.restaurant || !this.restaurant.restaurantId) {
      console.error('Restaurant information is incomplete');
      this.showErrorMessage('Unable to delete restaurant. Restaurant information is incomplete.');
      return;
    }

    if (confirm('Are you sure you want to delete this restaurant? This action cannot be undone.')) {
      this.restaurantService.deleteRestaurant({ restaurantId: this.restaurant.restaurantId }).subscribe({
        next: () => {
          console.log('Restaurant deleted successfully');
          this.showSuccessMessage('Restaurant has been deleted successfully!');
          // Navigate back to the restaurant list or home page
          this.router.navigate(['/tasty-fast/restaurants']);
        },
        error: (error) => {
          console.error('Error deleting restaurant:', error);
          this.showErrorMessage(error.error?.message || 'Failed to delete restaurant. Please try again.');
        }
      });
    }
  }

  deleteDish(dishId: number) {
    if (!this.restaurant || !this.restaurant.restaurantId) {
      console.error('Restaurant information is incomplete');
      this.showErrorMessage('Unable to delete dish!');
      return;
    }

    if (confirm('Are you sure you want to delete this dish? This action cannot be undone.')) {
      this.restaurantService.deleteDishFromRestaurant({
        restaurantId: this.restaurant.restaurantId,
        dishId: dishId
      }).subscribe({
        next: () => {
          console.log('Dish deleted successfully');
          this.showSuccessMessage('Dish has been deleted successfully!');
          // Remove the deleted dish from the local array
          if (this.restaurant && this.restaurant.dishesResponses) {
            this.restaurant.dishesResponses = this.restaurant.dishesResponses.filter(dish => dish.id !== dishId);
          }
        },
        error: (error) => {
          console.error('Error deleting dish:', error);
          this.showErrorMessage(error.error?.message || 'Failed to delete dish. Please try again.');
        }
      });
    }
  }

  deleteDrink(drinkId: number) {
    if(!this.restaurant || !this.restaurant.restaurantId){
      console.error('Restaurant information is incomplete');
      this.showErrorMessage('Unable to delete drink!')
      return;
    }
    if (confirm('Are you sure you want to delete this drink? This action cannot be undone.')) {
      this.restaurantService.deleteDrinkFromRestaurant({
        restaurantId: this.restaurant.restaurantId,
        drinkId: drinkId
      }).subscribe({
        next: () => {
          console.log('Drink deleted successfully');
          this.showSuccessMessage('Drink has been deleted successfully!');
          // Remove the deleted dish from the local array
          if (this.restaurant && this.restaurant.drinksResponses) {
            this.restaurant.drinksResponses = this.restaurant.drinksResponses.filter(drink => drink.id !== drinkId);
          }
        }
      })
    }
  }
}
