import { TestBed } from '@angular/core/testing';

import { GenerarZipFotosService } from './generar-zip-fotos.service';

describe('GenerarZipFotosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GenerarZipFotosService = TestBed.get(GenerarZipFotosService);
    expect(service).toBeTruthy();
  });
});
