import { Component, signal } from '@angular/core';

@Component({
  selector: 'alc-courses-page',
  imports: [],
  template: ` <h2>{{ pageTitle() }}</h2> `,
  styleUrls: ['../pages.css'],
  styles: ``,
})
export default class CoursesPage {
  protected readonly pageTitle = signal('Courses');
}
