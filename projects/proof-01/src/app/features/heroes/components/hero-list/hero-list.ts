import { Component, DestroyRef, inject, signal } from '@angular/core';
import { HeroItem } from '../hero-item/hero-item';
import { HEROES } from '../../data/heroes';
import { Hero } from '../../types/hero';
import { PowerStatsChangeEvent } from '../../types/power-stats-change.event';
import { Card } from '../../../../core/components/card/card';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'alc-hero-list',
  imports: [HeroItem, Card, RouterLink],
  template: `
    <div class="add-hero-button">
      <button [routerLink]="['./add']">Add Hero</button>
    </div>
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
    .add-hero-button {
      position: absolute;
      position-anchor: --add-hero-anchor;
      bottom: anchor(top);
      left: anchor(left);
    }
  `,
})
export class HeroList {
  protected readonly heroes = signal<Hero[]>(HEROES);
  readonly router = inject(Router);
  readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.router.events
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;
        if (url === '/heroes') {
          const newHero: Hero = history.state['hero'];
          console.log('Router event:', event);
          console.log('State', newHero);
          this.heroes.update(() => [...this.heroes(), newHero]);
        }
      }
    });
  }

  protected heroListChangeEvent(event: PowerStatsChangeEvent) {
    const heroIndex = this.heroes().findIndex((hero) => hero.id === event.hero.id);
    if (heroIndex !== -1) {
      const updatedHeroes = [...this.heroes()];
      updatedHeroes[heroIndex] = {
        ...updatedHeroes[heroIndex],
        powerStats: {
          ...updatedHeroes[heroIndex].powerStats,
          [event.powerStat]:
            event.delta === 0
              ? 0
              : updatedHeroes[heroIndex].powerStats[event.powerStat] + event.delta,
        },
      };
      this.heroes.set(updatedHeroes);
    }
  }
}
