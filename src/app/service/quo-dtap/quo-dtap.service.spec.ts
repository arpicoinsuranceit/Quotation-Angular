import { TestBed, inject } from '@angular/core/testing';

import { QuoDtapService } from './quo-dtap.service';

describe('QuoDtaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuoDtapService]
    });
  });

  it('should be created', inject([QuoDtapService], (service: QuoDtapService) => {
    expect(service).toBeTruthy();
  }));
});
