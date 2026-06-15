import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Layout } from '../layout/layout';
import { Menu } from '../menu/menu';
import { Time, TimeOld } from '../../services/time';

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
  //protected readonly title = signal('proof-01');
  private readonly timeOld = inject(TimeOld);
  private readonly time = inject(Time);

  constructor() {
    console.log('TimeOld:', this.timeOld.getTime());
    console.log('Time:', this.time.getTime());
  }
}
