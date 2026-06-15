import { Component } from '@angular/core';
import { Card } from '../../core/components/card/card';
import { SignalForm } from './components/signal-form/signal-form';


@Component({
  selector: 'alc-home-page',
  imports: [Card, SignalForm],
  template: `
    <h2>Home</h2>
    <alc-card id="home" cardTitle="Sample">
      <p>App works!</p>
    </alc-card>
    <alc-card id="home" cardTitle="Signal Form">
      <alc-signal-form />
    </alc-card>

  `,
  styles: ``,
})
export default class HomePage {}
