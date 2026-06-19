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
    <alc-hero-form (addHeroEvent)="addHero($event)" />
  `,
  styles: ``,
})
export default class NewPage {
  readonly router = inject(Router);
  readonly #heroService = inject(HeroesState);

  // Método en respuesta a un evento del formulario
  addHero(newHeroData: Omit<Hero, 'id'> | null) {
    if (!newHeroData) {
      this.router.navigate(['/super-heroes']);
      return;
    }

    const hero: Hero = {
      // Generate a random four-digit ID for the new hero
      id: Math.floor(1000 + Math.random() * 999),
      ...newHeroData,
      powerStats: {
        ...newHeroData.powerStats,
      },
    };

    console.log('NewPage addHero', hero);
    this.#heroService.add(hero);

    this.router.navigate(['/super-heroes']);
  }
}
