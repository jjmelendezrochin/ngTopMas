import { TestBed } from '@angular/core/testing';

import { ReportePreciosXproductoMensualService } from './reporte-precios-xproducto-mensual.service';

describe('ReportePreciosXproductoMensualService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReportePreciosXproductoMensualService = TestBed.get(ReportePreciosXproductoMensualService);
    expect(service).toBeTruthy();
  });
});
