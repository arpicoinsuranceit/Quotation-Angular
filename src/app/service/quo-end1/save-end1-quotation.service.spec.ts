import { TestBed, inject } from '@angular/core/testing';

import { SaveEnd1QuotationService } from './save-end1-quotation.service';

describe('SaveEnd1QuotationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SaveEnd1QuotationService]
    });
  });

  it('should be created', inject([SaveEnd1QuotationService], (service: SaveEnd1QuotationService) => {
    expect(service).toBeTruthy();
  }));
});
