import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { Menu } from '../menu/menu';
import { Card } from '../card/card';

@Component({
  selector: 'alc-root',
  imports: [RouterOutlet, Header, Footer, Menu, Card],
  template: `
    <alc-header>
      <alc-menu />
    </alc-header>
    <main class="container">
      <router-outlet />
      <alc-card>
        <p>Páginas de la aplicación</p>
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
      justify-content: center;
      align-items: center;
      padding: 1rem;
      position: relative;
    }
  `,
})
export class App {
  //protected readonly title = signal('demo1');
}
