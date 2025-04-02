import { TestBed } from '@angular/core/testing';

import { ServerFromService } from './server-from.service';

describe('ServerFromService', () => {
  let service: ServerFromService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerFromService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
