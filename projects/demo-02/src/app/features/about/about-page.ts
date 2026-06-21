import { Component, signal } from '@angular/core';

@Component({
  selector: 'alc-about-page',
  imports: [],
  template: `
    <div>
      <h2>{{ pageTitle() }}</h2>
    </div>
  `,
  styleUrls: ['../pages.css'],
  styles: ``,
})
export default class AboutPage {
  protected readonly pageTitle = signal('About ng22');
}
