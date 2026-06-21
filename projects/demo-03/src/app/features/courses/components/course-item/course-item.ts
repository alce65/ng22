import { Component, signal } from '@angular/core';
import { Course } from '../../types/course';
import { COURSES } from '../../data/courses';

@Component({
  selector: 'alc-course-item',
  imports: [],
  template: `
    <header>
      <img [src]="course().image" [alt]="course().title" />
      <h3 class="course-title" [title]="'Curso ID: ' + course().id">{{ course().title }}</h3>
    </header>

    <section class="details">
      <p>{{ course().description }}</p>
      <p>Duración: {{ course().duration }}</p>
      <p>Nivel: {{ course().level }}</p>
    </section>

    <section class="stats">
      <div class="course-power-stats" aria-label="Utilidad">
        <span>Utilidad: {{ course().courseStats.utility }}</span>
        <div class="course-courseStats-buttons">
          <button
            [disabled]="course().courseStats.utility === STAT_MIN"
            (click)="changePowerStats('utility', -1)"
          >
            ➖
          </button>
          <button
            [disabled]="course().courseStats.utility === STAT_MAX"
            (click)="changePowerStats('utility')"
          >
            ➕
          </button>
          <button
            [disabled]="course().courseStats.utility === 0"
            (click)="changePowerStats('utility', 0)"
            [title]="'Reset ' + 'utilidad' + ' a 0'"
          >
            🔄️
          </button>
        </div>
      </div>
      <div class="course-power-stats" aria-label="Dificultad">
        <span>Dificultad: {{ course().courseStats.difficulty }}</span>
        <div class="course-courseStats-buttons">
          <button
            [disabled]="course().courseStats.difficulty === STAT_MIN"
            (click)="changePowerStats('difficulty', -1)"
          >
            ➖
          </button>
          <button
            [disabled]="course().courseStats.difficulty === STAT_MAX"
            (click)="changePowerStats('difficulty')"
          >
            ➕
          </button>
          <button
            [disabled]="course().courseStats.difficulty === 0"
            (click)="changePowerStats('difficulty', 0)"
            [title]="'Reset ' + 'difficulty' + ' a 0'"
          >
            🔄
          </button>
        </div>
      </div>
      <div class="course-power-stats" aria-label="Actualidad">
        <span>Actualidad: {{ course().courseStats.actualization }}</span>
        <div class="course-courseStats-buttons">
          <button
            [disabled]="course().courseStats.actualization === STAT_MIN"
            (click)="changePowerStats('actualization', -1)"
          >
            ➖
          </button>
          <button
            [disabled]="course().courseStats.actualization === STAT_MAX"
            (click)="changePowerStats('actualization')"
          >
            ➕
          </button>
          <button
            [disabled]="course().courseStats.actualization === 0"
            (click)="changePowerStats('actualization', 0)"
            [title]="'Reset ' + 'actualidad' + ' a 0'"
          >
            🔄
          </button>
        </div>
      </div>
      <div class="course-power-stats" aria-label="Rating">
        <span> Rating (Full): {{ course().courseStats.rating }}</span>
        <div class="course-courseStats-buttons">
          <button
            [disabled]="course().courseStats.rating === 0"
            (click)="changePowerStatsFull('rating', -1)"
          >
            ➖
          </button>
          <button
            [disabled]="course().courseStats.rating === STAT_MAX"
            (click)="changePowerStatsFull('rating')"
          >
            ➕
          </button>
          <button
            [disabled]="course().courseStats.rating === 0"
            (click)="changePowerStatsFull('rating', 0)"
            [title]="'Reset ' + 'rating' + ' a 0'"
          >
            🔄
          </button>
        </div>
      </div>
    </section>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      border-radius: 4px;
    }
    .details {
      text-align: center;
    }

    .course-title {
      font-weight: bolder;
      font-size: 1.4rem;
      margin-block: 0.5rem;
      text-align: center;
    }

    .course-power-stats {
      display: flex;
      gap: 1rem;
      justify-content: space-between;
      align-items: center;

      .course-courseStats-buttons {
        display: flex;
        gap: 0.5rem;
      }
    }

    /* clase de aplicación opcional */
    .course-advanced {
      background-color: var(--color-primary);
      color: var(--color-background);
    }
  `,
})
export class CourseItem {
  protected readonly course = signal<Course>({ ...COURSES[0] });
  protected readonly STAT_MIN = 0;
  protected readonly STAT_MAX = 10;

  protected changePowerStats(stat: keyof Course['courseStats'], delta: number = 1): void {
    const value = this.course().courseStats[stat];

    if (delta === 0) {
      this.course().courseStats[stat] = 0;
      return;
    }

    if ((delta === 1 && value < this.STAT_MAX) || (delta === -1 && value > this.STAT_MIN)) {
      this.course().courseStats[stat] += delta;
    }
  }

  protected changePowerStatsFull(stat: keyof Course['courseStats'], delta: number = 1): void {
    const value = this.course().courseStats[stat];
    const newValue = delta === 0 ? 0 : value + delta;

    if (
      delta === 0 ||
      (delta === 1 && value < this.STAT_MAX) ||
      (delta === -1 && value > this.STAT_MIN)
    ) {
      this.course.update((course) => {
        return {
          ...course,
          courseStats: {
            ...course.courseStats,
            [stat]: newValue,
          },
        };
      });
    }
  }
}
