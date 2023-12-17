import { TestBed } from '@angular/core/testing';

import { ShinyColorsMetaService } from './shiny-colors-meta.service';

describe('ShinyColorsMetaService', () => {
  let service: ShinyColorsMetaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShinyColorsMetaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
