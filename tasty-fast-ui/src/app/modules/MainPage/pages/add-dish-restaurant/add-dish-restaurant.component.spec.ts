import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDishRestaurantComponent } from './add-dish-restaurant.component';

describe('AddDishRestaurantComponent', () => {
  let component: AddDishRestaurantComponent;
  let fixture: ComponentFixture<AddDishRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDishRestaurantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDishRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
