import { TestBed, inject } from '@angular/core/testing';

import { QuoAsipService } from './quo-asip.service';

describe('QuoAsipService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuoAsipService]
    });
  });

  it('should be created', inject([QuoAsipService], (service: QuoAsipService) => {
    expect(service).toBeTruthy();
  }));
});
