import { TestBed } from '@angular/core/testing';
import { MaybeAsync, RedirectCommand, ResolveFn } from '@angular/router';

import { heroAPIResolver } from './hero.resolver';
import { Hero } from '../types/hero';

describe('heroAPIResolver', () => {
  const executeResolver: ResolveFn<Hero> = (...resolverParameters) =>
    TestBed.runInInjectionContext(
      () => heroAPIResolver(...resolverParameters) as MaybeAsync<Hero | RedirectCommand>
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
