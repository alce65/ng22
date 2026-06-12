import { Component } from '@angular/core';
import { NoteList } from './components/note-list-rx/note-list-res';
import { Card } from '../../core/components/card/card';

@Component({
  selector: 'alc-notes-page',
  imports: [NoteList, Card],
  template: `
    <h2>Notes Page</h2>
    <alc-card>
      <alc-note-list></alc-note-list>
    </alc-card>
  `,
  styles: `
    :host {
      display: block;
      padding: 1rem;
      width: 100%;
    }
  `,
})
export default class NotesPage {}
