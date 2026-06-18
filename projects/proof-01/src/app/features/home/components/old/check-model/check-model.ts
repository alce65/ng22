import { Component, input, output} from '@angular/core';
// Versión without model() signal

@Component({
  selector: 'alc-check-model',
  imports: [],
  template: `
    <p>No model() signal is used in this example.</p>
    <label class="custom-checkbox">
      <input type="checkbox" [checked]="checked()" (change)="toggle()" />
      <span class="check-mark"></span>
      <span class="label-text">{{ label() }}</span>
    </label>
  `,
  styles: `
    .custom-checkbox {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 12px 0;
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
      background-color: #4caf50;
      border-color: #4caf50;
    }

    .custom-checkbox input[type='checkbox']:checked + .check-mark::after {
      content: '✓';
      position: absolute;
      color: white;
      font-size: 14px;
      top: -2px;
      left: 2px;
    }
  `,
})
export class CheckModel {

  readonly checked = input.required<boolean>();
  readonly emitCheckedChange = output<boolean>();
  readonly label = input.required<string>();

  toggle() {
    // This updates BOTH the component's state AND the parent's model!
    const newChecked = !this.checked();
    this.emitCheckedChange.emit(newChecked);
  }

}
