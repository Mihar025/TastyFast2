import { Component, OnInit } from '@angular/core';
import { StoreResponse } from "../../../../services/models/store-response";
import {ActivatedRoute, Router} from "@angular/router";
import { StoreControllerService } from "../../../../services/services/store-controller.service";
import { CartItemRequest } from "../../../../services/models/cart-item-request";
import { CartResponse } from "../../../../services/models/cart-response";
import { CartControllerService } from "../../../../services/services/cart-controller.service";
import { OrderRequest } from "../../../../services/models/order-request";
import { OrderControllerService } from "../../../../services/services/order-controller.service";
import {ProductResponse} from "../../../../services/models/product-response";
import {DrinksResponse} from "../../../../services/models/drinks-response";
import {AuthenticationService} from "../../../../services/services/authentication.service";

@Component({
  selector: 'app-stores-details',
  templateUrl: './stores-details.component.html',
  styleUrls: ['./stores-details.component.scss']
})
export class StoresDetailsComponent implements OnInit {
  store: StoreResponse | null = null;
  error: string | null = null;
  loading: boolean = false;
  successMessage: string | null = null;
  errorMessage: string |null = null;
  isOwner: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storeService: StoreControllerService,
    private authenticationService: AuthenticationService,
    private cartService: CartControllerService,
    private orderService: OrderControllerService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadStoreDetails(id);
    } else {
      this.error = 'Invalid store ID';
    }
  }

  loadStoreDetails(id: string) {
    const storeId = parseInt(id, 10);

    if (isNaN(storeId)) {
      console.error('Invalid store ID');
      this.error = 'Invalid store ID provided.';
      return;
    }

    this.loading = true;
    this.storeService.getStoreById({ storeId: storeId }).subscribe({
      next: (store) => {
        console.log('Received store data:', store);
        this.store = store;
        this.loading = false;
        this.checkStoreOwnerShip()
      },
      error: (err) => {
        console.error('Error fetching store details:', err);
        this.error = 'Failed to load store details. Please try again later.';
        this.loading = false;
      }
    });
  }

  checkStoreOwnerShip(){
    const currentUserId = this.getCurrentUserId();
    if(currentUserId === null || !this.store){
      this.isOwner = false;
      return
    }
    this.authenticationService.checkStoreOwnership({
      ownerId: currentUserId,
      storeId: this.store.id!
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

  addToCart(item: any, type: 'PRODUCT' | 'DRINK') {
    console.log('addToCart called with:', { item, type });

    const itemId = item.id || (type === 'PRODUCT' ? item.productId : item.drinkId);
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

    this.loading = true;
    this.cartService.addItemToCart({ body: cartItem }).subscribe({
      next: (response: CartResponse) => {
        this.showSuccessMessage('Item added to cart successfully!')
        this.loading = false;
        alert(`${item.productName || item.drinkName} added to cart successfully!`);
      },
      error: (error: any) => {
        console.error('Error adding item to cart:', error);
        this.showErrorMessage(error.error?.message || 'Failed to add item to cart! Please try again!');
      }
    });
  }

  orderNow(item: any, type: 'PRODUCT' | 'DRINK') {
    console.log('orderNow called with:', { item, type });

    const itemId = item.id || (type === 'PRODUCT' ? item.productId : item.drinkId);
    console.log('Extracted itemId:', itemId);

    if (!itemId) {
      console.error('Item ID is missing', item);
      alert('Unable to place order. Item information is incomplete.');
      return;
    }

    if (!this.store || !this.store.id) {
      console.error('Store information is incomplete', this.store);
      alert('Unable to place order. Store information is incomplete.');
      return;
    }

    const orderRequest: OrderRequest = {
      items: [{
        itemId: itemId,
        itemType: type,
        quantity: 1
      }],
      orderType: 'STORE',
      sourceId: this.store.id
    };

    console.log('OrderRequest being sent:', orderRequest);

    this.orderService.createOrderFromSingleItem({ body: orderRequest }).subscribe({
      next: (response) => {
        console.log('Order created successfully', response);
        this.showSuccessMessage('Your order has been placed successfully!')
      },
      error: (error) => {
        console.error('Error creating order:', error);
       this.showErrorMessage(error.error?.message || 'Failed to place order. Please try again!');
      }
    });
  }

  private showSuccessMessage(message: string){
    this.successMessage = message;
    this.errorMessage = null;
    setTimeout(() => this.successMessage = null, 5000);
  }

  private showErrorMessage(message: string){
    this.successMessage = null;
    this.errorMessage = message;
    setTimeout(() => this.errorMessage = null, 5000);
  }


  getProductImage(product: ProductResponse) : string {
//    return `https://source.unsplash.com/300x200/?restaurant,interior,dining&sig=${restaurant.restaurantId}`;
    return `https://picsum.photos/300/200?restaurant&sig=${product.id}`;
  }

  getDrinkImage(drink: DrinksResponse) : string {
//    return `https://source.unsplash.com/300x200/?restaurant,interior,dining&sig=${restaurant.restaurantId}`;
    return `https://picsum.photos/300/200?restaurant&sig=${drink.id}`;
  }

  updateStore() {
    if (this.store) {
      this.router.navigate(['/tasty-fast/stores/update', this.store.id]);
    }
  }

  updateProduct(productId: number) {
    if (this.store) {
      this.router.navigate(['/tasty-fast/stores', this.store.id, 'product', productId, 'update']);
    }
  }

  updateDrink(drinkId: number) {
    if (this.store && this.store.id) {
      this.router.navigate(['/tasty-fast/stores', this.store.id, 'drinks', drinkId, 'update']);
    }
  }


  addProduct() {
    if (this.store) {
      this.router.navigate(['/tasty-fast/stores/addProduct', this.store.id]);
    }
  }

  addDrink() {
    if (this.store) {
      this.router.navigate(['/tasty-fast/stores/addDrink', this.store.id]);
    }
  }


  deleteStore(){
    if(!this.store || !this.store.id){
      console.error('Store information is incomplete');
      this.showErrorMessage('Unable to delete store!');
      return;
    }

    if(confirm('Are you sure you want to delete this store?')){
      this.storeService.deleteStore({storeId: this.store.id}).subscribe({
        next: () => {
          console.log('Store deleted successfully');
          this.showSuccessMessage('Store has been deleted successfully');
          this.router.navigate(['/tasty-fast/stores']);
        },
        error: (error) => {
          console.error('Error deleting store:', error);
          this.showErrorMessage(error.error?.message || 'Failed to delete store. Please try again.');
        }
      });
    }
  }


  deleteProduct(productId: number){
    if (!this.store || !this.store.id) {
      console.error('Store information is incomplete');
      this.showErrorMessage('Unable to delete product!');
      return;
    }

    if (confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      this.storeService.deleteProductFromStore({
        storeId: this.store.id,
        productId: productId
      }).subscribe({
        next: () => {
          console.log('Product deleted successfully');
          this.showSuccessMessage('Product has been deleted successfully!');
          if (this.store && this.store.productResponses) {
            this.store.productResponses = this.store.productResponses.filter(prod => prod.id !== productId);
          }
        },
        error: (error) => {
          console.error('Error deleting product:', error);
          this.showErrorMessage(error.error?.message || 'Failed to delete product. Please try again.');
        }
      });
    }
  }

  deleteDrink(drinkId: number) {
    if(!this.store || !this.store.id){
      console.error('Store information is incomplete');
      this.showErrorMessage('Unable to delete drink!')
      return;
    }
    if (confirm('Are you sure you want to delete this drink? This action cannot be undone.')) {
      this.storeService.deleteDrinkFromStore({
        storeId: this.store.id,
        drinkId: drinkId
      }).subscribe({
        next: () => {
          console.log('Drink deleted successfully');
          this.showSuccessMessage('Drink has been deleted successfully!');
          // Remove the deleted dish from the local array
          if (this.store && this.store.drinksResponses) {
            this.store.drinksResponses = this.store.drinksResponses.filter(drink => drink.id !== drinkId);
          }
        }
      })
    }
  }


}
