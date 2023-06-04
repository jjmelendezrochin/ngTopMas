import { TestBed } from '@angular/core/testing';

import { GenerarPdf1Service } from './generar-pdf1.service';

describe('GenerarPdf1Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GenerarPdf1Service = TestBed.get(GenerarPdf1Service);
    expect(service).toBeTruthy();
  });
});
