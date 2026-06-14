import { Component, signal } from '@angular/core';
import { HeroItem } from '../hero-item/hero-item';
import { HEROES } from '../../data/heroes';
import { Hero } from '../../types/hero';
import { PowerStatsChangeEvent } from '../../types/power-stats-change.event';
import { Card } from '../../../../core/components/card/card';

@Component({
  selector: 'alc-hero-list',
  imports: [HeroItem, Card],
  template: `
    @if (heroes().length === 0) {
      <alc-card class="no-heroes">
        <p>Aún no hay heroes</p>
      </alc-card>
    }

    <ul>
      @for (hero of heroes(); track hero.id) {
        <li>
          <alc-hero-item
            [hero]="hero"
            (powerStatsChangeEvent)="heroListChangeEvent($event)"
          ></alc-hero-item>
        </li>
      }
    </ul>
  `,
  styles: `
    ul {
      list-style: none;
      padding: 0;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 300px));
      gap: 1rem;
    }
  `,
})
export class HeroList {
  protected readonly heroes = signal<Hero[]>(HEROES);

  protected heroListChangeEvent(event: PowerStatsChangeEvent) {
    const heroIndex = this.heroes().findIndex((hero) => hero.id === event.hero.id);
    if (heroIndex !== -1) {
      const updatedHeroes = [...this.heroes()];
      updatedHeroes[heroIndex] = {
        ...updatedHeroes[heroIndex],
        powerStats: {
          ...updatedHeroes[heroIndex].powerStats,
          [event.powerStat]: event.delta === 0 ? 0 : updatedHeroes[heroIndex].powerStats[event.powerStat] + event.delta,
        },
      };
      this.heroes.set(updatedHeroes);
    }
  }
}
