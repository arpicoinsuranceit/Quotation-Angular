import { TestBed, inject } from '@angular/core/testing';

import { LoadQuotationService } from './load-quotation.service';

describe('LoadQuotationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadQuotationService]
    });
  });

  it('should be created', inject([LoadQuotationService], (service: LoadQuotationService) => {
    expect(service).toBeTruthy();
  }));
});
