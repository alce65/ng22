import { inject, input } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { HeroesState } from '../services/heroes-state';
import { Hero } from '../types/hero';

export const heroResolver: ResolveFn<Hero | undefined> = (route, state) => {
  const heroState = inject(HeroesState);

  // const id = route.params['id'] || '0';
  const id = route.paramMap.get('id') || '0';
  const hero = heroState.findById(Number(id));
  console.log('Resolver', hero);

  return hero;
};
