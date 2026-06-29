import { Component, inject } from '@angular/core';
import { Store } from '../../services/store';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'alc-contacts-add',
  imports: [JsonPipe],
  template: `
    <h2>contacts-add</h2>
    <p>ModeCRUD: {{ store.modoCRUD() }}</p>
    <pre>Current Contact: {{ store.currentContact() | json }}</pre>

    <button (click)="store.send()" disabled>Add Contact</button>
    <button (click)="store.cancel()">Back to List (cancel)</button>
    `,
  styles: ``,
})
export class ContactsAdd {
  protected readonly store = inject(Store);
}
