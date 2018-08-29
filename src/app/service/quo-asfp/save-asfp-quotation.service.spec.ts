import { TestBed, inject } from '@angular/core/testing';

import { SaveAsfpQuotationService } from './save-asfp-quotation.service';

describe('SaveAsfpQuotationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SaveAsfpQuotationService]
    });
  });

  it('should be created', inject([SaveAsfpQuotationService], (service: SaveAsfpQuotationService) => {
    expect(service).toBeTruthy();
  }));
});
