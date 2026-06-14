import { Component } from '@angular/core';
import { Card } from '../../core/components/card/card';
import { HeroItem } from './components/hero-item/hero-item';

@Component({
  selector: 'ind-heroes-page',
  imports: [Card, HeroItem],
  template: `
    <alc-card>
      <h2>Heroes</h2>
    </alc-card>
    <alc-hero-item />
  `,
  styles: `
    :host {
      display: block;
      padding: 1rem;
      width: 100%;
    }
  `,
})
export default class HeroesPage {}
