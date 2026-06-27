import { Component } from '@angular/core';

@Component({
  selector: 'alc-logo-coders',
  imports: [],
  templateUrl: './logo-coders.svg',
  styles: `
    :host {
      display: block;
    }

    path:nth-of-type(1):hover {
      fill: var(--color-primary-hot);
      transform: scale(1.1);
      transition: transform 0.3s ease-in-out;
    }

    path:nth-of-type(2):hover {
      fill: var(--color-tertiary-hot);
      transform: translate(-900px, -900px) scale(1.1);
      transition: transform 0.3s ease-in-out;
    }
  `,
})
export class LogoCoders {
  size = '5.5rem';
  upperColor = 'var(--color-primary)';
  downColor = 'var(--color-secondary)';

  handleClick(source: string) {
    console.log('LogoCoders clicked from:', source);
  }
}
