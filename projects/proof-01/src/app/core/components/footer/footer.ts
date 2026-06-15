import { Component, signal } from '@angular/core';
import { Socials } from '../socials/socials';

@Component({
  selector: 'alc-footer',
  imports: [Socials],
  template: `
    <footer>
      <address>
        <p>{{ autor() }}</p>
        <p>{{ brand() }} © {{ today().getFullYear() }}</p>
      </address>
      <alc-socials />
    </footer>
  `,
  styles: `
    :host {
      background-color: var(--color-background-primary);
      color: var(--color-primary-hot);
      display: flex;
      justify-content: center;
      align-items: center;
      border-top: 2px solid var(--color-primary);
      margin-top: 1rem;
      padding-block-start: 1rem;
      min-height: 10vh;
    }
    footer {
      text-align: center;
    }
    address {
      font-style: normal;
    }
  `,
})
export class Footer {
  protected readonly autor = signal('Alejandro Cerezo');
  protected readonly brand = signal('ICONO Training for Indra');
  protected readonly today = signal(new Date());
}
