import { TestBed } from '@angular/core/testing';

import { CatProductosService } from './cat-productos.service';

describe('CatProductosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CatProductosService = TestBed.get(CatProductosService);
    expect(service).toBeTruthy();
  });
});
