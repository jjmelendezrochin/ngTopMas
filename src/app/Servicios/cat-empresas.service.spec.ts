import { TestBed } from '@angular/core/testing';

import { CatEmpresasService } from './cat-empresas.service';

describe('CatEmpresasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CatEmpresasService = TestBed.get(CatEmpresasService);
    expect(service).toBeTruthy();
  });
});
