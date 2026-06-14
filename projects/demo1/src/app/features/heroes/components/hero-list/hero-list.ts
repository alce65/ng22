import { Component, signal } from '@angular/core';
import { HeroItem } from '../hero-item/hero-item';
import { HEROES } from '../../data/heros';
import { Hero } from '../../types/hero';
import { PowerStatsChangeEvent } from '../../types/power-stats-change.event';

@Component({
  selector: 'alc-hero-list',
  imports: [HeroItem],
  template: `
    <ul>
      @for (hero of heroes(); track hero.id) {
        <li>
          <alc-hero-item [hero]="hero" (powerStatsChangeEvent)="heroListChangeEvent($event)"></alc-hero-item>
        </li>
      }
    </ul>
  `,
  styles: `
    ul {
      list-style: none;
      padding: 0;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 250px));
      gap: 1rem;
    }
  `,
})
export class HeroList {
  protected readonly heroes = signal<Hero[]>(HEROES);



  protected heroListChangeEvent(event: PowerStatsChangeEvent ) {

    const heroIndex = this.heroes().findIndex((hero) => hero.id === event.hero.id);
    if (heroIndex !== -1) {
      const updatedHeroes = [...this.heroes()];
      updatedHeroes[heroIndex] = {
        ...updatedHeroes[heroIndex],
        powerStats: {
          ...updatedHeroes[heroIndex].powerStats,
          [event.powerStat]: event.value,
        },
      };
      this.heroes.set(updatedHeroes);
    }
  }
}
