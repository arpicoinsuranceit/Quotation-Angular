import { TestBed, inject } from '@angular/core/testing';

import { SaveInvpQuotationService } from './save-invp-quotation.service';

describe('SaveInvpQuotationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SaveInvpQuotationService]
    });
  });

  it('should be created', inject([SaveInvpQuotationService], (service: SaveInvpQuotationService) => {
    expect(service).toBeTruthy();
  }));
});
