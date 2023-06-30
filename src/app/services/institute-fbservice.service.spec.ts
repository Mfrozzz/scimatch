import { TestBed } from '@angular/core/testing';

import { InstituteFbserviceService } from './institute-fbservice.service';

describe('InstituteFbserviceService', () => {
  let service: InstituteFbserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstituteFbserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
