import { TestBed } from '@angular/core/testing';

import { ReporteAsistenciaService } from './reporte-asistencia.service';

describe('ReporteAsistenciaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReporteAsistenciaService = TestBed.get(ReporteAsistenciaService);
    expect(service).toBeTruthy();
  });
});
