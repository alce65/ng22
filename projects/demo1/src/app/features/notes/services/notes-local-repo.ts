import { Service } from '@angular/core';
import { Note, NoteDTO } from '../types/note';
import { Repository } from '../../../core/types/repository';
import NOTES_INIT from  '../data/notes-data.json'

@Service()
export class NotesLocalRepo implements Repository<Note, NoteDTO> {

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

  async getAll(): Promise<Note[]> {
    return this.getNotes();
  }

  async getById(id: string): Promise<Note> {
    const notes = this.getNotes();
    const note = notes.find(n => n.id === id);
    if (!note) {
      throw new Error(`Note with id ${id} not found`);
    }
    return note;
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

  async create(item: NoteDTO): Promise<Note> {
    const notes = this.getNotes();
    const newNote: Note = {
      id: this.generateId(notes),
      ...item
    };
    notes.push(newNote);
    this.setNotes(notes);
    return newNote;
  }

  private findNoteIndex(id: string, notes: Note[]): number {
   const index = notes.findIndex(n => n.id === id);
    if (index === -1) {
      throw new Error(`Note with id ${id} not found`);
    }
    return index;
  }

  async update(id: string, item: Partial<NoteDTO>): Promise<Note> {
    const notes = this.getNotes();
    const index = this.findNoteIndex(id, notes);
    notes[index] = { ...notes[index], ...item };
    this.setNotes(notes);
    return notes[index];
  }

  async delete(id: string): Promise<void> {
    const notes = this.getNotes();
    const index = this.findNoteIndex(id, notes);
    notes.splice(index, 1);
    this.setNotes(notes);
  }
}
