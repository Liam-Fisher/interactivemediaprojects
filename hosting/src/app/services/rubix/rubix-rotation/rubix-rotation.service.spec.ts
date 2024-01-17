import { TestBed } from '@angular/core/testing';

import { RubixRotationService } from './rubix-rotation.service';

describe('RubixRotationService', () => {
  let service: RubixRotationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RubixRotationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
