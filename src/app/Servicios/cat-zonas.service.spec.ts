import { TestBed } from '@angular/core/testing';

import { CatZonasService } from './cat-zonas.service';

describe('CatZonasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CatZonasService = TestBed.get(CatZonasService);
    expect(service).toBeTruthy();
  });
});
