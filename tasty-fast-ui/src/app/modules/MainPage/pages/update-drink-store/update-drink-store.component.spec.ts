import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDrinkStoreComponent } from './update-drink-store.component';

describe('UpdateDrinkStoreComponent', () => {
  let component: UpdateDrinkStoreComponent;
  let fixture: ComponentFixture<UpdateDrinkStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateDrinkStoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateDrinkStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
