import { TestBed, inject } from '@angular/core/testing';

import { BirthdayService } from './birthday.service';

describe('BirthdayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BirthdayService]
    });
  });

  it('should be created', inject([BirthdayService], (service: BirthdayService) => {
    expect(service).toBeTruthy();
  }));
});
