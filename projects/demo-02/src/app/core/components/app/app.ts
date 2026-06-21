import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CourseItem } from '../../../features/courses/components/course-item/course-item';
import { CourseItemSignals } from '../../../features/courses/components/course-item-signals/course-item-signals';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { Card } from '../card/card';

@Component({
  selector: 'alc-root',
  imports: [RouterOutlet, CourseItem, Header, Footer, CourseItemSignals, Card],
  template: `
    <alc-header />

    <main class="container">
      <router-outlet />
      <alc-card>
        <p>Páginas de la aplicación</p>
      </alc-card>
      <alc-card>
        <alc-course-item />
      </alc-card>
      <details>
        <summary>Sample of signals in async operations</summary>
        <alc-card>
          <alc-course-item-signals />
        </alc-card>
      </details>
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
export class App {}
