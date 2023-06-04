import { TestBed } from '@angular/core/testing';

import { CatUsuariosService } from './cat-usuarios.service';

describe('CatUsuariosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CatUsuariosService = TestBed.get(CatUsuariosService);
    expect(service).toBeTruthy();
  });
});
