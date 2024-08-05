import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDrinkStoreComponent } from './add-drink-store.component';

describe('AddDrinkStoreComponent', () => {
  let component: AddDrinkStoreComponent;
  let fixture: ComponentFixture<AddDrinkStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDrinkStoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDrinkStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
