import { Component, DestroyRef, inject, signal } from '@angular/core';
import { HeroItem } from '../hero-item/hero-item';
import { Hero } from '../../types/hero';
import { PowerStatsChangeEvent } from '../../types/power-stats-change.event';
import { Card } from '../../../../core/components/card/card';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HeroesState } from '../../services/heroes-state';

@Component({
  selector: 'alc-hero-list',
  imports: [HeroItem, Card],
  template: `
    @if (heroes().length === 0) {
      <alc-card class="no-heroes">
        <p>Aún no hay super heroes</p>
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
  protected readonly heroes = signal<Hero[]>([]);
  readonly #heroService = inject(HeroesState);

  // readonly router = inject(Router);
  // readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.heroes.set(this.#heroService.findAll());

    // this.router.events.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     const url = event.urlAfterRedirects;
    //     if (url === '/super-heroes-api') {
    //       const newHero: Hero = history.state['hero'];
    //       console.log('Router event:', event);
    //       console.log('State', newHero);
    //       //this.heroes.updatePowerStats(() => [...this.heroes(), newHero]);
    //       this.#heroService.add(newHero);
    //     }
    //   }
    // });
  }

  protected heroListChangeEvent(event: PowerStatsChangeEvent) {
    this.#heroService.updatePowerStats(event.hero, event.powerStat, event.delta);
  }
}
