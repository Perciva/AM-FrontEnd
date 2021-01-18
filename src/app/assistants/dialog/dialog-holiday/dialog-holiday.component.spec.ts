import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogHolidayComponent } from './dialog-holiday.component';

describe('DialogHolidayComponent', () => {
  let component: DialogHolidayComponent;
  let fixture: ComponentFixture<DialogHolidayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogHolidayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogHolidayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
