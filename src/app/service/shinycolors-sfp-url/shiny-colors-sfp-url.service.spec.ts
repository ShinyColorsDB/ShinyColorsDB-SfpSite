import { TestBed } from '@angular/core/testing';

import { ShinyColorsSfpUrlService } from './shiny-colors-sfp-url.service';

describe('ShinyColorsSfpUrlService', () => {
  let service: ShinyColorsSfpUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShinyColorsSfpUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
