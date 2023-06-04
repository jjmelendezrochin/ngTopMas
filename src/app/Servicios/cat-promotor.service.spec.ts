import { TestBed } from '@angular/core/testing';

import { CatPromotorService } from './cat-promotor.service';

describe('CatPromotorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CatPromotorService = TestBed.get(CatPromotorService);
    expect(service).toBeTruthy();
  });
});
