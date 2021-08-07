import { TestBed } from '@angular/core/testing';

import { VendorServicesService } from './vendor-services.service';

describe('VendorServicesService', () => {
  let service: VendorServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendorServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
