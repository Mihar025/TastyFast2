import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreFeedbackComponent } from './store-feedback.component';

describe('StoreFeedbackComponent', () => {
  let component: StoreFeedbackComponent;
  let fixture: ComponentFixture<StoreFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreFeedbackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
