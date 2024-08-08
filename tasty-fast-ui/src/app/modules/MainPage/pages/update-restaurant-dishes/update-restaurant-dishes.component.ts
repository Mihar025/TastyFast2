import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { RestaurantControllerService } from "../../../../services/services/restaurant-controller.service";
import { UpdateDishInRestaurant$Params } from "../../../../services/fn/restaurant-controller/update-dish-in-restaurant";

@Component({
  selector: 'app-update-restaurant-dishes',
  templateUrl: './update-restaurant-dishes.component.html',
  styleUrls: ['./update-restaurant-dishes.component.scss']
})
export class UpdateRestaurantDishesComponent implements OnInit {
  dishesForm: FormGroup;
  dishId: number;
  restaurantId: number;

  constructor(
    private fb: FormBuilder,
    private restaurantService: RestaurantControllerService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.dishesForm = this.fb.group({
      calories: [''],
      dishes_description: [''],
      dishes_name: [''],
      price: [''],
    });
    this.dishId = 0;
    this.restaurantId = 0;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.restaurantId = +params['restaurantId'];
      this.dishId = +params['dishId'];
      this.loadRestaurantDishData();
    });
  }

  loadRestaurantDishData() {
    this.restaurantService.getDishByIdInRestaurant({ restaurantId: this.restaurantId, dishId: this.dishId })
      .subscribe(
        (dish) => {
          this.dishesForm.patchValue({
            dishes_name: dish.dishesName,
            calories: dish.calories,
            dishes_description: dish.dishesDescription,
            price: dish.price,
          });
        },
        (error) => {
          console.error('Error loading product data', error);
        }
      );
  }

  onSubmit() {
    if (this.dishesForm.valid) {
      const updateRequest: UpdateDishInRestaurant$Params = {
        restaurantId: this.restaurantId,
        dishId: this.dishId,
        body: {
          dishesName: this.dishesForm.get('dishes_name')?.value,
          dishesDescription: this.dishesForm.get('dishes_description')?.value,
          calories: this.dishesForm.get('calories')?.value,
          price: this.dishesForm.get('price')?.value,
        }
      };

      this.restaurantService.updateDishInRestaurant(updateRequest).subscribe(
        (updatedDish) => {
          console.log('Dish updated successfully', updatedDish);
          this.router.navigate(['/tasty-fast/restaurants/details', this.restaurantId]);
        },
        (error) => {
          console.error('Error updating product', error);
        }
      );
    }
  }
}
