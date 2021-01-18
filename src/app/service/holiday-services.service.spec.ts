import { TestBed } from '@angular/core/testing';

import { HolidayServicesService } from './holiday-services.service';

describe('HolidayServicesService', () => {
  let service: HolidayServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HolidayServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
