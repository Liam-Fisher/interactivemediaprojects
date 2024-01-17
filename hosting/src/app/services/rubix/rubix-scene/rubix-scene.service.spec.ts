import { TestBed } from '@angular/core/testing';

import { RubixSceneService } from './rubix-scene.service';

describe('RubixSceneService', () => {
  let service: RubixSceneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RubixSceneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
