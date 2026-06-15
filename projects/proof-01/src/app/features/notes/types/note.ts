export interface Note {
  id: string;
  title: string;
  author: string;
  isImportant: boolean;
}

export type NoteDTO = Omit<Note, 'id'>;
