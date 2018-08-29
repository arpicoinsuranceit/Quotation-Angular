import { TestBed, inject } from '@angular/core/testing';

import { QuoAipService } from './quo-aip.service';

describe('QuoAipService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuoAipService]
    });
  });

  it('should be created', inject([QuoAipService], (service: QuoAipService) => {
    expect(service).toBeTruthy();
  }));
});
