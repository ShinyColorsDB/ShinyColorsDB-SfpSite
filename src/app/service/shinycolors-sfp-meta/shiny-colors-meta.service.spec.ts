import { TestBed } from '@angular/core/testing';

import { ShinyColorsSfpMetaService } from './shiny-colors-meta.service';

describe('ShinyColorsSfpMetaService', () => {
  let service: ShinyColorsSfpMetaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShinyColorsSfpMetaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
