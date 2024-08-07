import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { StoreControllerService } from "../../../../services/services/store-controller.service";
import { Router } from "@angular/router";
import { CreateStore$Params } from "../../../../services/fn/store-controller/create-store";
import { StoreRequest } from "../../../../services/models/store-request";

@Component({
  selector: 'app-create-store',
  templateUrl: './create-store.component.html',
  styleUrl: './create-store.component.scss'
})
export class CreateStoreComponent implements OnInit {
  storeForm: FormGroup;
  userId: number;

  constructor(
    private fb: FormBuilder,
    private storeService: StoreControllerService,
    private router: Router
  ) {
    this.storeForm = this.fb.group({
      storeName: ['', Validators.required],
      description: [''],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      openingHours: [''],
      websiteUrl: [''],
      address: ['', Validators.required],
      active: [true],
      deliveryAvailable: [false],
      logoUrl: ['']
    });
    this.userId = 0;
  }

  ngOnInit() {
    const userIdFromStorage = localStorage.getItem('userId');
    if (userIdFromStorage) {
      this.userId = parseInt(userIdFromStorage, 10);
      if (isNaN(this.userId)) {
        console.error('Invalid userId in localStorage:', userIdFromStorage);
        this.userId = 0;
      }
    } else {
      console.error('No userId found in localStorage');
    }
  }

  onSubmit() {
    if (this.storeForm.valid && this.userId !== 0) {
      const storeRequest: StoreRequest = {
        ...this.storeForm.value,
        ownerId: this.userId
      };

      const createRequest: CreateStore$Params = {
        ownerId: this.userId,
        body: storeRequest
      };

      this.storeService.createStore(createRequest).subscribe(
        (createdStore) => {
          console.log('Store added successfully', createdStore);
          this.router.navigate(['/tasty-fast/stores']);
        },
        (error) => {
          console.error('Error adding store', error);
        }
      );
    } else {
      if (this.userId === 0) {
        console.error('Invalid userId. Cannot create store.');
      }
      if (!this.storeForm.valid) {
        console.error('Form is invalid. Please check all required fields.');
      }
    }
  }
}
