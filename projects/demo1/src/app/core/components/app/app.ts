import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Layout } from '../layout/layout';
import { Menu } from '../menu/menu';

@Component({
  selector: 'alc-root',
  imports: [RouterOutlet, Layout, Menu],
  template: `
    <alc-layout>
      <ng-template #mainMenu let-isVertical="isVertical">
        <alc-menu class="main-menu" [isVertical]="isVertical" />
      </ng-template>
      <router-outlet />
    </alc-layout>
  `,
  styles: ``,
})
export class App {
  //protected readonly title = signal('demo1');
}
