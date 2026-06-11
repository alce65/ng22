import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { form, FormField, minLength, required, validate } from '@angular/forms/signals';

type TaskFormState = {
  title: string;
  description: string;
  dueDate: Date | null;
};

@Component({
  selector: 'alc-task-form',
  imports: [FormField, JsonPipe],
  template: `<form>
      <label for="title" class="form-control">
        Title
        <input id="title" [formField]="form.title" />
      </label>

      @if (form.title().touched() && form.title().invalid()) {
        @if (form.title().errors()[0]) {
          <span class="error">{{ form.title().errors()[0].message }}</span>
        } @else if (form.title().errors()[1]) {
          <span class="error">{{ form.title().errors()[1].message }}</span>
        }
      }

      <label for="description" class="form-control">
        Description
        <textarea id="description" [formField]="form.description"></textarea>
      </label>

      <label for="dueDate" class="form-control"
        >Due Date
        <input id="dueDate" type="date" [formField]="form.dueDate" />
      </label>

      @if (form.dueDate().touched() && form.dueDate().invalid()) {
        @if (form.dueDate().errors()[0]) {
          <span class="error">{{ form.dueDate().errors()[0].message }}</span>
        } @else if (form.dueDate().errors()[1]) {
          <span class="error">{{ form.dueDate().errors()[1].message }}</span>
        }
      }

      <div class="form-control">
        <button type="submit" [disabled]="form().invalid()">Submit</button>
      </div>
    </form>

    <pre>
  {{ formState() | json }}

    </pre
    > `,
  styles: `
    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      max-width: 400px;

      .form-control {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
    }

    input,
    textarea {
      padding: 0.5rem;
      font-size: 1rem;
      color: var(--color-primary-hot);
      background-color: var(--color-background-primary);
      border: none;
      border-block-end: 2px solid var(--color-primary);
      border-radius: 4px;

      &:focus-visible {
        outline: var(--color-primary) auto 1px;
        background-color: var(--color-background);
      }
    }
  `,
})
export class TaskForm {
  // Signal based forms

  // SIgnal representing the form state
  protected readonly formState = signal<TaskFormState>({
    title: '',
    description: '',
    dueDate: null,
  });

  // signal wrraped as a form

  protected readonly form = form(this.formState, (path) => {
    required(path.title, { message: 'Title is required' });
    minLength(path.title, 5, { message: 'Title must be at least 5 characters long' });
    required(path.description, { message: 'Description is required' });
    required(path.dueDate, { message: 'Due date is required' });
    validate(path.dueDate, (childField) => {
      const today = new Date();
      const dueDateValue = childField.value();

      const error = {
        kind: 'dueDateInFuture',
        message: 'Due date must be in the future',
      };

      if (dueDateValue) {
        const dueDate = new Date(dueDateValue);
        return dueDate > today ? null : error;
      }
      return null; // If due date is not provided, we let the required validator handle it
    });
  });
}
