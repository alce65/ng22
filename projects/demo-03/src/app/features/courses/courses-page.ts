import { Component, signal } from '@angular/core';
import { CourseItem } from './components/course-item/course-item';
import { Card } from '../../core/components/card/card';

@Component({
  selector: 'alc-courses-page',
  imports: [CourseItem, Card],
  template: `
    <h2>{{ pageTitle() }}</h2>
    <alc-card>
      <alc-course-item />
    </alc-card>
  `,
  styleUrls: ['../pages.css'],
  styles: ``,
})
export default class CoursesPage {
  protected readonly pageTitle = signal('Courses');
}
