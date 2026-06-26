import { TitleCasePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'alc-radio-buttons',
  imports: [TitleCasePipe],
  template: `
    <fieldset>
      <legend>{{ legend() }}</legend>
      @for (item of options(); track $index) {
        <label [for]="'gender-' + item.value" class="form-control checkbox">
          <input
            type="radio"
            [id]="'gender-' + item.value"
            [checked]="selected().value === item.value"
            (change)="selectedChange.emit(item)"
            [value]="item.value"
          />
          <span>{{ item.message | titlecase }}</span>
        </label>
      }
    </fieldset>
  `,
  styles: `
    fieldset {
      border: 1px solid #ccc;
      padding: 1rem;
      margin-bottom: 1rem;
      border-radius: 0.5rem;
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      justify-content: space-around;
    }

    legend {
      font-weight: bold;
      margin-bottom: 0.5rem;
    }

    label {
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;

      span {
        color: color-mix(in srgb, var(--color-primary) 85%, transparent);
        background-color: color-mix(in srgb, var(--color-primary) 25%, transparent);
        border: 2px solid rgba(0, 0, 0, 0.2);
        border-radius: 10%;
        padding: 0.5rem;
        cursor: pointer;
      }

      input {
        visibility: hidden;
        position: absolute;
        right: 0;
        &:checked + span {
          background: var(--color-secondary);
          border-color: var(--color-tertiary-hot);
          color: var(--color-background);
        }
      }
    }
  `,
})
export class RadioButtons<T extends { value: string; message: string }> {
  readonly selected = input.required<T>();
  readonly selectedChange = output<T>();
  readonly legend = input.required<string>();
  readonly options = input.required<T[]>();
}
