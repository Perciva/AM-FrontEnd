import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssistantDialogComponent } from './add-assistant-dialog.component';

describe('AddAssistantDialogComponent', () => {
  let component: AddAssistantDialogComponent;
  let fixture: ComponentFixture<AddAssistantDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAssistantDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAssistantDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
