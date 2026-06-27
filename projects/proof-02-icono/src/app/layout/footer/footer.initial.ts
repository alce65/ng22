import { Component, signal } from '@angular/core';

@Component({
  selector: 'alc-footer',
  imports: [],
  template: `
    <footer>
      <address>
        <p>{{ autor() }}</p>
        <p>{{ brand() }} © {{ today().getFullYear() }}</p>
      </address>
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
