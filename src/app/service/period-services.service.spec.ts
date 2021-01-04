import { TestBed } from '@angular/core/testing';

import { PeriodServicesService } from './period-services.service';

describe('PeriodServicesService', () => {
  let service: PeriodServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeriodServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
