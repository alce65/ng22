import { Component, input, signal } from '@angular/core';
import { MenuOption } from '../../types/menu.option';

@Component({
  selector: 'alc-menu',
  template: `
    <nav>
      <ul [class.vertical]="isVertical()">
        @for (option of options(); track option.path) {
          <li>
            <a [href]="option.path">{{ option.label }}</a>
          </li>
        }
      </ul>
    </nav>
  `,
  styles: `
    nav {
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        gap: 1rem;
      }

      .vertical {
        flex-direction: column;
      }

      a {
        color: inherit;
        text-decoration: none;
        font-weight: bold;
      }
    }
  `,
})
export class Menu {

  readonly isVertical = input(false);
  protected readonly options = signal<MenuOption[]>([
    { path: 'home', label: 'Home' },
    { path: 'about', label: 'Acerca de' },
  ]);
}
