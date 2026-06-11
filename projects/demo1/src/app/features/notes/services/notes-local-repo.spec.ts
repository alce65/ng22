import { TestBed } from '@angular/core/testing';

import { NotesLocalRepo } from './notes-local-repo';

describe('NotesLocalRepo', () => {
  let service: NotesLocalRepo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotesLocalRepo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
