import { TestBed } from '@angular/core/testing';

import { InsertAttendanceServiceService } from './insert-attendance-service.service';

describe('InsertAttendanceServiceService', () => {
  let service: InsertAttendanceServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsertAttendanceServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
