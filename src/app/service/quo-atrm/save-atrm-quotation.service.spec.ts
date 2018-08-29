import { TestBed, inject } from '@angular/core/testing';

import { SaveAtrmQuotationService } from './save-atrm-quotation.service';

describe('SaveAtrmQuotationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SaveAtrmQuotationService]
    });
  });

  it('should be created', inject([SaveAtrmQuotationService], (service: SaveAtrmQuotationService) => {
    expect(service).toBeTruthy();
  }));
});
