import { Component } from '@angular/core';
import { Card } from '../../core/components/card/card';


@Component({
  selector: 'alc-home-page',
  imports: [Card],
  template: `
    <h2>Home</h2>
    <alc-card id="home" cardTitle="Sample">
      <p>App works!</p>
    </alc-card>

  `,
  styles: ``,
})
export default class HomePage {}
