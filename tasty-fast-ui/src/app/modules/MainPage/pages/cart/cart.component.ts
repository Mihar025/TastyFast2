import { Component, OnInit } from '@angular/core';
import { CartControllerService } from '../../../../services/services/cart-controller.service';
import { OrderControllerService } from '../../../../services/services/order-controller.service';
import { CartResponse } from '../../../../services/models/cart-response';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: CartResponse | null = null;

  constructor(
    private cartService: CartControllerService,
    private orderService: OrderControllerService
  ) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCart().subscribe({
      next: (cart) => {
        this.cart = cart;
      },
      error: (error) => {
        console.error('Error loading cart:', error);
      }
    });
  }

  removeItem(itemId: number | undefined) {
    if (typeof itemId === 'number') {
      this.cartService.removeItemFromCart({ itemId }).subscribe({
        next: (updatedCart) => {
          this.cart = updatedCart;
        },
        error: (error) => {
          console.error('Error removing item from cart:', error);
        }
      });
    } else {
      console.error('Cannot remove item: itemId is not a number');
    }
  }

  placeOrder() {
    this.orderService.createOrderFromCart().subscribe({
      next: (orderResponse) => {
        console.log('Order placed successfully:', orderResponse);
        this.loadCart(); // Перезагрузите корзину после размещения заказа
      },
      error: (error) => {
        console.error('Error placing order:', error);
      }
    });
  }
}
