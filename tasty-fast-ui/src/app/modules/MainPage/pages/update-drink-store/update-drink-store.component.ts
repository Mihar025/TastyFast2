import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { StoreControllerService } from "../../../../services/services/store-controller.service";
import { ActivatedRoute, Router } from "@angular/router";
import { UpdateDrinkInStore$Params } from "../../../../services/fn/store-controller/update-drink-in-store";

@Component({
  selector: 'app-update-drink-store',
  templateUrl: './update-drink-store.component.html',
  styleUrls: ['./update-drink-store.component.scss']
})
export class UpdateDrinkStoreComponent implements OnInit {
  drinkForm: FormGroup;
  drinkId: number;
  storeId: number;

  constructor(
    private fb: FormBuilder,
    private storeService: StoreControllerService,
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
    this.storeId = 0;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.storeId = +params['storeId'];
      this.drinkId = +params['drinkId'];
      this.loadStoreDrinkData();
    });
  }

  loadStoreDrinkData() {
    this.storeService.getDrinkByIdInStore({ storeId: this.storeId, drinkId: this.drinkId })
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
      const updateRequest: UpdateDrinkInStore$Params = {
        storeId: this.storeId,
        drinkId: this.drinkId,
        body: {
          drinkName: this.drinkForm.get('drinkName')?.value,
          drinkDescription: this.drinkForm.get('drinkDescription')?.value,
          price: this.drinkForm.get('price')?.value,
          calories: this.drinkForm.get('calories')?.value,
        }
      };

      this.storeService.updateDrinkInStore(updateRequest).subscribe(
        (updatedDrink) => {
          console.log('Drink updated successfully', updatedDrink);
          this.router.navigate(['/tasty-fast/stores/details', this.storeId]);
        },
        (error) => {
          console.error('Error updating drink', error);
        }
      );
    }
  }
}
