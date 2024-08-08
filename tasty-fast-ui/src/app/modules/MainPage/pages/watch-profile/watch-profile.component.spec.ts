import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchProfileComponent } from './watch-profile.component';

describe('WatchProfileComponent', () => {
  let component: WatchProfileComponent;
  let fixture: ComponentFixture<WatchProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WatchProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatchProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
