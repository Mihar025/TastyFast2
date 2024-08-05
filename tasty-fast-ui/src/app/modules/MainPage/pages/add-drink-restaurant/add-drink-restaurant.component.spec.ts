import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDrinkRestaurantComponent } from './add-drink-restaurant.component';

describe('AddDrinkRestaurantComponent', () => {
  let component: AddDrinkRestaurantComponent;
  let fixture: ComponentFixture<AddDrinkRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDrinkRestaurantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDrinkRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
