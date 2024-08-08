import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantFeedbacksComponent } from './restaurant-feedbacks.component';

describe('RestaurantFeedbacksComponent', () => {
  let component: RestaurantFeedbacksComponent;
  let fixture: ComponentFixture<RestaurantFeedbacksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantFeedbacksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantFeedbacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
