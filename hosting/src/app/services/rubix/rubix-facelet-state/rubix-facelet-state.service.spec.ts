import { TestBed } from '@angular/core/testing';

import { RubixFaceletStateService } from './rubix-facelet-state.service';

describe('RubixFaceletStateService', () => {
  let service: RubixFaceletStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RubixFaceletStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
