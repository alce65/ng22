import { inject, Service } from '@angular/core';
import { Hero, PowerStat } from '../types/hero';

import { APIResponse, HeroesStateAbstract } from './heroes-state-abstract';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

// El estado no es una signal,
// El componente lista incorpora los datos a una signal
// y la renderiza

@Service()
export class HeroesState extends HeroesStateAbstract {
  readonly #http = inject(HttpClient);

  // El objetivo será eliminar este array
  // y convertir el servicio en un repo, en lugar de un store
  public heroes: Hero[] = [];

  get defaultHero(): Hero {
    return this._defaultHero;
  }

  get nullHero(): Hero {
    return this._nullHero;
  }

  load(): Observable<APIResponse> {
    // Adaptamos nuestra API para que devuelva un observable de APIResponse,
    // Como en el ejemplo seguido

    return this.#http
      .get<Hero[]>(this.HERO_API_URL)
      .pipe(
        map((heroes) => {
          const response: APIResponse = {
            heroes,
            total: heroes.length,
            error: '',
          };
          return response;
        }),
      )
      .pipe(
        catchError((error) => {
          console.error('Error loading heroes:', error);
          const response: APIResponse = { heroes: [], total: 0, error: 'Error loading heroes' };
          return of(response);
        }),
      );
  }

   findAll({ page, limit } = { page: 1, limit: 600 }): Observable<APIResponse> {
    
    const url = `${this.HERO_API_URL}?_page=${page}&_limit=${limit}`;
    return this.#http.get<Hero[]>(
      url
    ).pipe(
      map((heroes) => ({
        heroes: heroes,
        total: heroes.length,
        error: '',
      }))
    );
  }

  findById(id: number): Observable<Hero> {
    console.log(`findById(${id}) called`);
    // return this.heroes.find((hero) => hero.id === id) || this.nullHero;
    const url = `${this.HERO_API_URL}/${id}`;
    return this.#http.get<Hero>(url);
  }

  add(hero: Hero) {
    console.log(`Adding hero: ${hero.name}`);
    //this.heroes.push(hero);
    return this.#http.post<Hero>(this.HERO_API_URL, hero).pipe(
      // map((newHero) => {
      //   this.heroes.push(newHero);
      //   return newHero;
      // }),
      catchError((error) => {
        console.error('Error adding hero:', error);
        return of(this.nullHero);
      }),
    );
  }

  update(updatedHero: Hero) {
    console.log(`Updating updatedHero: ${updatedHero.name}`);
    // const index = this.heroes.findIndex((hero) => hero.id === updatedHero.id);
    // if (index !== -1) {
    //   this.heroes[index] = updatedHero;
    // }

    const url = `${this.HERO_API_URL}/${updatedHero.id}`;
    return this.#http.put<Hero>(url, updatedHero)
    .pipe(
      catchError((error) => {
        console.error('Error updating hero:', error);
        return of(this.nullHero);
      }),
    );
  }

  delete(hero: Hero) {
    console.log(`Deleting hero: ${hero.name}`);
    //this.heroes = this.heroes.filter((h) => h.id !== hero.id);
    const url = `${this.HERO_API_URL}/${hero.id}`;
    return this.#http.delete<void>(url)
    .pipe(
      catchError((error) => {
        console.error('Error deleting hero:', error);
        return of(undefined);
      }),
    ).pipe(
      map(() => undefined)
    );
  }

  updatePowerStats(hero: Hero, powerStat: PowerStat, delta: number) {
    console.log(`Updating hero: ${hero.name}`);
   
    const updatedHero = {
      ...hero,
      powerStats: {
        ...hero.powerStats,
        [powerStat]: hero.powerStats[powerStat] + delta,
      },
    };

    return this.update(updatedHero)

    // const heroIndex = this.heroes().findIndex((hero) => hero.id === event.hero.id);
    //   if (heroIndex !== -1) {
    //     const updatedHeroes = [...this.heroes()];
    //     updatedHeroes[heroIndex] = {
    //       ...updatedHeroes[heroIndex],
    //       powerStats: {
    //         ...updatedHeroes[heroIndex].powerStats,
    //         [event.powerStat]:
    //           event.delta === 0
    //             ? 0
    //             : updatedHeroes[heroIndex].powerStats[event.powerStat] + event.delta,
    //       },
    //     };
    //     this.heroes.set(updatedHeroes);
  }
}
