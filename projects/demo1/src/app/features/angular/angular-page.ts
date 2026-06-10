import { Component, signal } from '@angular/core';
import { Pills } from './components/pills/pills';
import { Logo } from './components/logo/logo';
import { Separator } from './components/separator/separator';

@Component({
  selector: 'alc-angular-page',
  imports: [Logo, Separator, Pills],
  template: `
    <alc-logo />
    <h1>Hello, {{ title() }}</h1>
    <alc-separator2 />
    <alc-pills />

  `,
  styles: ``,
})
export class AngularPage {
  protected readonly title = signal('ng22');
}
