import { Component, inject, input } from '@angular/core';
import { Store } from '../../services/store';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'alc-contacts-edit',
  imports: [JsonPipe],
  template: `
    <h2>contacts-edit</h2>
    <p>ModeCRUD: {{ store.modoCRUD() }}</p>
    <P>ID según el path: {{ id() }}</P>
    <p>ID: {{ store.idOriginal() }}</p>
    <pre>Current Contact: {{ store.currentContact() | json }}</pre>
    <button (click)="store.send()" disabled>Save Contact</button>
    <button (click)="store.cancel()">Back to List (cancel)</button>
  `,
  styles: ``,
})
export class ContactsEdit {
  readonly id = input<string>();
  protected readonly store = inject(Store);
}
