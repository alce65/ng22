import { Component, signal } from '@angular/core';

@Component({
  selector: 'alc-home-page',
  imports: [],
  template: `
    <h2>{{ pageTitle() }}</h2>
  `,
  styles: ``,
})
export default class HomePage {
  protected readonly pageTitle = signal('Home');
}
