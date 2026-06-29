import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '../../services/store';

@Component({
  selector: 'alc-contacts-view',
  imports: [JsonPipe],
  template: `
    <h2>contacts-view</h2>
    <p>ModeCRUD: {{ store.modoCRUD() }}</p>
    <pre>Current Contact: {{ store.currentContact() | json }}</pre>
    <button (click)="store.send()">Back to List</button>
    `,
  styles: ``,
})
export class ContactsView {
  protected readonly store = inject(Store);
}
