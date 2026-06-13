import { Component, signal } from '@angular/core';
import { Pills } from './components/pills/pills';
import { SeparatorRwd } from './components/separator-rwd/separator-rwd';
import { LogoNg } from '../../core/components/logo-angular/logo-ng';

@Component({
  selector: 'alc-about-page',
  imports: [LogoNg, SeparatorRwd, Pills],
  template: `
    <div>
      <alc-logo-ng />
      <h2>{{ pageTitle() }}</h2>
    </div>
    <alc-separator-rwd />
    <alc-pills />
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
    }
    @media (width > 800px) {
      :host {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 3rem;
      }
    }
  `,
})
export default class AboutPage {
  protected readonly pageTitle = signal('About ng22');
}
