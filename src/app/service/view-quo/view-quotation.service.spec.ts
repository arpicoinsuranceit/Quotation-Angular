import { TestBed, inject } from '@angular/core/testing';

import { ViewQuotationService } from './view-quotation.service';

describe('ViewQuotationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViewQuotationService]
    });
  });

  it('should be created', inject([ViewQuotationService], (service: ViewQuotationService) => {
    expect(service).toBeTruthy();
  }));
});
