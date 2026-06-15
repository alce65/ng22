import { httpResource } from '@angular/common/http';
import { Service, WritableResource } from '@angular/core';
import { Note, NoteDTO } from '../types/note';

@Service()
export class NotesResourceRepo {
  // private readonly http = inject(HttpClient);


  private API_URL = 'http://localhost:3001/notes';

  getAll(): WritableResource<Note[]> {
    return httpResource(
      () => ({
        method: 'GET',
        url: this.API_URL,
      }),
      {
        defaultValue: [],
      },
    );

    ///.get<Note[]>(this.API_URL);
  }

  getById(id: string): WritableResource<Note | null> {
    return httpResource(
      () => ({
        method: 'GET',
        url: `${this.API_URL}/${id}`,
      }),
      {
        defaultValue: null,
      },
    );
  }

  create(item: NoteDTO): WritableResource<Note | null> {
    return httpResource(
      () => ({
        method: 'POST',
        url: this.API_URL,
        body: item,
      }),
      {
        defaultValue: null,
      },
    );
  }

  update(id: string, item: Partial<NoteDTO>): WritableResource<Note | null  > {
    return httpResource(
      () => ({
        method: 'PATCH',
        url: `${this.API_URL}/${id}`,
        body: item,
      }),
      {
        defaultValue: null,
      },
    );
  }

  delete(id: string): WritableResource<void | null> {
    return httpResource(
      () => ({
        method: 'DELETE',
        url: `${this.API_URL}/${id}`,
      }),
      {
        defaultValue: null,
      },
    );
  }
}
