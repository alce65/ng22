import { Component, signal } from '@angular/core';
import { HeroItem } from '../hero-item/hero-item';
import { HEROES } from '../../data/heros';
import { Hero } from '../../types/hero';

@Component({
  selector: 'alc-hero-list',
  imports: [HeroItem],
  template: `
    <ul>
      @for (hero of heroes(); track hero.id) {
        <li>
          <alc-hero-item [hero]="hero"></alc-hero-item>
        </li>
      }
    </ul>
  `,
  styles: `
    ul {
      list-style: none;
      padding: 0;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 250px));
      gap: 1rem;
    }
  `,
})
export class HeroList {
  protected readonly heroes = signal<Hero[]>(HEROES);
}
