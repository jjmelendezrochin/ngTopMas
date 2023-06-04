import { TestBed } from '@angular/core/testing';

import { ErroresService } from './errores.service';

describe('ErroresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ErroresService = TestBed.get(ErroresService);
    expect(service).toBeTruthy();
  });
});
