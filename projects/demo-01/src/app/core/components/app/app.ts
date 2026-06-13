import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { Menu } from '../menu/menu';
import { Card } from '../card/card';
import HomePage from '../../../features/home/home-page';
import DashboardPage from '../../../features/dashboard/dashboard-page';
import AboutPage from '../../../features/about/about-page';
import { MenuOption } from '../../types/menu.option';
import { MENU_OPTIONS } from '../../../app.routes';

@Component({
  selector: 'alc-root',
  imports: [RouterOutlet, Header, Footer, Menu, Card, HomePage, DashboardPage, AboutPage],
  template: `
    <alc-header [title]="title()" [subtitle]="subtitle()">
      <alc-menu [options]="menuOptions()" />
    </alc-header>
    <main class="container">
      <router-outlet />
      <alc-card>
        <alc-home-page id="home" />
      </alc-card>
      <alc-card class="wide">
        <alc-dashboard-page id="dashboard" />
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
