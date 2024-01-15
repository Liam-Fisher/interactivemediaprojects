import { TestBed } from '@angular/core/testing';

import { RnboPresetService } from './rnbo-preset.service';

describe('RnboPresetService', () => {
  let service: RnboPresetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RnboPresetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
