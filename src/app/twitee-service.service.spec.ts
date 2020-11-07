import { TestBed } from '@angular/core/testing';

import { TwiteeServiceService } from './twitee-service.service';

describe('TwiteeServiceService', () => {
  let service: TwiteeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TwiteeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
