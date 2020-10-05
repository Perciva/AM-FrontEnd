import { TestBed } from '@angular/core/testing';

import { MessierService } from './messier.service';

describe('MessierService', () => {
  let service: MessierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
