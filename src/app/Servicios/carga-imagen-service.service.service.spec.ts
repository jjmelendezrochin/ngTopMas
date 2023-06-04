import { TestBed } from '@angular/core/testing';

import { CargaImagenService.ServiceService } from './carga-imagen-service.service.service';

describe('CargaImagenService.ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CargaImagenService.ServiceService = TestBed.get(CargaImagenService.ServiceService);
    expect(service).toBeTruthy();
  });
});
