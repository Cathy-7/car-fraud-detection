import { TestBed } from '@angular/core/testing';

import { NhtsaApiService } from './nhtsa-api.service';

describe('NhtsaApiService', () => {
  let service: NhtsaApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NhtsaApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
