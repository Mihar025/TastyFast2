import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { RestaurantRequest } from "../../../../services/models/restaurant-request";
import { CreateRestaurant$Params } from "../../../../services/fn/restaurant-controller/create-restaurant";
import { RestaurantControllerService } from "../../../../services/services/restaurant-controller.service";

@Component({
  selector: 'app-create-restaurant',
  templateUrl: './create-restaurant.component.html',
  styleUrl: './create-restaurant.component.scss'
})
export class CreateRestaurantComponent implements OnInit {
  restaurantForm: FormGroup;
  userId: number;

  constructor(
    private fb: FormBuilder,
    private restaurantService: RestaurantControllerService,
    private router: Router
  ) {
    this.restaurantForm = this.fb.group({
      restaurantName: ['', Validators.required],
      description: [''],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      openingHours: [''],
      websiteUrl: [''],
      address: ['', Validators.required],
      active: [true],
      deliveryAvailable: [false],
      logo: [''],
      cuisineType: [''],
      seatingCapacity: [null]
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
    if (this.restaurantForm.valid && this.userId !== 0) {
      const restaurantRequest: RestaurantRequest = {
        ...this.restaurantForm.value,
        ownerId: this.userId
      };

      const createRequest: CreateRestaurant$Params = {
        ownerId: this.userId,
        body: restaurantRequest
      };

      this.restaurantService.createRestaurant(createRequest).subscribe(
        (createdRestaurant) => {
          console.log('Restaurant added successfully', createdRestaurant);
          this.router.navigate(['/tasty-fast/restaurants']);
        },
        (error) => {
          console.error('Error adding restaurant', error);
        }
      );
    } else {
      if (this.userId === 0) {
        console.error('Invalid userId. Cannot create restaurant.');
      }
      if (!this.restaurantForm.valid) {
        console.error('Form is invalid. Please check all required fields.');
      }
    }
  }
}
