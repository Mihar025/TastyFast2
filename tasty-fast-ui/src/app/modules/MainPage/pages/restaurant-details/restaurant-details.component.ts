import { Component, OnInit } from '@angular/core';
import { RestaurantResponse } from "../../../../services/models/restaurant-response";
import { ActivatedRoute } from "@angular/router";
import { RestaurantControllerService } from "../../../../services/services/restaurant-controller.service";
import { CartItemRequest } from "../../../../services/models/cart-item-request";
import { CartResponse } from "../../../../services/models/cart-response";
import { CartControllerService } from "../../../../services/services/cart-controller.service";
import { OrderItemRequest } from "../../../../services/models/order-item-request";
import { OrderRequest } from "../../../../services/models/order-request";
import { OrderControllerService } from "../../../../services/services/order-controller.service";

@Component({
  selector: 'app-details',
  templateUrl: './restaurant-details.component.html',
  styleUrl: './restaurant-details.component.scss'
})
export class RestaurantDetailsComponent implements OnInit {
  restaurant: RestaurantResponse | null = null;
  error: string | null = null;
  id: number | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantControllerService,
    private cartService: CartControllerService,
    private orderService: OrderControllerService
  ) {}

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

    this.restaurantService.getRestaurantById({ restaurantId: restaurantId }).subscribe({
      next: (restaurant) => {
        console.log('Received restaurant data:', restaurant);
        this.restaurant = restaurant;
      },
      error: (err) => {
        console.error('Error fetching restaurant details:', err);
        this.error = 'Failed to load restaurant details. Please try again later.';
      }
    });
  }

  addToCart(item: any, type: 'DISH' | 'DRINK') {
    console.log('addToCart called with:', { item, type });

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

    this.cartService.addItemToCart({ body: cartItem }).subscribe({
      next: (response: CartResponse) => {
        console.log('Item added to cart', response);
        this.showSuccessMessage('Item added to cart successfully!');
      },
      error: (error: any) => {
        console.error('Error adding item to cart:', error);
        this.showErrorMessage(error.error?.message || 'Failed to add item to cart. Please try again.');
      }
    });
  }

  orderNow(item: any, type: 'DISH' | 'DRINK') {
    console.log('orderNow called with:', { item, type });

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

    this.orderService.createOrderFromSingleItem({ body: orderRequest }).subscribe({
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
}
