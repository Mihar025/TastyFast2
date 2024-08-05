import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductStoreComponent } from './add-product-store.component';

describe('AddProductStoreComponent', () => {
  let component: AddProductStoreComponent;
  let fixture: ComponentFixture<AddProductStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddProductStoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProductStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
