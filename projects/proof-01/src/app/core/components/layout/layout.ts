import { Component, TemplateRef, contentChild } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

type MenuTemplateContext = {
  isVertical: boolean;
};

@Component({
  selector: 'alc-layout',
  imports: [Header, Footer],
  template: `
    <alc-header [menuTemplate]="mainMenu()" />
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
export class Layout {
  protected readonly mainMenu =
  contentChild<TemplateRef<MenuTemplateContext>>('mainMenu');
}
