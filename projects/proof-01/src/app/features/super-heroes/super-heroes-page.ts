import { Component } from '@angular/core';
import { Card } from '../../core/components/card/card';
import { HeroList } from './components/hero-list/hero-list';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ind-super-heroes-page',
  imports: [Card, HeroList, RouterLink],
  template: `
    <section>
      <header>
        <alc-card>
          <h2>Super Heroes</h2>
          <div class="add-hero-button">
            <button [routerLink]="['add']">Add Super Hero</button>
          </div>
        </alc-card>
      </header>
      <alc-hero-list />
    </section>
  `,
  styles: `
    :host {
      display: block;
      padding: 1rem;
      width: 100%;
    }

    alc-card {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 1rem;
      gap: 1rem;

      h2 {
        flex: 1 1 auto;
      }

      .add-hero-anchor {
        flex: 0 0 150px;
        anchor-name: --add-hero-anchor;
      }
    }
  `,
})
export default class SuperHeroesPage {


  // Alternativamente, como se hace en el ejemplo original:
  // protected readonly heroes = signal<Hero[]>([]);
  // readonly #heroService = inject(HeroesState);
  // constructor() {
  //   this.heroes.set(this.#heroService.findAll());
  // }

  // Y en el template
  // <alc-hero-list [heroes] = "heroes()" />

 }
