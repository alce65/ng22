import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { Card } from '../../../core/components/card/card';
import { HeroForm } from '../components/hero-form/hero-form';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroesState } from '../services/heroes-state';
import { JsonPipe } from '@angular/common';
import { NotFoundHero } from '../components/not-found-hero/not-found-hero';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Hero } from '../types/hero';

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
  readonly #destroyRef = inject(DestroyRef);
  readonly #heroState = inject(HeroesState);

  protected readonly hero = signal(this.#activateRoute.snapshot.data['superHero']);
  protected readonly isNullHero = computed(() => this.#heroState.isNullHero(this.hero()));

  updateHero(hero: Hero): void {
    if (this.#heroState.isNullHero(hero)) {
      console.log('Operación cancelada.');
      this.#router.navigate(['/super-heroes-api']);
      return;
    }

    console.log('Updating hero:', hero);
    this.#heroState
      .update(hero)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: (updatedHero) => {
          console.log('Hero updated successfully:', updatedHero);
          this.#router.navigate(['/super-heroes-api']);
        },
        error: (error) => {
          console.error('Error updating hero:', error);
          // this.#router.navigate(['/super-heroes-api']);
        },
      });
  }
}
