import { TestBed, inject } from '@angular/core/testing';

import { QuoAibService } from './quo-aib.service';

describe('QuoAibService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuoAibService]
    });
  });

  it('should be created', inject([QuoAibService], (service: QuoAibService) => {
    expect(service).toBeTruthy();
  }));
});
