import { Component, signal } from '@angular/core';
import { Course } from '../../types/course';
import { COURSES } from '../../data/courses';

@Component({
  selector: 'alc-course-item',
  imports: [],
  template: `
    <img [src]="course().image" [alt]="course().title" />
    <h3 [title]="'Curso ID: ' + course().id">{{ course().title }}</h3>
  `,
  // templateUrl: './course-item.html',
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      margin: 1rem;
      padding: 1rem;
      border: 1px solid var(--color-primary);
      border-radius: 4px;
    }
  `,
  // styleUrls: ['./course-item.css'],
})
export class CourseItem {
  protected readonly course = signal<Course>(COURSES[0]);
  protected readonly STAT_MIN = 0;
  protected readonly STAT_MAX = 10;

  protected changePowerStats(stat: keyof Course['courseStats'], delta: number = 1): void {
    const value = this.course().courseStats[stat];

    if (
      (delta === 1 && value < this.STAT_MAX) ||
      (delta === -1 && value > this.STAT_MIN) ||
      (delta === 0 && value !== this.STAT_MIN)
    ) {
      this.course().courseStats[stat] += delta;
    }
  }
}
