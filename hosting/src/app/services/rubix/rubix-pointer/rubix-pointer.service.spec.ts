import { TestBed } from '@angular/core/testing';

import { RubixPointerService } from './rubix-pointer.service';

describe('RubixPointerService', () => {
  let service: RubixPointerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RubixPointerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
