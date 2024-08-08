import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RestaurantControllerService } from "../../../../services/services/restaurant-controller.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-update-restaurant',
  templateUrl: './update-restaurant.component.html',
  styleUrls: ['./update-restaurant.component.scss']
})
export class UpdateRestaurantComponent implements OnInit {
  restaurantForm: FormGroup;
  restaurantId: number;

  constructor(
    private fb: FormBuilder,
    private restaurantService: RestaurantControllerService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.restaurantForm = this.fb.group({
      restaurantName: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      description: [''],
      openingHours: [''],
      cuisineType: [''],
      seatingCapacity: ['', [Validators.required, Validators.min(1)]],
      deliveryAvailable: [false],
      websiteUrl: ['']
    });
    this.restaurantId = 0;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.restaurantId = +params['id'];
      this.loadRestaurantData();
    });
  }

  loadRestaurantData() {
    this.restaurantService.getRestaurantById({ restaurantId: this.restaurantId }).subscribe(
      (restaurant) => {
        this.restaurantForm.patchValue({
          restaurantName: restaurant.restaurantName,
          address: restaurant.address,
          phoneNumber: restaurant.phoneNumber,
          email: restaurant.email,
          description: restaurant.description,
          openingHours: restaurant.openingHours,
          cuisineType: restaurant.cuisineType,
          seatingCapacity: restaurant.seatingCapacity,
          deliveryAvailable: restaurant.deliveryAvailable,
          websiteUrl: restaurant.websiteUrl
        });
      },
      (error) => {
        console.error('Error loading restaurant data', error);
        // Здесь можно добавить обработку ошибки, например, показать сообщение пользователю
      }
    );
  }

  onSubmit() {
    if (this.restaurantForm.valid) {
      const updateRequest = {
        restaurantId: this.restaurantId,
        body: this.restaurantForm.value
      };
      this.restaurantService.updateRestaurant(updateRequest).subscribe(
        (updatedRestaurant) => {
          console.log('Restaurant updated successfully', updatedRestaurant);
          this.router.navigate(['/restaurants', this.restaurantId]);
        },
        (error) => {
          console.error('Error updating restaurant', error);
          // Здесь можно добавить обработку ошибки, например, показать сообщение пользователю
        }
      );
    }
  }
}
