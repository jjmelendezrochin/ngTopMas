import { TestBed } from '@angular/core/testing';

import { CatPromocionesService } from './cat-promociones.service';

describe('CatPromocionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CatPromocionesService = TestBed.get(CatPromocionesService);
    expect(service).toBeTruthy();
  });
});
