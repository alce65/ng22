import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AngularPage } from '../../../features/angular/angular-page';

@Component({
  selector: 'alc-root',
  imports: [RouterOutlet, AngularPage],
  template: `
    <router-outlet />
    <alc-angular-page />
  `,
  styles: ``,
})
export class App {
  //protected readonly title = signal('demo1');
}
