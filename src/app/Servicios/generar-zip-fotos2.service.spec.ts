import { TestBed } from '@angular/core/testing';

import { GenerarZipFotos2Service } from './generar-zip-fotos2.service';

describe('GenerarZipFotos2Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GenerarZipFotos2Service = TestBed.get(GenerarZipFotos2Service);
    expect(service).toBeTruthy();
  });
});
