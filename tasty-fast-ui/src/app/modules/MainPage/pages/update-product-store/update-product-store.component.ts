import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StoreControllerService} from "../../../../services/services/store-controller.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UpdateDrinkInStore$Params} from "../../../../services/fn/store-controller/update-drink-in-store";
import {UpdateProductInStore$Params} from "../../../../services/fn/store-controller/update-product-in-store";
import {AddProductToStore$Params} from "../../../../services/fn/store-controller/add-product-to-store";

@Component({
  selector: 'app-update-product-store',
  templateUrl: './update-product-store.component.html',
  styleUrl: './update-product-store.component.scss'
})
export class UpdateProductStoreComponent {
  productForm: FormGroup;
  productId: number;
  storeId: number;



  constructor(
    private fb: FormBuilder,
    private storeService: StoreControllerService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      calories: ['', Validators.required],
      productDescription: [''],
      productName: ['', Validators.required],
      price: ['', Validators.required],
    });
    this.productId =0;
    this.storeId= 0;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.storeId = +params['storeId'];
      this.productId = +params['productId'];
      this.loadStoreProductData();
    });
  }

  loadStoreProductData() {
    this.storeService.getProductByIdInStore({ storeId: this.storeId, productId: this.productId })
      .subscribe(
        (product) => {
          this.productForm.patchValue({
            productName: product.productName,
            calories: product.calories,
            productDescription: product.productDescription,
            price: product.price,
          });
        },
        (error) => {
          console.error('Error loading product data', error);
        }
      );
  }
  onSubmit() {
    if (this.productForm.valid) {
      const updateRequest: UpdateProductInStore$Params = {
        storeId: this.storeId,
        productId: this.productId,
        body: {
          productName: this.productForm.get('productName')?.value,
          productDescription: this.productForm.get('productDescription')?.value,
          calories: this.productForm.get('calories')?.value,
          price: this.productForm.get('price')?.value,
        }
      };

      this.storeService.addProductToStore(updateRequest).subscribe(
        (updatedProduct) => {
          console.log('Product updated successfully', updatedProduct);
          this.router.navigate(['/tasty-fast/stores/details', this.storeId]);
        },
        (error) => {
          console.error('Error updating product', error);
        }
      );
    }
  }


}
