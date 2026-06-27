import { Component, signal } from '@angular/core';
import { Menu } from '../../core';


@Component({
  selector: 'alc-header',
  imports: [Menu],
  template: `
    <header class="container">
      <div class="left-side"></div>
      <hgroup>
        <h1>{{ title() }}</h1>
        <p>{{ subtitle() }}</p>
      </hgroup>
      <div class="right-side"></div>
      <div class="bottom-row">
        <div class="sub-title">
        </div>
        <div class="desktop-only">
          <!-- <ng-content></ng-content> -->
           <alc-menu />
        </div>
      </div>
    </header>
  `,
  styles: `
    :host {
      min-height: 12vh;
      color: var(--color-primary-hot);
      background-color: var(--color-background-primary);
    }

    header {
      padding: 1rem 2rem;
      display: grid;
      grid-template-columns: minmax(auto, max-content) 1fr minmax(auto, max-content);
      justify-items: center;
      align-items: center;
      text-align: center;
    }

    .left-side {
      min-width: 5rem;
    }

    hgroup {
      /* max-width: 15rem; */
      max-width: none;
      h1 {
        color: var(--color-primary);
        font-family: var(--font-family-heading);
        font-size: 3.125rem;
        font-weight: 500;
        line-height: 100%;
        letter-spacing: -0.125rem;
        margin: 0;
      }

      p {
        position: absolute;
        position-anchor: --bottom-row;
        position-area: center center;
      }
    }

    .right-side {
      min-width: 5rem;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.5rem;

      .icons {
        display: flex;
        gap: 1rem;
      }
    }

    .bottom-row {
      grid-column: span 3;
      margin-top: 0.6rem;
      width: 100%;

      .sub-title {
        height: 1.125rem;
        anchor-name: --bottom-row;
      }

      .desktop-only {
        /* display: none; */
        display: block;
        padding-block: 1rem;
      }
    }
  `,
})
export class Header {
  protected readonly title = signal('Curso de Angular 22');
  protected readonly subtitle = signal('Aprende a desarrollar aplicaciones con Angular');
}
