import { TestBed } from '@angular/core/testing';

import { CatcadenaService } from './catcadena.service';

describe('CatcadenaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CatcadenaService = TestBed.get(CatcadenaService);
    expect(service).toBeTruthy();
  });
});
