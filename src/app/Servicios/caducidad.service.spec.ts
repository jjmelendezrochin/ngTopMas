import { TestBed } from '@angular/core/testing';

import { CaducidadService } from './caducidad.service';

describe('CaducidadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CaducidadService = TestBed.get(CaducidadService);
    expect(service).toBeTruthy();
  });
});
