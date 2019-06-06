import { TestBed } from '@angular/core/testing';

import { CrearPortafolioService } from './crear-portafolio.service';

describe('CrearPortafolioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CrearPortafolioService = TestBed.get(CrearPortafolioService);
    expect(service).toBeTruthy();
  });
});
