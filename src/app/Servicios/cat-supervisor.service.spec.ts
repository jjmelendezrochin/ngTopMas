import { TestBed } from '@angular/core/testing';

import { CatSupervisorService } from './cat-supervisor.service';

describe('CatSupervisorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CatSupervisorService = TestBed.get(CatSupervisorService);
    expect(service).toBeTruthy();
  });
});
