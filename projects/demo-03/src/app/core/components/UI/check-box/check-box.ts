import { Component, input } from '@angular/core';
import { FieldState, FormField } from '@angular/forms/signals';

@Component({
  selector: 'alc-check-box',
  imports: [FormField],
  template: `
    <label for="{{ id() }}" class="custom-checkbox">
      <input type="checkbox" [formField]="fieldState" [id]="id()" />
      <span class="check-mark"></span>
      <span class="label-text">{{ label() }}</span>
    </label>
    @if (fieldState().invalid() && fieldState().touched()) {
      <p class="error">
        {{ fieldState().errors()?.[0]?.message }}
      </p>
    }
  `,
  styles: `
    .custom-checkbox {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 0.8rem 0;
      cursor: pointer;
      user-select: none;

      input[type='checkbox'] {
        margin: 0;
        opacity: 0;
      }
    }

    .check-mark {
      width: 18px;
      height: 18px;
      border: 2px solid #ddd;
      border-radius: 3px;
      display: inline-block;
      position: relative;
    }

    .custom-checkbox input[type='checkbox']:checked + .check-mark {
      background-color: var(--color-secondary);
      border-color: var(--color-tertiary-hot);
    }

    .custom-checkbox input[type='checkbox']:checked + .check-mark::after {
      content: '✓';
      position: absolute;
      color: var(--color-background);
      font-size: 14px;
      top: -2px;
      left: 2px;
    }
    .error {
      color: var(--color-tertiary);
      font-size: 0.8rem;
    }
  `,
})
export class CheckBox {
  readonly label = input.required<string>();
  readonly id = input<string>(`checkbox-${Math.random().toString(36).slice(2, 9)}`);
  // readonly fieldTree = input.required<FieldTree<string>>();
  readonly fieldState = input.required<FieldState<boolean>>();
}
