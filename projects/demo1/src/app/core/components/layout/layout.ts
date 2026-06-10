import { Component } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

@Component({
  selector: 'alc-layout',
  imports: [Header, Footer],
  template: `
    <alc-header>
      <ng-content select=".main-menu" />
    </alc-header>
    <main class="container">
      <ng-content />
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
    main {
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
export class Layout {}
