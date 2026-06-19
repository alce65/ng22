import { Component, inject, signal } from '@angular/core';
import { Card } from '../../../core/components/card/card';
import { HeroForm } from '../components/hero-form/hero-form';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroesState } from '../services/heroes-state';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'alc-edit-page',
  imports: [Card, HeroForm, JsonPipe],
  template: `
    <header>
      <alc-card>
        <h2>Editar un Super Héroe</h2>
      </alc-card>
    </header>
    <alc-hero-form (addHeroEvent)="updateHero($event)" />
      <pre>{{ hero() | json }}</pre>
  `,
  styles: ``,
})
export default class EditPage {
  readonly router = inject(Router);
  protected activateRoute = inject(ActivatedRoute);
  protected hero = signal(this.activateRoute.snapshot.data['superHero']);

  readonly #heroService = inject(HeroesState);

  updateHero(hero: any): void {
    console.log('Updating hero:', hero);
    // Aquí puedes agregar la lógica para actualizar el héroe en tu servicio o estado global
    // Por ejemplo, podrías llamar a un método de un servicio que maneje la actualización del héroe
    // this.heroService.updateHero(hero).subscribe(updatedHero => {
    //   console.log('Hero updated successfully:', updatedHero);
    // });

    // this.#heroService.updateHero(hero);
    this.router.navigate(['/super-heroes']);
  }
}
