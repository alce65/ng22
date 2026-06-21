import { Component, signal } from '@angular/core';
import { CountersList } from './components/counters-list/counters-list';

@Component({
  selector: 'alc-dashboard-page',
  imports: [CountersList],
  template: `
    <h2>{{ pageTitle() }}</h2>
    <alc-counters-list />
  `,
  styleUrls: ['../pages.css'],
  styles: `
    :host {
      display: block;
      width: 100%;
      padding: 1rem;
    }
  `,
})
export default class DashboardPage {
  protected readonly pageTitle = signal('Dashboard');
}
