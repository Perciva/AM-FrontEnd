import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSpecialShiftDialogComponent } from './update-special-shift-dialog.component';

describe('UpdateSpecialShiftDialogComponent', () => {
  let component: UpdateSpecialShiftDialogComponent;
  let fixture: ComponentFixture<UpdateSpecialShiftDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSpecialShiftDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSpecialShiftDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
