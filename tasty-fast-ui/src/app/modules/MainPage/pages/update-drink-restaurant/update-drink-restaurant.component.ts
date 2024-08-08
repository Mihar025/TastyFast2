import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StoreControllerService} from "../../../../services/services/store-controller.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RestaurantControllerService} from "../../../../services/services/restaurant-controller.service";
import {UpdateDrinkInStore$Params} from "../../../../services/fn/store-controller/update-drink-in-store";
import {UpdateDrinkInRestaurant$Params} from "../../../../services/fn/restaurant-controller/update-drink-in-restaurant";

@Component({
  selector: 'app-update-drink-restaurant',
  templateUrl: './update-drink-restaurant.component.html',
  styleUrl: './update-drink-restaurant.component.scss'
})
export class UpdateDrinkRestaurantComponent {
  drinkForm: FormGroup;
  drinkId: number;
  restaurantId: number;

  constructor(
    private fb: FormBuilder,
    private restaurantService: RestaurantControllerService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.drinkForm = this.fb.group({
      drinkName: ['', Validators.required],
      drinkDescription: [''],
      price: ['', Validators.required],
      calories: ['', Validators.required],
    });
    this.drinkId = 0;
    this.restaurantId = 0;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.restaurantId = +params['restaurantId'];
      this.drinkId = +params['drinkId'];
      this.loadRestaurantDrinkData();
    });
  }


  loadRestaurantDrinkData() {
    this.restaurantService.getDrinkByIdInRestaurant({ restaurantId: this.restaurantId, drinkId: this.drinkId })
      .subscribe(
        (drink) => {
          this.drinkForm.patchValue({
            drinkName: drink.drinkName,
            drinkDescription: drink.drinkDescription,
            price: drink.price,
            calories: drink.calories,
          });
        },
        (error) => {
          console.error('Error loading drink data', error);
        }
      );
  }



  onSubmit() {
    if (this.drinkForm.valid) {
      const updateRequest: UpdateDrinkInRestaurant$Params = {
        restaurantId: this.restaurantId,
        drinkId: this.drinkId,
        body: {
          drinkName: this.drinkForm.get('drinkName')?.value,
          drinkDescription: this.drinkForm.get('drinkDescription')?.value,
          price: this.drinkForm.get('price')?.value,
          calories: this.drinkForm.get('calories')?.value,
        }
      };

      this.restaurantService.updateDrinkInRestaurant(updateRequest).subscribe(
        (updatedDrink) => {
          console.log('Drink updated successfully', updatedDrink);
          this.router.navigate(['/tasty-fast/restaurants/details', this.restaurantId]);
        },
        (error) => {
          console.error('Error updating drink', error);
        }
      );
    }
  }
}
