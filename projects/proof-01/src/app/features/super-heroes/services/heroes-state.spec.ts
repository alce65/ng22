import { TestBed } from '@angular/core/testing';

import { HeroesState } from './heroes-state';

describe('HeroesState', () => {
  let service: HeroesState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroesState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
