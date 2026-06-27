import { Component } from '@angular/core';

@Component({
  selector: 'alc-page-not-found',
  imports: [],
  template: `
    <h2>Página no encontrada</h2>
    <p>La página que buscas no existe</p>
    <p>Vuelve a la página de <a href="/">inicio</a></p>
    `,
  styles: ``,
})
export class PageNotFound {}
