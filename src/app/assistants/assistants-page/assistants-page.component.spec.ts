import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistantsPageComponent } from './assistants-page.component';

describe('AssistantsPageComponent', () => {
  let component: AssistantsPageComponent;
  let fixture: ComponentFixture<AssistantsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssistantsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistantsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
