import { Component, input, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuOption } from '../../types/menu-option';

@Component({
  selector: 'alc-menu',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav>
      <ul [class.vertical]="isVertical()">
        @for (option of options(); track option.path) {
          <li>
            <a [routerLink]="option.path" [routerLinkActive]="'active'">
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
        gap: 1.5rem;
      }

      a {
        color: inherit;
        text-decoration: none;
        font-weight: bold;
      }
    }

    .active {
      display: inline-block;
      color: var(--color-primary-hot);
      border-bottom: 2px solid var(--color-primary-hot);
      transform: scale(1.1);
      transition: all 0.3s ease-in-out;
    }
  `,
})
export class Menu {
  readonly isVertical = input(false);
  readonly options = input.required<MenuOption[]>();
}
