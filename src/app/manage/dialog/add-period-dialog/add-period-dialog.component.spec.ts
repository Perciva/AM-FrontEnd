import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPeriodDialogComponent } from './add-period-dialog.component';

describe('AddPeriodDialogComponent', () => {
  let component: AddPeriodDialogComponent;
  let fixture: ComponentFixture<AddPeriodDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPeriodDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPeriodDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
