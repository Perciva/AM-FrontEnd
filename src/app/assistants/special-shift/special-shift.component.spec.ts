import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialShiftComponent } from './special-shift.component';

describe('SpecialShiftComponent', () => {
  let component: SpecialShiftComponent;
  let fixture: ComponentFixture<SpecialShiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialShiftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
