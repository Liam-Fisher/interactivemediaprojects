import { TestBed } from '@angular/core/testing';

import { RnboKeyboardService } from './rnbo-keyboard.service';

describe('RnboKeyboardService', () => {
  let service: RnboKeyboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RnboKeyboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
