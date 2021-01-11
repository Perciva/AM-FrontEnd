import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLeaderDialogComponent } from './update-leader-dialog.component';

describe('UpdateLeaderDialogComponent', () => {
  let component: UpdateLeaderDialogComponent;
  let fixture: ComponentFixture<UpdateLeaderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateLeaderDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateLeaderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
