import { TestBed, inject } from '@angular/core/testing';

import { SaveArtmQuotationService } from './save-artm-quotation.service';

describe('SaveArtmQuotationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SaveArtmQuotationService]
    });
  });

  it('should be created', inject([SaveArtmQuotationService], (service: SaveArtmQuotationService) => {
    expect(service).toBeTruthy();
  }));
});
