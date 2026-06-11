import { Component } from '@angular/core';
import { Card } from '../../core/components/card/card';
import { TaskForm } from './components/task-form/task-form';

@Component({
  selector: 'ind-tasks-page',
  imports: [TaskForm, Card],
  template: `
    <h2>Tasks Page</h2>
    <alc-card>
      <alc-task-form />
    </alc-card>
  `,
  styles: `
    :host {
      display: block;
      padding: 1rem;
      width: 100%;
    }
  `,
})
export default class TasksPage {}
