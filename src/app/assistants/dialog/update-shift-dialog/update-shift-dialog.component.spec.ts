import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateShiftDialogComponent } from './update-shift-dialog.component';

describe('UpdateShiftDialogComponent', () => {
  let component: UpdateShiftDialogComponent;
  let fixture: ComponentFixture<UpdateShiftDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateShiftDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateShiftDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
