import { TestBed } from '@angular/core/testing';

import { SolicitationFbServiceService } from './solicitation-fb-service.service';

describe('SolicitationFbServiceService', () => {
  let service: SolicitationFbServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitationFbServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
