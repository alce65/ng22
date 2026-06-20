import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, computed, inject, input, numberAttribute, OnChanges, SimpleChanges } from '@angular/core';
import { HeroesState } from '../services/heroes-state';
import { NotFoundHero } from '../components/not-found-hero/not-found-hero';
import { map, of } from 'rxjs';
import { Hero } from '../types/hero';

@Component({
  selector: 'alc-details-page',
  imports: [JsonPipe, AsyncPipe, NotFoundHero],
  template: `
    @let hero = this.hero$ | async; 
 
    @if (hero && this.heroState.isNullHero(hero)) {
      <alc-not-found-hero />
    } @else if (hero) {
      <p>details-page works!</p>
      <pre>{{ hero  | json }}</pre>
    }
  `,
  styles: ``,
})
export default class DetailsPage implements OnChanges {

  // protected readonly activateRoute = inject(ActivatedRoute);
  // protected readonly hero = signal(this.activateRoute.snapshot.data['superHero']);

  protected readonly heroState = inject(HeroesState);
  protected readonly id = input<number>(0, {
    transform: numberAttribute,
  });
  // protected readonly hero = computed(() => this.#heroState.findById(this.id()));

  protected hero$ = of({} as Hero);
  
  // protected readonly isNullHero = computed(() => this.#heroState.isNullHero(this.hero()));
  
  ngOnChanges(changes: SimpleChanges): void {
    console.log('DetailsPage ngOnChanges called with changes:', changes);
    this.hero$ = this.heroState.findById(this.id());
  }

}
