import { Component, input, signal } from '@angular/core';
import { MenuMobile } from '../menu-mobile/menu-mobile';
import { Separator } from '../separator/separator';
import { LogoNg } from '../logo-angular/logo-ng';
import { User } from '../user/user';
import { Toggle } from '../toggle/toggle';
import { Search } from '../search/search';
import { Modal } from '../modal/modal';

@Component({
  selector: 'alc-header',
  imports: [MenuMobile, Separator, LogoNg, User, Toggle, Search, Modal],
  template: `
    <header class="container">
      <div class="left-side">
        <!-- Slot: Logo Global -->
        <ng-content select="[slot=logo]" />
      </div>
      <hgroup>
        <alc-logo-ng />
        <h1>{{ title() }}</h1>
      </hgroup>
      <div class="right-side">
        <div class="icons">
          <alc-menu-mobile (openEvent)="toggleModal(true)" />
          <alc-user />
        </div>
        <alc-toggle />
      </div>
      <div class="bottom-row">
        <p>{{ subtitle() }}</p>
        <alc-search class="mobile-only" />
        <div class="desktop-only">
          <ng-content></ng-content>
          <alc-search />
        </div>
      </div>
    </header>
    <alc-separator />
    <alc-modal [isOpen]="isModalOpen()" (closeEvent)="toggleModal(false)">
      <ng-content select="[isVertical]"></ng-content>
    </alc-modal>
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
          font-optical-sizing: auto;
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
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

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

        alc-menu-mobile,
        .mobile-only {
          display: none;
        }
        .bottom-row {
          width: 100%;
          display: block;
          .desktop-only {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 1rem;
            margin-top: 1rem;
          }
        }
      }
    `,
  ],
})
export class Header {
  readonly title = input.required<string>();
  readonly subtitle = input.required<string>();

  protected readonly isModalOpen = signal(false);
  // readonly menuTemplate = input<TemplateRef<MenuTemplateContext>>();
  // protected readonly desktopMenuContext: MenuTemplateContext = { isVertical: false };
  // protected readonly mobileMenuContext: MenuTemplateContext = { isVertical: true };

  toggleModal(isOpen: boolean) {
    console.log('Toggling modal:', isOpen);
    this.isModalOpen.set(isOpen);
  }
}
