import { TestBed } from '@angular/core/testing';

import { DepartmentFbserviceService } from './department-fbservice.service';

describe('DepartmentFbserviceService', () => {
  let service: DepartmentFbserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartmentFbserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
