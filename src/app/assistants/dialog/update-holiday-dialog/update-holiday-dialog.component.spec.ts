import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateHolidayDialogComponent } from './update-holiday-dialog.component';

describe('UpdateHolidayDialogComponent', () => {
  let component: UpdateHolidayDialogComponent;
  let fixture: ComponentFixture<UpdateHolidayDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateHolidayDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateHolidayDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
