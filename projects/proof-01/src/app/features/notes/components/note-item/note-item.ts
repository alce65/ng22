import { Component, input, output } from '@angular/core';
import { Note } from '../../types/note';
import { Card } from '../../../../core/components/card/card';

@Component({
  selector: 'alc-note-item',
  imports: [Card],
  template: `
    <!-- @let note = note(); -->

    <!-- <alc-card [cardTitle]="note().title"> -->
    <alc-card>
      <h3>{{ note().title }}</h3>
      <p>{{ note().id }}</p>
      <p>{{ note().author }}</p>
      <label>
        <input type="checkbox" [checked]="note().isImportant" (change)="emitChange()" />
        Important
      </label>
      <button (click)="emitDelete()">Borrar</button>
    </alc-card>
  `,
  styles: `
    label {
      display: block;
    }
  `,
})
export class NoteItem {
  note = input.required<Note>();

  deleteEvent = output<Note['id']>();
  changeEvent = output<Note>();

  emitDelete() {
    this.deleteEvent.emit(this.note().id);
  }

  emitChange() {
    const note = {
      ...this.note(),
      isImportant: !this.note().isImportant,
    };
    this.changeEvent.emit(note);
  }
}
