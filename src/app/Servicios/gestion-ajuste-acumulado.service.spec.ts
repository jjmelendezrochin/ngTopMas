import { TestBed } from '@angular/core/testing';

import { GestionAjusteAcumuladoService } from './gestion-ajuste-acumulado.service';

describe('GestionAjusteAcumuladoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GestionAjusteAcumuladoService = TestBed.get(GestionAjusteAcumuladoService);
    expect(service).toBeTruthy();
  });
});
