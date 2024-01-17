import { TestBed } from '@angular/core/testing';

import { RnboBufferService } from './rnbo-buffer.service';

describe('RnboBufferService', () => {
  let service: RnboBufferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RnboBufferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
