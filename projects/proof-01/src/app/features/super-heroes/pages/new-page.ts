import { Component, inject } from '@angular/core';
import { HeroForm } from '../components/hero-form/hero-form';
import { HeroesState } from '../services/heroes-state';
import { Hero } from '../types/hero';
import { Router } from '@angular/router';
import { Card } from '../../../core/components/card/card';

@Component({
  selector: 'alc-new-page',
  imports: [HeroForm, Card],
  template: `
    <header>
      <alc-card>
        <h2>Añadir un Super Héroe</h2>
      </alc-card>
    </header>
    <alc-hero-form
    (addHeroEvent)="addHero($event)" />
  `,
  styles: ``,
})
export default class NewPage {
  protected readonly router = inject(Router);
  readonly #heroService = inject(HeroesState);

  // Método en respuesta a un evento del formulario
  addHero(newHeroData: Hero) {
    if (!newHeroData) {
      this.router.navigate(['/super-heroes']);
      return;
    }
    console.log('Creating new hero:', newHeroData);
    this.#heroService.add(newHeroData);
    this.router.navigate(['/super-heroes']);
  }
}
