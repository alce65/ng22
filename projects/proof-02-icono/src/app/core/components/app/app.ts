import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer, Header } from '../../../layout';

@Component({
  selector: 'alc-root',
  imports: [RouterOutlet, Header, Footer],
  template: `
    <alc-header />
    <div class="container-fluid">
      <main class="p-2">
        <router-outlet />
      </main>
    </div>
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
    .wide {
      align-self: stretch;
      margin-inline: 5rem;
    }
    `,
})
export class App {
  protected readonly title = signal('proof-02-icono');
}
