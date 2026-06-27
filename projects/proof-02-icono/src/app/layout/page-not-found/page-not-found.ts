import { Component } from '@angular/core';
import { Card } from '../../core';

@Component({
  selector: 'alc-page-not-found',
  imports: [Card],
  template: `
    <alc-card>
      <h2>Página no encontrada</h2>
      <p>La página que buscas no existe</p>
      <p>Vuelve a la página de <a href="/">inicio</a></p>
    </alc-card>
  `,
  styles: ``,
})
export class PageNotFound {}
