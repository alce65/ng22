import { Service } from '@angular/core';
import { Hero, PowerStat } from '../types/hero';
import { HEROES } from '../data/heroes';

const randomId = () => Math.floor(Math.random() * 10000) + 1000;

const DEFAULT_HERO: Hero = {
  id: randomId(),
  name: 'Joker',
  image: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/370-joker.jpg',
  alignment: 'bad',
  powerStats: {
    intelligence: 100,
    strength: 10,
    speed: 12,
    durability: 60,
    power: 43,
    combat: 70,
  },
};

const NULL_HERO: Hero = {
  id: randomId(),
  name: 'Not Found',
  image: './assets/img/hero-not-found.png',
  alignment: 'bad',
  powerStats: {
    intelligence: -1,
    strength: -1,
    speed: -1,
    durability: -1,
    power: -1,
    combat: -1,
  },
};

// El estado no es una signal,
// El componente lista incorpora los datos a una signal
// y la renderiza

@Service()
export class HeroesState {
  public heroes: Hero[] = HEROES;

  readonly #defaultHero: Hero = DEFAULT_HERO;
  readonly #nullHero: Hero = NULL_HERO;

  get defaultHero(): Hero {
    return this.#defaultHero;
  }

  get nullHero(): Hero {
    return this.#nullHero;
  }

  isDefaultHero(hero: Hero): boolean {
    return hero.id === this.#defaultHero.id;
  }
  isNullHero(hero: Hero): boolean {
    return hero.id === this.#nullHero.id;
  }

  findAll(): Hero[] {
    console.log('findAll() called');
    return this.heroes;
    // Expone la referencia al array de héroes,
    // lo que permite que cualquier modificación
    // realizada en el array realizada por otros métodos del servicio
    // se refleje en la lista de héroes renderizada como señal.
  }

  findById(id: number): Hero {
    console.log(`findById(${id}) called`);
    return this.heroes.find((hero) => hero.id === id) || this.nullHero;
  }

  add(hero: Hero) {
    console.log(`Adding hero: ${hero.name}`);
    this.heroes.push(hero);
  }

  update(updatedHero: Hero) {
    console.log(`Updating updatedHero: ${updatedHero.name}`);
    const index = this.heroes.findIndex((hero) => hero.id === updatedHero.id);
    if (index !== -1) {
      this.heroes[index] = updatedHero;
    }
  }

  delete(hero: Hero) {
    console.log(`Deleting hero: ${hero.name}`);
    this.heroes = this.heroes.filter((h) => h.id !== hero.id);
  }

  updatePowerStas(hero: Hero, powerStat: PowerStat, delta: number) {
    console.log(`Updating hero: ${hero.name}`);
    hero.powerStats[powerStat] += delta;

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
