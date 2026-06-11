import { TestBed } from '@angular/core/testing';

import { NotesLocalRxRepo } from './notes-local-rx-repo';

describe('NotesLocalRxRepo', () => {
  let service: NotesLocalRxRepo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotesLocalRxRepo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
