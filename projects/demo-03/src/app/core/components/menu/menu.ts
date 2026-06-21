import { Component, input, signal } from '@angular/core';
import { MenuOption } from '../../types/menu.option';

@Component({
  selector: 'alc-menu',
  imports: [],
  template: `
    <nav>
      <ul [class.vertical]="isVertical()">
        @for (option of options(); track option.path) {
          <li>
            <a href="{{ option.path }}">
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

      .vertical {
        flex-direction: column;
        a {
          font-size: 1.8rem;
        }
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
  readonly options = input.required<MenuOption[]>();
  readonly isVertical = input(false);

}
