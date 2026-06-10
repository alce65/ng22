import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Layout } from '../layout/layout';
import { Menu } from '../menu/menu';
import { TaskForm } from '../../../features/tasks/components/task-form/task-form';

@Component({
  selector: 'alc-root',
  imports: [RouterOutlet, Layout, Menu, TaskForm],
  template: `
    <alc-layout>
      <alc-menu class="main-menu" />
      <!-- <alc-menu class="main-menu v" [isVertical]="true" /> -->

      <router-outlet />
      <!-- Páginas
      <alc-angular-page />
       -->
      <alc-task-form />
    </alc-layout>
  `,
  styles: ``,
})
export class App {
  //protected readonly title = signal('demo1');
}
