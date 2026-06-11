import { Component, output, signal } from '@angular/core';
import { NoteDTO } from '../../types/note';
import { JsonPipe } from '@angular/common';
import { form, FormField, FormRoot } from '@angular/forms/signals';

@Component({
  selector: 'alc-note-form',
  imports: [JsonPipe, FormField, FormRoot],
  template: `
    <p>Signal Form</p>
    <form [formRoot]="noteForm">
      <label class="form-control">
        Título:
        <input type="text" [formField]="noteForm.title" />
      </label>
      <label class="form-control">
        Autor:
        <input type="text" [formField]="noteForm.author" />
      </label>
      <button type="submit">Agregar nota</button>
    </form>

    <pre>{{ noteData() | json }}</pre>
  `,
  styles: `
    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .form-control {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
  `,
})
export class NoteForm {
  protected addEvent = output<NoteDTO>();

  private readonly initialNoteData: NoteDTO = {
    title: '',
    author: '',
    isImportant: false,
  };

  protected readonly noteData = signal<NoteDTO>(this.initialNoteData);

  protected readonly noteForm = form(this.noteData, {
    submission: {
      action: async (f) => {
        this.emitAddNote();
        f().reset(this.initialNoteData);
      },
    },
  });

  protected emitAddNote() {
    // const data: NoteDTO ={ ...ngForm.value, isImportant: false };
    // this.noteForm.
    console.log('Emitiendo evento para agregar nota:', this.noteData);
    this.addEvent.emit(this.noteData());
  }
}
