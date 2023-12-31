import { TestBed } from '@angular/core/testing';

import { CloudFunctionsService } from './cloud-functions.service';

describe('CloudFunctionsService', () => {
  let service: CloudFunctionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloudFunctionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
