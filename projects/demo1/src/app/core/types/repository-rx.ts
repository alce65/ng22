import { Observable } from "rxjs";

export interface RepositoryRx<T extends { id: string | number }, DTO> {

  getAll(): Observable<T[]>;

  getById(id: T['id']): Observable<T>;

  create(item: DTO): Observable<T>;

  update(id: T['id'], item: Partial<DTO>): Observable<T>;

  delete(id: T['id']): Observable<void>;
}
