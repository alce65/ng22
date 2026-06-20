import { Component, DestroyRef, inject } from '@angular/core';
import { HeroForm } from '../components/hero-form/hero-form';
import { HeroesState } from '../services/heroes-state';
import { Hero } from '../types/hero';
import { Router } from '@angular/router';
import { Card } from '../../../core/components/card/card';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'alc-new-page',
  imports: [HeroForm, Card],
  template: `
    <header>
      <alc-card>
        <h2>Añadir un Super Héroe</h2>
      </alc-card>
    </header>
    <alc-hero-form (addHeroEvent)="addHero($event)" />
  `,
  styles: ``,
})
export default class NewPage {
  readonly #router = inject(Router);
  readonly #destroyRef = inject(DestroyRef);
  readonly #heroService = inject(HeroesState);

  // Método en respuesta a un evento del formulario
  addHero(newHeroData: Hero) {
    if (!newHeroData || this.#heroService.isNullHero(newHeroData)) {
      this.#router.navigate(['/super-heroes-api']);
      return;
    }
    console.log('Creating new hero:', newHeroData);
    this.#heroService
      .add(newHeroData)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: (createdHero) => {
          console.log('Hero created successfully:', createdHero);
          
          
          // AL navegar se carga de nuevo la lista de héroes,
          // que invoca el método load() del servicio,
          // que ahora incluirá el nuevo héroe.
          this.#router.navigate(['/super-heroes-api']);
        },
        error: (error) => {
          console.error('Error creating hero:', error);
          // Handle the error, e.g., show a notification to the user
          // this.#router.navigate(['/super-heroes-api']);
        },
      });

  }
}
