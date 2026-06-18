import { Service } from '@angular/core';
import { Hero, PowerStat } from '../types/hero';
import { HEROES } from '../data/heroes';

// El estado no es una signal,
// El componente lista incorpora los datos a una signal
// y la renderiza

@Service()
export class HeroesState {
  public heroes: Hero[] = HEROES;

  findAll(): Hero[] {
    console.log('findAll() called');
    return this.heroes;
    // Expone la referencia al array de héroes,
    // lo que permite que cualquier modificación
    // realizada en el array realizada por otros métodos del servicio
    // se refleje en la lista de héroes renderizada como señal.
  }

  add(hero: Hero) {
    console.log(`Adding hero: ${hero.name}`);
    this.heroes.push(hero);
  }

  update(hero: Hero, powerStat: PowerStat, delta: number) {
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
