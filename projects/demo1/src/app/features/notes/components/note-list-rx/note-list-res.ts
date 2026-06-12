import { Component, DestroyRef, ElementRef, inject, signal, viewChild } from '@angular/core';
import { Note, NoteDTO } from '../../types/note';
import { JsonPipe } from '@angular/common';
import { NoteForm } from '../note-form/note-form';
import { NoteItem } from '../note-item/note-item';
import { NotesResourceRepo } from '../../services/notes-resource-repo';

@Component({
  selector: 'alc-note-list',
  imports: [JsonPipe, NoteForm, NoteItem],
  template: `
    <p>Note List Rx / httpClient API Repo</p>
    <details #details>
      <summary>Add Note</summary>
      <alc-note-form (addEvent)="addNote($event)" />
    </details>

    @if (notes.value() === null || notes.isLoading()) {
      <p>Cargando tareas....</p>
    } @else if (notes.error()) {
      <p>Error cargando tareas.</p>
    } @else {
      <ul>
        @for (note of notes.value(); track note.id) {
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
      <pre>{{ notes.value() | json }}</pre>
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
  private readonly repo = inject(NotesResourceRepo);
  // inject(NotesLocalRxRepo);

  private readonly destroyRef = inject(DestroyRef);

  protected readonly notes = this.repo.getAll();
  protected readonly details = viewChild<ElementRef<HTMLDetailsElement>>('details');

  // constructor() {
  //   this.loadNotes();
  // }

  // protected loadNotes() {
  //   // Simulación de carga de tareas desde una API
  //   const notes
  //     // .pipe(takeUntilDestroyed(this.destroyRef))
  //     // .subscribe({
  //     //   next: (notes) => {
  //     //     console.log('Notes loaded:', notes.length);
  //     //     this.notes.set(notes);
  //     //   },
  //     //   error: (error) => {
  //     //     console.error('Error loading notes:', error);
  //     //   },
  //     //   complete: () => console.log('Notes loading completed'),
  //     // });
  // }

  protected addNote(noteData: NoteDTO) {
    // Asyncrona -> servicio Repo
    const httpResource = this.repo
      .create(noteData)
      // .pipe(takeUntilDestroyed(this.destroyRef))
      // .subscribe({
      //   next: (newNote) => {
      //     console.log('Add new note:', noteData);
      //     // Sincrona -> State local (Signal)
      //     this.notes.update((notes) => [...notes, newNote]);
      //     // Cerrar el detalle después de agregar la tarea
      //     (this.details() as ElementRef<HTMLDetailsElement>).nativeElement.open = false;
      //   },
      //   error: (error) => {
      //     console.error('Error adding note:', error);
      //   },
      // });
    const newNote = httpResource.value();
    if (!newNote) {
      console.error('Error adding note: No se recibió la nueva nota');
      return;
    }
    console.log('Add new note:', noteData);
    this.notes.update((notes) => [...notes, newNote]);
    // Cerrar el detalle después de agregar la tarea
    (this.details() as ElementRef<HTMLDetailsElement>).nativeElement.open = false;
  }

  protected deleteNote(noteId: Note['id']) {
    console.log('Delete note with id:', noteId);
    const httpResource = this.repo.delete(noteId);
    // .pipe(takeUntilDestroyed(this.destroyRef))
    // .subscribe({
    //   next: () => {
    //     this.notes.update((notes) => notes.filter((note) => note.id !== noteId));
    //   },
    //   error: (error) => {
    //     console.error('Error deleting note:', error);
    //   },
    // });
    const result = httpResource.value();
    if (result === null) {
      console.error('Error deleting note with id:', noteId);
      return;
    }
    this.notes.update((notes) => notes.filter((note) => note.id !== noteId));
  }

  protected updateNote(note: Note) {
    const httpResource = this.repo.update(note.id, note);
    // .pipe(takeUntilDestroyed(this.destroyRef))
    // .subscribe({
    //   next: (updatedNote) => {
    //     console.log('Update note with id:', note.id);
    //     this.notes.update((notes) => {
    //       return notes.map((n) => (n.id === updatedNote.id ? updatedNote : n));
    //     });
    //   },
    //   error: (error) => {
    //     console.error('Error updating note:', error);
    //   },
    // });
    const updatedNote = httpResource.value();
    if (!updatedNote) {
      console.error('Error updating note with id:', note.id);
      return;
    }
    console.log('Update note with id:', note.id);
    this.notes.update((notes) => {
      return notes.map((n) => (n.id === updatedNote.id ? updatedNote : n));
    });
  }
}
