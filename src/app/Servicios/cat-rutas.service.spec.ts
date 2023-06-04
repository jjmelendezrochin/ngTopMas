import { TestBed } from '@angular/core/testing';

import { CatRutasService } from './cat-rutas.service';

describe('CatRutasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CatRutasService = TestBed.get(CatRutasService);
    expect(service).toBeTruthy();
  });
});
