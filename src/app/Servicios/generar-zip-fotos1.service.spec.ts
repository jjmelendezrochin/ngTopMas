import { TestBed } from '@angular/core/testing';

import { GenerarZipFotos1Service } from './generar-zip-fotos1.service';

describe('GenerarZipFotos1Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GenerarZipFotos1Service = TestBed.get(GenerarZipFotos1Service);
    expect(service).toBeTruthy();
  });
});
