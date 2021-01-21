import { TestBed } from '@angular/core/testing';

import { ReportSummaryServiceService } from './report-summary-service.service';

describe('ReportSummaryServiceService', () => {
  let service: ReportSummaryServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportSummaryServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
