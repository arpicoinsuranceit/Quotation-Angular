import { TestBed, inject } from '@angular/core/testing';

import { CodeTransferService } from './code-transfer.service';

describe('CodeTransferService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CodeTransferService]
    });
  });

  it('should be created', inject([CodeTransferService], (service: CodeTransferService) => {
    expect(service).toBeTruthy();
  }));
});
