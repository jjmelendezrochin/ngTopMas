import { TestBed } from '@angular/core/testing';

import { CatFormatoService } from './cat-formato.service';

describe('CatFormatoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CatFormatoService = TestBed.get(CatFormatoService);
    expect(service).toBeTruthy();
  });
});
