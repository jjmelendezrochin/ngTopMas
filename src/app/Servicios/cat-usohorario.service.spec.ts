import { TestBed } from '@angular/core/testing';

import { CatUsohorarioService } from './cat-usohorario.service';

describe('CatUsohorarioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CatUsohorarioService = TestBed.get(CatUsohorarioService);
    expect(service).toBeTruthy();
  });
});
