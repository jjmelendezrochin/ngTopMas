import { TestBed } from '@angular/core/testing';

import { PromocionUltSerService } from './promocion-ult-ser.service';

describe('PromocionUltSerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PromocionUltSerService = TestBed.get(PromocionUltSerService);
    expect(service).toBeTruthy();
  });
});
