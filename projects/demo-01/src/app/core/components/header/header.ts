import { Component, signal } from '@angular/core';
import { MenuMobile } from '../menu-mobile/menu-mobile';
import { Separator } from '../separator/separator';
import { LogoNg } from '../logo-angular/logo-ng';
import { LogoCoders } from '../logo-coders/logo-coders';

@Component({
  selector: 'alc-header',
  imports: [MenuMobile, Separator, LogoNg, LogoCoders],
  template: `
    <!-- @let menu = menuTemplate(); -->
    <header class="container">
      <div class="left-side">
        <alc-logo-coders />
      </div>
      <hgroup>
        <alc-logo-ng />
        <h1>{{ title() }}</h1>
      </hgroup>
      <div class="right-side">
        <alc-menu-mobile />
        <!-- <div class="icons">
          <alc-user />
          <alc-menu-mobile (openEvent)="toggleModal(true)" />
        </div> -->
        <!-- <alc-toggle /> -->
      </div>
      <div class="bottom-row">
        <p>{{ subtitle() }}</p>
        <div class="desktop-only">
          <ng-content></ng-content>
        </div>
      </div>
    </header>
    <alc-separator />
  `,
  styles: [
    `
      :host {
        margin-bottom: 1.5rem;
        min-height: 15vh;
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
        max-width: 15rem;
        h1 {
          color: var(--color-primary);
          font-family: var(--font-family-heading);
          font-size: 3.125rem;
          font-weight: 500;
          line-height: 100%;
          letter-spacing: -0.125rem;
          margin: 0;
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

        .desktop-only {
          display: none;
        }
      }
    `,
    `
      /*
        @media screen and (min-width: 900px) {
        */
      @media (width > 800px) {
        hgroup {
          max-width: none;
        }

        alc-menu-mobile {
          display: none;
        }
        .bottom-row {
          .desktop-only {
            display: block;
            margin-top: 1rem;
          }
        }
      }
    `,
  ],
})
export class Header {
  protected readonly title = signal('Curso de Angular 22');
  protected readonly subtitle = signal('Aprende a desarrollar aplicaciones con Angular');

  // protected readonly isModalOpen = signal(false);
  // readonly menuTemplate = input<TemplateRef<MenuTemplateContext>>();
  // protected readonly desktopMenuContext: MenuTemplateContext = { isVertical: false };
  // protected readonly mobileMenuContext: MenuTemplateContext = { isVertical: true };

  // toggleModal(isOpen: boolean) {
  //   console.log('Toggling modal:', isOpen);
  //   this.isModalOpen.set(isOpen);
  // }
}
