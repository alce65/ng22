import { TestBed } from '@angular/core/testing';

import { NotesApiRepo } from './notes-api-repo';

describe('NotesApiRepo', () => {
  let service: NotesApiRepo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotesApiRepo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
