import { Component, input, output } from '@angular/core';

@Component({
  selector: 'alc-select',
  imports: [],
  template: `
    <label for="select" class="form-control">
      {{ label() }}
      <select id="select" [value]="selected().value" 
        (change)="onSelectChange($event.target)">
        <option [value]=""></option>
        @for (option of options(); track $index) {
          <option [value]="option.value">{{ option.message }}</option>
        }
      </select>
    </label>
  `,
  styles: ``,
})
export class Select<T extends { value: string; message: string }> {
  readonly selected = input.required<T>();
  readonly selectedChange = output<T>();
  readonly label = input.required<string>();
  readonly options = input.required<T[]>();

  protected onSelectChange(target: EventTarget | null) {
    const index = (target as HTMLSelectElement).selectedIndex;
    const selectedOption = this.options()[index - 1] || { value: '', message: '' };
    this.selectedChange.emit(selectedOption);
  }
}
