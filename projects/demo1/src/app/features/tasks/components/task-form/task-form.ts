import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';

@Component({
  selector: 'alc-task-form',
  imports: [FormField, JsonPipe],
  template: `<form>
      <div>
        <label for="title">Title</label>
        <input id="title" [formField]="form.title" />
      </div>
      <div>
        <label for="description">Description</label>
        <textarea id="description" [formField]="form.description"></textarea>
      </div>
      <div>
        <label for="dueDate">Due Date</label>
        <input id="dueDate" type="date" [formField]="form.dueDate" />
      </div>
    </form>

    <pre>
  {{ formState() | json }}

    </pre
    > `,
  styles: ``,
})
export class TaskForm {
  // Signal based forms

  // SIgnal representing the form state
  protected readonly formState = signal({
    title: '',
    description: '',
    dueDate: null,
  });

  // signal wrraped as a form

  protected readonly form = form(this.formState);
}
