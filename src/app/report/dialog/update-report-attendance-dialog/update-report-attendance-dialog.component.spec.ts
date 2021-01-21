import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateReportAttendanceDialogComponent } from './update-report-attendance-dialog.component';

describe('UpdateReportAttendanceDialogComponent', () => {
  let component: UpdateReportAttendanceDialogComponent;
  let fixture: ComponentFixture<UpdateReportAttendanceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateReportAttendanceDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateReportAttendanceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
