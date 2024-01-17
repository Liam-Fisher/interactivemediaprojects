import { TestBed } from '@angular/core/testing';

import { RubixCubeletStateService } from './rubix-cubelet-state.service';

describe('RubixCubeletStateService', () => {
  let service: RubixCubeletStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RubixCubeletStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
