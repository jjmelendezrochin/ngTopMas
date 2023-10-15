import { TestBed } from '@angular/core/testing';

import { ReporteSclService } from './reporte-scl.service';

describe('ReporteSclService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReporteSclService = TestBed.get(ReporteSclService);
    expect(service).toBeTruthy();
  });
});
