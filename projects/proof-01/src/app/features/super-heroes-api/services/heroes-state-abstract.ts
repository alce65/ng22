import { Observable } from 'rxjs';
import { Hero } from '../types/hero';

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
  image: 'hero-not-found.png',
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

export interface APIResponse {
  heroes: Hero[];
  total: number;
  error: string;
}

export abstract class HeroesStateAbstract {
  protected readonly HERO_API_URL = 'http://localhost:8000/api/heroes';
  protected readonly _defaultHero: Hero = DEFAULT_HERO;
  protected readonly _nullHero: Hero = NULL_HERO;

  isDefaultHero(hero: Hero): boolean {
    return hero.id === this._defaultHero.id;
  }
  isNullHero(hero: Hero): boolean {
    return hero.id === this._nullHero.id;
  }

  abstract load(): Observable<APIResponse>;
  
  // De momento no utilizan el valor devuelto por la API, 
  abstract add(hero: Hero): Observable<Hero>;
  abstract update(updatedHero: Hero): Observable<Hero>;

  
  // Usado en rutas con :id, 
  // en el resolver o el inputSignal del componente
  abstract findById(id: number): Observable<Hero>;
  abstract updatePowerStats(hero: Hero, powerStat: keyof Hero['powerStats'], delta: number): void;
  
  
  abstract findAll(): Hero[];
  abstract delete(hero: Hero): void;
}
