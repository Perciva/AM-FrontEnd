import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSpecialShiftDialogComponent } from './add-special-shift-dialog.component';

describe('AddSpecialShiftDialogComponent', () => {
  let component: AddSpecialShiftDialogComponent;
  let fixture: ComponentFixture<AddSpecialShiftDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSpecialShiftDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSpecialShiftDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
