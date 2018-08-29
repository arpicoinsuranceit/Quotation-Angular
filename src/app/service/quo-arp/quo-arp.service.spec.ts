import { TestBed, inject } from '@angular/core/testing';

import { QuoArpService } from './quo-arp.service';

describe('QuoArpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuoArpService]
    });
  });

  it('should be created', inject([QuoArpService], (service: QuoArpService) => {
    expect(service).toBeTruthy();
  }));
});
