import { TestBed } from '@angular/core/testing';

import { PromocionesTiendasService } from './promociones-tiendas.service';

describe('PromocionesTiendasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PromocionesTiendasService = TestBed.get(PromocionesTiendasService);
    expect(service).toBeTruthy();
  });
});
