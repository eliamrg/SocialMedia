import { TestBed } from '@angular/core/testing';

import { BdServiceService } from './bd-service.service';

describe('BdServiceService', () => {
  let service: BdServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BdServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
