import { TestBed } from '@angular/core/testing';

import { RubixGameStateService } from './rubix-game-state.service';

describe('RubixGameStateService', () => {
  let service: RubixGameStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RubixGameStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
