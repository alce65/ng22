import { Component, signal } from '@angular/core';
import { CourseItemSignals } from './components/course-item-signals/course-item-signals';
import { CourseItem } from './components/course-item/course-item';
import { Card } from '../../core/components/card/card';

@Component({
  selector: 'alc-courses-page',
  imports: [CourseItem, CourseItemSignals, Card],
  template: `
    <h2>{{ pageTitle() }}</h2>
    <alc-card>
      <alc-course-item />
    </alc-card>
    <details>
      <summary>Sample of signals in async operations</summary>
      <alc-card>
        <alc-course-item-signals />
      </alc-card>
    </details>
  `,
  styleUrls: ['../pages.css'],
  styles: ``,
})
export default class CoursesPage {
  protected readonly pageTitle = signal('Courses');
}
