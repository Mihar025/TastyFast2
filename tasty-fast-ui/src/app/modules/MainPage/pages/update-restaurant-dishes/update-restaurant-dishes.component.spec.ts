import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRestaurantDishesComponent } from './update-restaurant-dishes.component';

describe('UpdateRestaurantDishesComponent', () => {
  let component: UpdateRestaurantDishesComponent;
  let fixture: ComponentFixture<UpdateRestaurantDishesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateRestaurantDishesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateRestaurantDishesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
