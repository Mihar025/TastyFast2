import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { StoreControllerService } from "../../../../services/services/store-controller.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AddProductToStore$Params } from "../../../../services/fn/store-controller/add-product-to-store";

@Component({
  selector: 'app-add-product-store',
  templateUrl: './add-product-store.component.html',
  styleUrls: ['./add-product-store.component.scss']
})
export class AddProductStoreComponent {
  productForm: FormGroup;
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
    this.storeId = 0;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const storeIdParam = +params['id'] || +params['storeId'];
      if (!isNaN(storeIdParam)) {
        this.storeId = storeIdParam;
      } else {
        console.error('Invalid storeId:', storeIdParam);
      }
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const addRequest: AddProductToStore$Params = {
        storeId: this.storeId,
        body: {
          productName: this.productForm.get('productName')?.value,
          productDescription: this.productForm.get('productDescription')?.value,
          calories: this.productForm.get('calories')?.value,
          price: this.productForm.get('price')?.value,
        }
      };

      this.storeService.addProductToStore(addRequest).subscribe(
        (addedProduct) => {
          console.log('Product added successfully', addedProduct);
          this.router.navigate(['/tasty-fast/stores/details', this.storeId]);
        },
        (error) => {
          console.error('Error adding product', error);
        }
      );
    }
  }
}
