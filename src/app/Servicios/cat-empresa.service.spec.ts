import { TestBed } from '@angular/core/testing';

import { CatEmpresaService } from './cat-empresa.service';

describe('CatEmpresaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CatEmpresaService = TestBed.get(CatEmpresaService);
    expect(service).toBeTruthy();
  });
});
