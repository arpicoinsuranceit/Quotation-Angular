import { TestBed, inject } from '@angular/core/testing';

import { QuoDtaService } from './quo-dta.service';

describe('QuoDtaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuoDtaService]
    });
  });

  it('should be created', inject([QuoDtaService], (service: QuoDtaService) => {
    expect(service).toBeTruthy();
  }));
});
