import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderPageComponent } from './leader-page.component';

describe('LeaderPageComponent', () => {
  let component: LeaderPageComponent;
  let fixture: ComponentFixture<LeaderPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaderPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
