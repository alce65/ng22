import { Component, inject, input } from '@angular/core';

@Component({
  selector: 'alc-contacts-edit',
  imports: [],
  template: `
    <h2>contacts-edit</h2>
  `,
  styles: ``,
})
export class ContactsEdit {
  readonly id = input<string>();

}
