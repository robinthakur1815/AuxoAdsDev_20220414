import { TestBed } from '@angular/core/testing';

import { ObmadmanagerdomainService } from './obmadmanagerdomain.service';

describe('ObmadmanagerdomainService', () => {
  let service: ObmadmanagerdomainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObmadmanagerdomainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
