import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { LogoCoders } from '../logo-coders/logo-coders';
import { Menu } from '../menu/menu';
import { MenuOption } from '../../types/menu.option';
import { getRoutes } from '../../../app.routes';

@Component({
  selector: 'alc-root',
  imports: [
    RouterOutlet,
    Header,
    Footer,
    LogoCoders,
    Menu,
  ],
  template: `
    <alc-header [title]="title()" [subtitle]="subtitle()">
      <alc-logo-coders slot="logo" />
      <alc-menu slot="menu" [options]="menuOptions()" />
      <alc-menu slot="menu-vertical" [isVertical]="true" [options]="menuOptions()" />
    </alc-header>
    <main class="container">
      <router-outlet />
    </main>
    <alc-footer />
  `,
  styles: `
    :host {
      display: grid;
      grid-template-rows: auto 1fr auto;
      min-height: 100vh;
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
    }
    main.container {
      padding: 1rem 2rem;
      width: 100%;
      min-height: 90%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 1rem;
      position: relative;
    }
    @media (width > 600px) {
      .wide {
        align-self: stretch;
        margin-inline: 5rem;
      }
    }
  `,
})
export class App {
  protected readonly title = signal('Curso de Angular 22');
  protected readonly subtitle = signal('Aprende a desarrollar aplicaciones con Angular');
  protected readonly menuOptions = signal<MenuOption[]>(getRoutes());
}
