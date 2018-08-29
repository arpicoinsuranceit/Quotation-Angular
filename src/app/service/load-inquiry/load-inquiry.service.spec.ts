import { TestBed, inject } from '@angular/core/testing';

import { LoadInquiryService } from './load-inquiry.service';

describe('LoadInquiryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadInquiryService]
    });
  });

  it('should be created', inject([LoadInquiryService], (service: LoadInquiryService) => {
    expect(service).toBeTruthy();
  }));
});
