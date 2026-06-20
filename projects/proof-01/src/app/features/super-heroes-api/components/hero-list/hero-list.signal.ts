import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HeroItem } from '../hero-item/hero-item';
import { Hero } from '../../types/hero';
import { PowerStatsChangeEvent } from '../../types/power-stats-change.event';
import { Card } from '../../../../core/components/card/card';
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
  readonly #destroyRef = inject(DestroyRef);

  // readonly router = inject(Router);
  // readonly destroyRef = inject(DestroyRef);

  constructor() {
    // Antes era findAll() y devolvía un array de héroes,
    // ahora load() devuelve un observable de APIResponse

    this.#heroService
      .load()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((response) => {
        this.heroes.set(response.heroes);
      });
  }

  protected heroListChangeEvent(event: PowerStatsChangeEvent) {
    this.#heroService.updatePowerStats(event.hero, event.powerStat, event.delta);
  }
}
