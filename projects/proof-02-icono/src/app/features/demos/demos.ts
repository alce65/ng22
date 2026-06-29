import { Component } from '@angular/core';
import { Card } from '../../core';
import { LoggerDemo } from './components/logger-demo/logger-demo';

@Component({
  selector: 'alc-demos',
  imports: [Card, LoggerDemo],
  template: `
    <h2>Demos</h2>
    <alc-card>
      <alc-logger-demo />
    </alc-card>
  `,
  styles: ``,
})
export class Demos {}
