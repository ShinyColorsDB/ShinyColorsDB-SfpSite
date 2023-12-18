import { TestBed } from '@angular/core/testing';

import { ShinyColorsSfpUtilService } from './shiny-colors-util.service';

describe('ShinyColorsSfpUtilService', () => {
  let service: ShinyColorsSfpUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShinyColorsSfpUtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
