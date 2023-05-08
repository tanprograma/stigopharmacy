import { TestBed } from '@angular/core/testing';

import { StrengthService } from './strength.service';

describe('StrengthService', () => {
  let service: StrengthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StrengthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
