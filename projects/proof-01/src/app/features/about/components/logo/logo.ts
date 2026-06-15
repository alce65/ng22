import { Component } from '@angular/core';

@Component({
  selector: 'alc-logo',
  imports: [],
  templateUrl: './logo.svg',
  styles: `
    :host {
      display: block;
      max-width: 9.2rem;
    }
  `,
})
export class Logo {}
