import { JsonPipe } from '@angular/common';
import { Component, computed, inject, input, numberAttribute } from '@angular/core';
import { HeroesState } from '../services/heroes-state';
import { NotFoundHero } from '../components/not-found-hero/not-found-hero';

@Component({
  selector: 'alc-details-page',
  imports: [JsonPipe, NotFoundHero],
  template: `
    @if (isNullHero()) {
      <alc-not-found-hero />
    } @else {
      <p>details-page works!</p>
      <pre>{{ hero() | json }}</pre>
    }
  `,
  styles: ``,
})
export default class DetailsPage {
  // protected readonly activateRoute = inject(ActivatedRoute);
  // protected readonly hero = signal(this.activateRoute.snapshot.data['superHero']);

  readonly #heroState = inject(HeroesState);
  protected readonly id = input<number>(0, {
    transform: numberAttribute,
  });
  protected readonly hero = computed(() => this.#heroState.findById(this.id()));
  protected readonly isNullHero = computed(() => this.#heroState.isNullHero(this.hero()));
}
