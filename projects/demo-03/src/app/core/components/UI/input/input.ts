import { Component, input } from '@angular/core';
import { FieldState, FormField } from '@angular/forms/signals';

@Component({
  selector: 'alc-input',
  imports: [FormField],
  template: `
    <label for="{{ id() }}" class="form-control">
      <input type="{{ type() }}" id="{{ id() }}" [formField]="fieldState" placeholder=" " />
      <!-- <input type="{{ type() }}" id="{{ id() }}" [formField]="fieldTree()" /> -->
      <span>{{ label() }}</span>
    </label>
    @if (fieldState().invalid() && fieldState().touched()) {
      <p class="error">
        {{ fieldState().errors()?.[0]?.message }}
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

    span {
      font-size: 0.8rem;
      color: var(--color-primary);
      margin-bottom: 0.2rem;
      position: relative;
      top: -2rem;
    }

    input:focus-visible + span,
    input:not(:placeholder-shown) + span {
      color: var(--color-primary-hot);
      top: -4rem;
    }

    .error {
      color: var(--color-tertiary);
      font-size: 0.8rem;
    }
  `,
})
export class Input {
  readonly type = input<string>('text');
  readonly label = input.required<string>();
  readonly id = input<string>(`input-${Math.random().toString(36).slice(2, 9)}`);
  // readonly fieldTree = input.required<FieldTree<string>>();
  readonly fieldState = input.required<FieldState<string>>();
}
