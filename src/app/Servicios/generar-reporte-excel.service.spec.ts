import { TestBed } from '@angular/core/testing';

import { GenerarReporteExcelService } from './generar-reporte-excel.service';

describe('GenerarReporteExcelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GenerarReporteExcelService = TestBed.get(GenerarReporteExcelService);
    expect(service).toBeTruthy();
  });
});
