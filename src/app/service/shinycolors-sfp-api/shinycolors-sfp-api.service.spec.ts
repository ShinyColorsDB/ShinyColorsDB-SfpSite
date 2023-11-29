import { TestBed } from '@angular/core/testing';

import { ShinyColorsSfpAPIService } from './shinycolors-sfp-api.service';

describe('ShinyColorsSfpAPIService', () => {
  let service: ShinyColorsSfpAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShinyColorsSfpAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
