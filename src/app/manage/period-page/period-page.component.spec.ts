import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodPageComponent } from './period-page.component';

describe('PeriodPageComponent', () => {
  let component: PeriodPageComponent;
  let fixture: ComponentFixture<PeriodPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeriodPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
