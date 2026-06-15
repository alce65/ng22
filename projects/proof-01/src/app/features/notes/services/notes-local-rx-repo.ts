import { Service } from '@angular/core';
import { RepositoryRx } from '../../../core/types/repository-rx';
import { Note, NoteDTO } from '../types/note';
import NOTES_INIT from  '../data/notes-data.json'
import { Observable, of } from 'rxjs';

@Service()
export class NotesLocalRxRepo implements RepositoryRx<Note, NoteDTO> {

  protected readonly storageKey = 'notes';

  private getNotes(): Note[] {
    let notesJson = localStorage.getItem(this.storageKey);

    if (!notesJson) {
      notesJson = JSON.stringify(NOTES_INIT);
      localStorage.setItem(this.storageKey, notesJson);
    }

    return notesJson ? JSON.parse(notesJson) : [];
  }

  private setNotes(value: Note[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(value));
  }

  getAll(): Observable<Note[]> {
    return of(this.getNotes());
  }

  getById(id: string): Observable<Note> {
    const notes = this.getNotes();
    const note = notes.find(n => n.id === id);
    if (!note) {
      throw new Error(`Note with id ${id} not found`);
    }
    return of(note);
  }

    private generateId(notes: Note[]): string {
    while (true) {
      const id = crypto.randomUUID().substring(1, 6);
      // Verificar que el ID no exista ya
      if (!notes.some((note) => note.id === id)) {
        return id;
      }
    }
  }

  create(item: NoteDTO): Observable<Note> {
    const notes = this.getNotes();
    const newNote: Note = {
      id: this.generateId(notes),
      ...item
    };
    notes.push(newNote);
    this.setNotes(notes);
    return of(newNote);
  }

  private findNoteIndex(id: string, notes: Note[]): number {
   const index = notes.findIndex(n => n.id === id);
    if (index === -1) {
      throw new Error(`Note with id ${id} not found`);
    }
    return index;
  }

  update(id: string, item: Partial<NoteDTO>): Observable<Note> {
    const notes = this.getNotes();
    const index = this.findNoteIndex(id, notes);
    notes[index] = { ...notes[index], ...item };
    this.setNotes(notes);
    return of(notes[index]);
  }

  delete(id: string): Observable<void> {
    const notes = this.getNotes();
    const index = this.findNoteIndex(id, notes);
    notes.splice(index, 1);
    this.setNotes(notes);
    return of(void 0);
  }
}
