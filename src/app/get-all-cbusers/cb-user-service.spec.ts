import { TestBed } from '@angular/core/testing';

import { CbUserService } from './cb-user-service';

describe('CbUserService', () => {
  let service: CbUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CbUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
