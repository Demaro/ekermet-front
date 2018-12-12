import { TestBed, inject } from '@angular/core/testing';

import { PlanMensualService } from './plan-mensual.service';

describe('PlanMensualService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlanMensualService]
    });
  });

  it('should be created', inject([PlanMensualService], (service: PlanMensualService) => {
    expect(service).toBeTruthy();
  }));
});
