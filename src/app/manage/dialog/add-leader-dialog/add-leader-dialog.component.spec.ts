import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLeaderDialogComponent } from './add-leader-dialog.component';

describe('AddLeaderDialogComponent', () => {
  let component: AddLeaderDialogComponent;
  let fixture: ComponentFixture<AddLeaderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLeaderDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLeaderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
