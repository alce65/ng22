import { Component, signal } from '@angular/core';
import { Course } from '../../types/course';
import { COURSES } from '../../data/courses';

@Component({
  selector: 'alc-course-item-signals',
  imports: [],
  template: `
    <img [src]="course().image" [alt]="course().title" />
    <h3 [title]="'Curso ID: ' + course().id">{{ course().title }}</h3>
    <p>{{ plainMessage}}</p>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      border-radius: 4px;
    }
  `,
})
export class CourseItemSignals {
  protected readonly course = signal<Course>({...COURSES[0]});
  protected  plainMessage = 'Bienvenido al curso';

  constructor() {
    setTimeout(() => {
      this.plainMessage = 'Bienvenido al curso de ¡¡Angular Moderno!!';
      console.log('Mensaje actualizado después de 2 segundos', this.plainMessage);
    }, 2000);

    setTimeout(() => {
      this.course().title = 'Curso de Angular Moderno Actualizado';
      console.log('Título actualizado después de 3 segundos', this.course().title);
    }, 3000);

    setTimeout(() => {
      this.course.update((currentCourse) => ({
        ...currentCourse,
        title: 'Curso de Angular Moderno Actualizado con Signals',
      }));
      console.log('Título actualizado con signals después de 4 segundos', this.course().title);

    }, 4000);
  }

}
