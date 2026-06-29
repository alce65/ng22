import { Service } from '@angular/core';
import { Contact } from '../entities/contact';
import { Repository, RepositoryPro } from '../../../core/classes/repository';
import { map, Observable } from 'rxjs';

type PageResult = { page: number; pages: number; rows: number; list: Contact[] };

const URL_CONTACTS = '/contacts';

@Service()
export class ContactApiRepository extends Repository<Contact, number> {
  constructor() {
    super(URL_CONTACTS);
  }

  page(page: number, rows: number = 20, sort?: string): Observable<PageResult> {
    let url = `${this.baseUrl}?_page=${page}&_rows=${rows}`;
    url = sort ? `${url}&_sort=${sort}` : url;
    return this.http.get<any>(url).pipe(
      map((data) => ({
        page: data.number,
        pages: data.totalPages,
        rows: data.totalElements,
        list: data.content,
      })),
    );
  }
}

@Service()
export class ContactApiRepositoryPro extends RepositoryPro<Contact, number> {
  constructor() {
    super(URL_CONTACTS);
  }

  page(page: number, rows: number = 20, sort?: string): Observable<PageResult> {
    let url = `${this.baseUrl}?_page=${page}&_rows=${rows}`;
    return this.http.get<any>(url, this.option).pipe(
      map((data) => ({
        page: data.number,
        pages: data.totalPages,
        rows: data.totalElements,
        list: data.content,
      })),
    );
  }
}
