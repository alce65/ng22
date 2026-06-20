import { Component, computed, inject, signal } from '@angular/core';
import { Card } from '../../../core/components/card/card';
import { HeroForm } from '../components/hero-form/hero-form';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroesState } from '../services/heroes-state';
import { JsonPipe } from '@angular/common';
import { NotFoundHero } from '../components/not-found-hero/not-found-hero';

@Component({
  selector: 'alc-edit-page',
  imports: [Card, HeroForm, NotFoundHero, JsonPipe],
  template: `
    <header>
      <alc-card>
        <h2>Editar un Super Héroe</h2>
      </alc-card>
    </header>
    @if (isNullHero()) {
      <alc-not-found-hero />
    } @else {
      <alc-hero-form [initialHero]="hero()" (addHeroEvent)="updateHero($event)" />
      <pre>{{ hero() | json }}</pre>
    }
  `,
  styles: ``,
})
export default class EditPage {
  readonly #router = inject(Router);
  readonly #activateRoute = inject(ActivatedRoute);
  readonly #heroState = inject(HeroesState);

  protected readonly hero = signal(this.#activateRoute.snapshot.data['superHero']);
  protected readonly isNullHero = computed(() => this.#heroState.isNullHero(this.hero()));

  updateHero(hero: any): void {
    console.log('Updating hero:', hero);
    this.#heroState.update(hero);
    this.#router.navigate(['/super-heroes-api']);
  }
}
