import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDrinkRestaurantComponent } from './update-drink-restaurant.component';

describe('UpdateDrinkRestaurantComponent', () => {
  let component: UpdateDrinkRestaurantComponent;
  let fixture: ComponentFixture<UpdateDrinkRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateDrinkRestaurantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateDrinkRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
