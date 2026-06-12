import { TestBed } from '@angular/core/testing';

import { NotesResourceRepo } from './notes-resource-repo';

describe('NotesResourceRepo', () => {
  let service: NotesResourceRepo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotesResourceRepo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
