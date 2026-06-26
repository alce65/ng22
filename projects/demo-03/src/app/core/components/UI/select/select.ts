import { Component, input, output } from '@angular/core';
import { FieldState } from '@angular/forms/signals';

@Component({
  selector: 'alc-select',
  imports: [],
  template: `
    <label for="select" class="form-control" >
      <select
        id="select"
        (blur)="fieldState().markAsTouched()"
        [value]="fieldState().value().value"
        (change)="onSelectChange($event.target)"
        [class.is-valid]="fieldState().valid()"
      >
        <option [value]=""></option>
        @for (option of options(); track $index) {
          <option [value]="option.value">{{ option.message }}</option>
        }
      </select>
      <span>{{ label() }}</span>
    </label>
    @if (fieldState().invalid() && fieldState().touched()) {
      <p class="error">
        {{ fieldState().errorSummary()?.[0]?.message }}
      </p>
    }
  `,
  styles: `
    .form-control {
      padding-block-start: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    select {
      padding: 0.5rem;
      font-size: 1rem;
      color: var(--color-primary-hot);
      background-color: var(--color-background-primary);
      border: none;
      border-block-end: 2px solid var(--color-primary);
      border-radius: 4px;

      -webkit-appearance: none;
      -ms-appearance: none;
      -moz-appearance: none;
      appearance: none;

      &:focus-visible {
        outline: var(--color-primary) auto 1px;
        background-color: var(--color-background);
      }
    }

    span {
      font-size: 0.8rem;
      color: var(--color-primary);
      margin-bottom: 0.2rem;
      position: relative;
      top: -2rem;
    }

    select:focus-visible + span,
    select.is-valid + span {
      color: var(--color-primary-hot);
      top: -4rem;
    }

    .error {
      color: var(--color-tertiary);
      font-size: 0.8rem;
    }
  `,
})
export class Select<T extends { value: string; message: string }> {
  readonly label = input.required<string>();
  readonly options = input.required<T[]>();
  readonly fieldState = input.required<FieldState<T>>();

  protected onSelectChange(target: EventTarget | null) {
    const index = (target as HTMLSelectElement).selectedIndex;
    this.fieldState().value.set(this.options()[index - 1] || { value: '', message: '' });
  }
}
