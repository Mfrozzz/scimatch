import { TestBed } from '@angular/core/testing';

import { ProjectFBServiceService } from './project-fbservice.service';

describe('ProjectFBServiceService', () => {
  let service: ProjectFBServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectFBServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
