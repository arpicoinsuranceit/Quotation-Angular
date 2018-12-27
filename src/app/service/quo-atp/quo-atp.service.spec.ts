import { TestBed, inject } from '@angular/core/testing';

import { QuoAtpService } from './quo-atp.service';

describe('QuoAtpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuoAtpService]
    });
  });

  it('should be created', inject([QuoAtpService], (service: QuoAtpService) => {
    expect(service).toBeTruthy();
  }));
});
