import { Component, DestroyRef, inject, signal } from '@angular/core';
import { HeroItem } from '../hero-item/hero-item';
import { PowerStatsChangeEvent } from '../../types/power-stats-change.event';
import { Card } from '../../../../core/components/card/card';
import { HeroesState } from '../../services/heroes-state';
import { Observable } from 'rxjs';
import { APIResponse } from '../../services/heroes-state-abstract';
import { AsyncPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Hero } from '../../types/hero';

@Component({
  selector: 'alc-hero-list',
  imports: [HeroItem, Card, AsyncPipe],
  template: `
    @let heroes = (heroes$ | async)?.heroes;

    @if (!heroes || heroes.length === 0) {
      <alc-card class="no-heroes">
        <p>Aún no hay super heroes</p>
      </alc-card>
    }

    <ul>
      @for (hero of heroes; track hero.id) {
        <li>
          <alc-hero-item
            [hero]="hero"
            (powerStatsChangeEvent)="heroListChangeEvent($event)"
            (deleteHeroEvent)="heroDelete(hero)"
          ></alc-hero-item>
        </li>
      }
    </ul>
    <p>Heroes-List sin signals: Rx & AsyncPipe</p>
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
  readonly #heroService = inject(HeroesState);
  readonly #destroyRef = inject(DestroyRef);

  protected readonly heroes$: Observable<APIResponse>;

  constructor() {
    // Antes era findAll() y devolvía un array de héroes,
    // ahora load() devuelve un observable de APIResponse

    this.heroes$ = this.#heroService.load();
  }

  protected heroListChangeEvent(event: PowerStatsChangeEvent) {
    this.#heroService
      .updatePowerStats(event.hero, event.powerStat, event.delta)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe();
  }

  protected heroDelete(hero: Hero) {
    this.#heroService.delete(hero).subscribe(() => {
      // Después de eliminar el héroe, recargamos la lista de héroes
      // this.heroes$ = this.#heroService.load();
    });
  }
}
