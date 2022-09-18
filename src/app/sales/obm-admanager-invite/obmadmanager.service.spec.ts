import { TestBed } from '@angular/core/testing';

import { ObmadmanagerService } from './obmadmanager.service';

describe('ObmadmanagerService', () => {
  let service: ObmadmanagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObmadmanagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
