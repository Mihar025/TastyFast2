import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { StoreControllerService } from "../../../../services/services/store-controller.service";
import { AddDrinkToStore$Params } from "../../../../services/fn/store-controller/add-drink-to-store";

@Component({
  selector: 'app-add-drink-store',
  templateUrl: './add-drink-store.component.html',
  styleUrls: ['./add-drink-store.component.scss']
})
export class AddDrinkStoreComponent {
  drinkForm: FormGroup;
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
    if (this.drinkForm.valid) {
      const addRequest: AddDrinkToStore$Params = {
        storeId: this.storeId,
        body: {
          drinkName: this.drinkForm.get('drinkName')?.value,
          drinkDescription: this.drinkForm.get('drinkDescription')?.value,
          calories: Number(this.drinkForm.get('calories')?.value) || 0,
          price: Number(this.drinkForm.get('price')?.value) || 0,
        }
      };

      this.storeService.addDrinkToStore(addRequest).subscribe(
        (addedDrink) => {
          console.log('Drink added successfully', addedDrink);
          this.router.navigate(['/tasty-fast/stores/details', this.storeId]);
        },
        (error) => {
          console.error('Error adding drink', error);
        }
      );
    }
  }
}
