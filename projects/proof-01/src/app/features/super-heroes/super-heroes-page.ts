import { Component } from '@angular/core';
import { Card } from '../../core/components/card/card';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'ind-super-heroes-page',
  imports: [Card, RouterOutlet],
  template: `
    <section>
      <header>
        <alc-card>
          <h2>Super Heroes</h2>
          <div class="add-hero-anchor"></div>
        </alc-card>
      </header>
      <router-outlet />
      <!-- <alc-hero-list /> -->
      <!-- <alc-hero-form />  -->
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
        anchor-name:--add-hero-anchor;
      }
    }
  `,
})
export default class SuperHeroesPage {}
