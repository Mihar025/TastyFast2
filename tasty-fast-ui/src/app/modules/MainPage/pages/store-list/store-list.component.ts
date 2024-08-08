import {Component, OnInit} from '@angular/core';
import {PageResponseStoreResponse} from "../../../../services/models/page-response-store-response";
import {StoreControllerService} from "../../../../services/services/store-controller.service";
import {Router} from "@angular/router";
import {TokenService} from "../../../../services/token/token.service";
import {StoreResponse} from "../../../../services/models/store-response";

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrl: './store-list.component.scss'
})
export class StoreListComponent implements OnInit{

  storeResponse: PageResponseStoreResponse ={};
  page = 0;
  size = 5;
  pages: any = [];
  message = '';
  level: 'success' | 'error' = 'success';
  baseUrl = 'http://localhost:8088/api/v1';
  constructor(
    private storeService: StoreControllerService,
    private router: Router,
    private tokenService: TokenService
  ) {
  }

  ngOnInit() {
    this.findAllStores();
  }


  private findAllStores() {
    console.log('Current token:', this.tokenService.token);

    this.storeService.getAllStores({
      page: this.page,
      size: this.size
    }).subscribe({
      next:(store) => {
        console.log('Stores fetched successfully: ', store);
        this.storeResponse = store;
        this.pages = Array(this.storeResponse.totalPages)
          .fill(0)
          .map((_,i) => i);
      }, error: (err) => {
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
  gotToPage(page: number) {
    this.page = page;
    this.findAllStores();
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllStores();
  }

  goToPreviousPage() {
    this.page --;
    this.findAllStores();
  }

  goToLastPage() {
    this.page = this.storeResponse as number - 1;
    this.findAllStores();
  }

  goToNextPage() {
    this.page++;
    this.findAllStores();
  }

  get isLastPage() {
    return this.page === this.storeResponse.totalPages as number - 1;
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

  getStoreImage(store: StoreResponse): string
  {
    if (store.logoUrl) {
      return `${this.baseUrl}/stores/logo/${store.id}`;
    }
//    return `https://source.unsplash.com/300x200/?restaurant,interior,dining&sig=${restaurant.restaurantId}`;
    return `https://picsum.photos/300/200?restaurant&sig=${store.id}`;
  }
}
