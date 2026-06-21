import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { Card } from '../card/card';
import { LogoCoders } from '../logo-coders/logo-coders';
import { Menu } from '../menu/menu';
import HomePage from '../../../features/home/home-page';
import AboutPage from '../../../features/about/about-page';
import CoursesPage from '../../../features/courses/courses-page';
import DashboardPage from '../../../features/dashboard/dashboard-page';
import { MenuOption } from '../../types/menu.option';
import { MENU_OPTIONS } from '../../../app.routes';

@Component({
  selector: 'alc-root',
  imports: [
    RouterOutlet,
    Header,
    Footer,
    Card,
    LogoCoders,
    Menu,
    HomePage,
    DashboardPage,
    CoursesPage,
    AboutPage,
  ],
  template: `
    <alc-header [title]="title()" [subtitle]="subtitle()">
      <alc-logo-coders slot="logo" />
      <alc-menu slot="menu" [options]="menuOptions()" />
      <alc-menu slot="menu-vertical" [isVertical]="true" [options]="menuOptions()" />
    </alc-header>
    <main class="container">
      <router-outlet />
      <alc-card>
        <p>Páginas de la aplicación</p>
      </alc-card>
      <alc-card>
        <alc-home-page id="home" />
      </alc-card>
      <alc-card class="wide">
        <alc-dashboard-page id="dashboard" />
      </alc-card>
      <alc-card>
        <alc-courses-page id="courses" />
      </alc-card>
      <alc-card class="wide">
        <alc-about-page id="about" />
      </alc-card>
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
  protected readonly menuOptions = signal<MenuOption[]>(MENU_OPTIONS);
}
