import { TestBed, inject } from '@angular/core/testing';

import { QuoDtaplService } from './quo-dtapl.service';

describe('QuoDtaplService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuoDtaplService]
    });
  });

  it('should be created', inject([QuoDtaplService], (service: QuoDtaplService) => {
    expect(service).toBeTruthy();
  }));
});
