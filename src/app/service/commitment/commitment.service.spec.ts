import { TestBed, inject } from '@angular/core/testing';

import { CommitmentService } from './commitment.service';

describe('CommitmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommitmentService]
    });
  });

  it('should be created', inject([CommitmentService], (service: CommitmentService) => {
    expect(service).toBeTruthy();
  }));
});
