import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestaurantControllerService } from '../../../../services/services/restaurant-controller.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AddDrinkToRestaurant$Params } from '../../../../services/fn/restaurant-controller/add-drink-to-restaurant';

@Component({
  selector: 'app-add-drink-restaurant',
  templateUrl: './add-drink-restaurant.component.html',
  styleUrls: ['./add-drink-restaurant.component.scss']
})
export class AddDrinkRestaurantComponent implements OnInit {
  drinkForm: FormGroup;
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
    if (this.drinkForm.valid) {
      const addRequest: AddDrinkToRestaurant$Params = {
        restaurantId: this.restaurantId,
        body: {
          drinkName: this.drinkForm.get('drinkName')?.value,
          drinkDescription: this.drinkForm.get('drinkDescription')?.value,
          calories: Number(this.drinkForm.get('calories')?.value) || 0,
          price: Number(this.drinkForm.get('price')?.value) || 0,
        }
      };

      this.restaurantService.addDrinkToRestaurant(addRequest).subscribe(
        (addedDrink) => {
          console.log('Drink added successfully', addedDrink);
          this.router.navigate(['/tasty-fast/restaurants/details', this.restaurantId]);
        },
        (error) => {
          console.error('Error adding drink', error);
        }
      );
    }
  }
}
