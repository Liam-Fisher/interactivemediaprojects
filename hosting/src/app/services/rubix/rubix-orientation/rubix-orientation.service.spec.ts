import { TestBed } from '@angular/core/testing';

import { RubixOrientationService } from './rubix-orientation.service';

describe('RubixOrientationService', () => {
  let service: RubixOrientationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RubixOrientationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
