import { TestBed } from '@angular/core/testing';

import { ReportMasterService } from './report-master.service';

describe('ReportMasterService', () => {
  let service: ReportMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
