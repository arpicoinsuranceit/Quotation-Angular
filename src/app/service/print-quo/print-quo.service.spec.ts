import { TestBed, inject } from '@angular/core/testing';

import { PrintQuoService } from './print-quo.service';

describe('PrintQuoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrintQuoService]
    });
  });

  it('should be created', inject([PrintQuoService], (service: PrintQuoService) => {
    expect(service).toBeTruthy();
  }));
});
