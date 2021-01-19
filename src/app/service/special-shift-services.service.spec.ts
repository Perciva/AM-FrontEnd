import { TestBed } from '@angular/core/testing';

import { SpecialShiftService } from './special-shift-services.service';

describe('SpecialShiftService', () => {
  let service: SpecialShiftService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecialShiftService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
