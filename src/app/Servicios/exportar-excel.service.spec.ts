import { TestBed } from '@angular/core/testing';

import { ExportarExcelService } from './exportar-excel.service';

describe('ExportarExcelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExportarExcelService = TestBed.get(ExportarExcelService);
    expect(service).toBeTruthy();
  });
});
