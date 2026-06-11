import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { Note, NoteDTO } from '../../types/note';
import { JsonPipe } from '@angular/common';
import { NoteForm } from '../note-form/note-form';
import { NoteItem } from '../note-item/note-item';
import { NotesLocalRepo } from '../../services/notes-local-repo';
import { Repository } from '../../../../core/types/repository';

@Component({
  selector: 'alc-note-list',
  imports: [JsonPipe, NoteForm, NoteItem],
  template: `
    <details #details>
      <summary>Add Note</summary>
      <alc-note-form (addEvent)="addNote($event)" />
    </details>

    @if (notes().length === 0) {
      <p>Cargando tareas....</p>
    } @else {
      <ul>
        @for (note of notes(); track note.id) {
          <li>
            <alc-note-item
              [note]="note"
              (deleteEvent)="deleteNote($event)"
              (changeEvent)="updateNote($event)"
            />
          </li>
        }
      </ul>
      <!--
        Ayuda para ver las tareas inicialmente
        -->
      <pre>{{ notes() | json }}</pre>
    }
  `,
  styles: `
    ul {
      list-style: none;
      padding: 0;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
      gap: 1rem;
    }
  `,
})
export class NoteList {
  private readonly repo: Repository<Note, NoteDTO> = inject(NotesLocalRepo);

  protected readonly notes = signal<Note[]>([]);
  protected readonly details = viewChild<ElementRef<HTMLDetailsElement>>('details');

  constructor() {
    this.loadNotes();
  }

  protected loadNotes() {
    // Simulación de carga de tareas desde una API
    this.repo
      .getAll()
      .then((notes) => {
        this.notes.set(notes);
      })
      .catch((error) => {
        console.error('Error loading notes:', error);
      });
  }

  protected addNote(noteData: NoteDTO) {
    console.log('Add new note:', noteData);

    // Asyncrona -> servicio Repo

    this.repo
      .create(noteData)
      .then((newNote) => {
        // Sincrona -> State local (Signal)

        this.notes.update((notes) => [...notes, newNote]);
        // Cerrar el detalle después de agregar la tarea
        (this.details() as ElementRef<HTMLDetailsElement>).nativeElement.open = false;
      })
      .catch((error) => {
        console.error('Error adding note:', error);
      });
  }

  protected deleteNote(noteId: Note['id']) {
    console.log('Delete note with id:', noteId);
    this.repo
      .delete(noteId)
      .then(() => {
        this.notes.update((notes) => notes.filter((note) => note.id !== noteId));
      })
      .catch((error) => {
        console.error('Error deleting note:', error);
      });
  }

  protected updateNote(note: Note) {
    console.log('Update note with id:', note.id);

    this.repo
      .update(note.id, note)
      .then((updatedNote) => {
        this.notes.update((notes) => {
          return notes.map((n) => (n.id === updatedNote.id ? updatedNote : n));
        });
      })
      .catch((error) => {
        console.error('Error updating note:', error);
      });
  }
}
