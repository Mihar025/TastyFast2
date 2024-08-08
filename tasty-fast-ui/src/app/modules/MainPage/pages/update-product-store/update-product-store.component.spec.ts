import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProductStoreComponent } from './update-product-store.component';

describe('UpdateProductStoreComponent', () => {
  let component: UpdateProductStoreComponent;
  let fixture: ComponentFixture<UpdateProductStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateProductStoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateProductStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
