import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RestaurantControllerService } from "../../../../services/services/restaurant-controller.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AddDishToRestaurant$Params } from "../../../../services/fn/restaurant-controller/add-dish-to-restaurant";

@Component({
  selector: 'app-add-dish-restaurant',
  templateUrl: './add-dish-restaurant.component.html',
  styleUrl: './add-dish-restaurant.component.scss'
})
export class AddDishRestaurantComponent implements OnInit {
  dishForm: FormGroup;
  restaurantId: number;

  constructor(
    private fb: FormBuilder,
    private restaurantService: RestaurantControllerService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.dishForm = this.fb.group({
      calories: ['', Validators.required],
      dishes_description: [''],
      dishes_name: ['', Validators.required],
      price: ['', Validators.required],
    });
    this.restaurantId = 0;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const restaurantIdParam = +params['id'] || +params['restaurantId'];
      if (!isNaN(restaurantIdParam)) {
        this.restaurantId = restaurantIdParam;
      } else {
        console.error('Invalid restaurantId:', restaurantIdParam);
      }
    });
  }

  onSubmit() {
    if (this.dishForm.valid) {
      const addRequest: AddDishToRestaurant$Params = {
        restaurantId: this.restaurantId,
        body: {
          dishesName: this.dishForm.get('dishes_name')?.value,
          dishesDescription: this.dishForm.get('dishes_description')?.value,
          calories: Number(this.dishForm.get('calories')?.value) || 0,
          price: Number(this.dishForm.get('price')?.value) || 0,
        }
      };

      this.restaurantService.addDishToRestaurant(addRequest).subscribe(
        (addedDish) => {
          console.log('Dish added successfully', addedDish);
          this.router.navigate(['/tasty-fast/restaurants/details', this.restaurantId]);
        },
        (error) => {
          console.error('Error adding dish', error);
        }
      );
    }
  }

}
