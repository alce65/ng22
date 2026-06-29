import { TestBed } from '@angular/core/testing';

import { ContactApiRepository } from './contact-api-repository';

describe('ContactApiRepository', () => {
  let service: ContactApiRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactApiRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
