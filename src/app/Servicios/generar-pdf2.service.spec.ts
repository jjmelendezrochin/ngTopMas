import { TestBed } from '@angular/core/testing';

import { GenerarPdf2Service } from './generar-pdf2.service';

describe('GenerarPdf2Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GenerarPdf2Service = TestBed.get(GenerarPdf2Service);
    expect(service).toBeTruthy();
  });
});
