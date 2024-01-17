import { TestBed } from '@angular/core/testing';

import { RnboTimingService } from './rnbo-timing.service';

describe('RnboTimingService', () => {
  let service: RnboTimingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RnboTimingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
