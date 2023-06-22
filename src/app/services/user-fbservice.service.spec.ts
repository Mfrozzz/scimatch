import { TestBed } from '@angular/core/testing';

import { UserFBServiceService } from './user-fbservice.service';

describe('UserFBServiceService', () => {
  let service: UserFBServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserFBServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
