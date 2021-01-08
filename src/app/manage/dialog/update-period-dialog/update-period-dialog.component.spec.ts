import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePeriodDialogComponent } from './update-period-dialog.component';

describe('UpdatePeriodDialogComponent', () => {
  let component: UpdatePeriodDialogComponent;
  let fixture: ComponentFixture<UpdatePeriodDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePeriodDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePeriodDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
