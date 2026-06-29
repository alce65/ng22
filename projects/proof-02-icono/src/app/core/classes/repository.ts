import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

export abstract class RepositoryPro<T, K> {
  protected readonly baseUrl = environment.API_URL;
  protected http = inject(HttpClient);
  protected option;

  constructor(entidad: string, option = {}) {
    this.option = option;
    if (entidad.toLocaleLowerCase().startsWith('http')) {
      this.baseUrl = entidad;
    } else {
      this.baseUrl += entidad;
    }
  }

  getAll(extras = {}): Observable<T[]> {
    const options = Object.assign({}, this.option, extras);
    return this.http.get<T[]>(this.baseUrl, options);
  }

  getById(id: K, extras = {}): Observable<T> {
    const options = Object.assign({}, this.option, extras);
    return this.http.get<T>(`${this.baseUrl}/${id}`, options);
  }

  query(extras = {}): Observable<T[]> {
    const options = Object.assign({}, this.option, extras);
    return this.http.get<T[]>(this.baseUrl, options);
  }

  // add
  create(item: T, extras = {}): Observable<T> {
    const options = Object.assign({}, this.option, extras);
    return this.http.post<T>(this.baseUrl, item, options);
  }
  //change
  update(id: K, item: T, extras = {}): Observable<T> {
    const options = Object.assign({}, this.option, extras);
    return this.http.put<T>(`${this.baseUrl}/${id}`, item, options);
  }
  //remove
  // Alñternativa: delete(id: number, id: K, extras = {}): Observable<void>
  delete(id: K, extras = {}): Observable<T> {
    const options = Object.assign({}, this.option, extras);
    return this.http.delete<T>(`${this.baseUrl}/${id}`, options);
  }
}

export abstract class Repository<T,  K> {
  protected readonly baseUrl = environment.API_URL;
  protected http = inject(HttpClient);

  constructor(entidad: string) {
    if (entidad.toLocaleLowerCase().startsWith('http')) {
      this.baseUrl = entidad;
    } else {
      this.baseUrl += entidad;
    }
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl);
  }

  getById(id: K): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${id}`);
  }

  query(extras = {}): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl, extras);
  }

  // add
  create(item: T): Observable<T> {
    return this.http.post<T>(this.baseUrl, item);
  }
  //change
  update(id: K, item: T): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${id}`, item);
  }
  //remove
  // Alñternativa: delete(id: number, id: K, extras = {}): Observable<void>
  delete(id: K): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${id}`);
  }
}
