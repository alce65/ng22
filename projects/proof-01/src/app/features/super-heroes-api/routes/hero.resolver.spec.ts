import { TestBed } from '@angular/core/testing';
import { MaybeAsync, RedirectCommand, ResolveFn } from '@angular/router';

import { heroResolver } from './hero.resolver';
import { Hero } from '../types/hero';

describe('heroResolver', () => {
  const executeResolver: ResolveFn<Hero> = (...resolverParameters) =>
    TestBed.runInInjectionContext(
      () => heroResolver(...resolverParameters) as MaybeAsync<Hero | RedirectCommand>
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
