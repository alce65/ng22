import { Component, input, model, output } from '@angular/core';
// Versión without model() signal

@Component({
  selector: 'alc-check-box-free',
  imports: [],
  template: `
    <!-- <p>No model() signal is used in this example.</p> -->
    <label class="custom-checkbox">
      <!-- <input type="checkbox" [checked]="checked()" (change)="checkedChange.emit(!checked())" /> -->
      <input type="checkbox" [checked]="checked()" (change)="checked.set(!checked())" />

      <span class="check-mark"></span>
      <span class="label-text">{{ label() }}</span>
    </label>
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
  `,
})
export class CheckBoxFree {
    // readonly checked = input.required<boolean>();
    // readonly checkedChange = output<boolean>();
  
  readonly checked = model.required<boolean>();
  
  readonly label = input.required<string>();
}
