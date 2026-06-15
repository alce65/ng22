import { inject, Service } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { RepositoryRx } from '../../../core/types/repository-rx';
import { Note, NoteDTO } from '../types/note';
import { HttpClient } from '@angular/common/http';

@Service()
export class NotesApiRepo implements RepositoryRx<Note, NoteDTO> {
  private readonly http = inject(HttpClient);

  private API_URL = 'http://localhost:3001/notes';

  getAll(): Observable<Note[]> {
    return this.http.get<Note[]>(this.API_URL);
  }

  getById(id: string): Observable<Note> {
    return this.http.get<Note>(`${this.API_URL}/${id}`);
  }

  create(item: NoteDTO): Observable<Note> {
    return this.http.post<Note>(this.API_URL, item);
  }

  update(id: string, item: Partial<NoteDTO>): Observable<Note> {
    return this.http.patch<Note>(`${this.API_URL}/${id}`, item);
  }

  delete(id: string): Observable<void> {
    return this.http.delete(`${this.API_URL}/${id}`).pipe(
      map(() => undefined)
    );
  }
}
