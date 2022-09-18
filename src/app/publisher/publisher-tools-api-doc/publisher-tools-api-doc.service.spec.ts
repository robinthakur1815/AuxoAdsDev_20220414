import { TestBed } from '@angular/core/testing';

import { PublisherToolsApiDocService } from './publisher-tools-api-doc.service';

describe('PublisherToolsApiDocService', () => {
  let service: PublisherToolsApiDocService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublisherToolsApiDocService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
