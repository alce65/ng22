import { Component, signal } from '@angular/core';
import { getMenuOptions } from '../../../app.routes';
import { MenuOption } from '../../../core';


const MENU_OPTIONS = getMenuOptions();

@Component({
  selector: 'alc-menu',
  imports: [],
  template: `
    <nav>
      <ul>
        @for (option of options(); track option.path) {
          <li>
            <a [href]="option.path">
              {{ option.label }}
            </a>
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

      a {
        color: inherit;
        text-decoration: none;
        font-weight: bold;
      }
    }
  `,
})
export class Menu {
  readonly options = signal<MenuOption[]>(MENU_OPTIONS);
}
