import { TestBed } from '@angular/core/testing';

import { ShiftService } from './shift-services.service';

describe('ShiftService', () => {
  let service: ShiftService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShiftService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
