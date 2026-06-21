import { Component, signal } from '@angular/core';

@Component({
  selector: 'alc-dashboard-page',
  imports: [],
  template: ` <h2>{{ pageTitle() }}</h2> `,
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
