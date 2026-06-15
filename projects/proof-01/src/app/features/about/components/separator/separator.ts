import { Component } from '@angular/core';

@Component({
  selector: 'alc-separator2',
  imports: [],
  template: ` <div role="separator" aria-label="Divider" class="divider"></div> `,
  styles: `
    .divider {
      width: 100%;
      height: 1px;
      background: var(--red-to-pink-to-purple-horizontal-gradient);
      margin-block: 1rem;
    }
  `,
})
export class Separator {}
