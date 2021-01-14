import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAssistantDialogComponent } from './update-assistant-dialog.component';

describe('UpdateAssistantDialogComponent', () => {
  let component: UpdateAssistantDialogComponent;
  let fixture: ComponentFixture<UpdateAssistantDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAssistantDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAssistantDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
