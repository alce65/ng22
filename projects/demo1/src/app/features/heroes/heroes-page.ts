import { Component } from '@angular/core';
import { Card } from '../../core/components/card/card';
import { HeroList } from "./components/hero-list/hero-list";

@Component({
  selector: 'ind-heroes-page',
  imports: [Card, HeroList],
  template: `
    <alc-card>
      <h2>Heroes</h2>
    </alc-card>
    <alc-hero-list />
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
