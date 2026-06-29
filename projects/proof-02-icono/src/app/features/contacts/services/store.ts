import { inject, Service, signal } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../../core/services/notifications';
import { Contact, DEFAULT_CONTACT } from '../entities/contact';
import { ContactApiRepository } from './contact-api-repository';
import { HttpErrorResponse } from '@angular/common/http';
import { Logger } from '../../../core/services/logger';

export type ModoCRUD = 'list' | 'add' | 'edit' | 'view' | 'delete';

@Service()
export class Store {
  readonly #router = inject(Router);
  readonly #repo = inject(ContactApiRepository);
  readonly #notify = inject(NotificationService);
  readonly #logger = inject(Logger);
  // readonly #navigation = inject(NavigationService);
  // readonly #auth = inject(AuthService);

  readonly #contactsList = signal<Contact[]>([]);
  readonly #currentContact = signal<Contact>({ ...DEFAULT_CONTACT });

  public contactsList = this.#contactsList.asReadonly();
  public currentContact = this.#currentContact.asReadonly();

  public readonly modoCRUD = signal<ModoCRUD>('list');
  public readonly idOriginal = signal<number>(0);
  public readonly listURL = '/contacts';
  public readonly Today = new Date().toISOString().substring(0, 10);

  // readonly #page = signal<number>(1);
  // readonly #rows = signal<number>(20);
  // readonly #pages = signal<number>(1);
  // readonly #totalRows = signal<number>(0);

  public list(): void {
    this.#repo.query().subscribe({
      next: (data) => {
        this.#contactsList.set(data);
        this.modoCRUD.set('list');
      },
      error: (err) => this.handleError(err),
    });
  }

  public add(): void {
    this.#currentContact.set({ ...DEFAULT_CONTACT });
    this.modoCRUD.set('add');
  }
  public edit(key: any): void {
    this.#repo.getById(key).subscribe({
      next: (data) => {
        this.#currentContact.set(data);
        this.idOriginal.set(key);
        this.modoCRUD.set('edit');
      },
      error: (err) => this.handleError(err),
    });
  }
  public view(key: any): void {
    this.#repo.getById(key).subscribe({
      next: (data) => {
        this.#currentContact.set(data);
        this.modoCRUD.set('view');
      },
      error: (err) => this.handleError(err),
    });
  }
  public delete(key: any): void {
    if (!window.confirm('¿Seguro?')) {
      return;
    }

    this.#repo.delete(key).subscribe({
      next: () => {
        this.list();
        // this.load()
      },
      error: (err) => this.handleError(err),
    });
  }

  clear() {
    this.#currentContact.set({ ...DEFAULT_CONTACT });
    this.idOriginal.set(0);
    this.#contactsList.set([]);
  }

  public cancel(): void {
    this.clear();
    this.#router.navigateByUrl(this.listURL);
    // this.navigation.back()
  }
  public send(): void {
    switch (this.modoCRUD()) {
      case 'add':
        this.#repo.create(this.#currentContact()).subscribe({
          next: () => this.cancel(),
          error: (err) => this.handleError(err),
        });
        break;
      case 'edit':
        if (!this.idOriginal()) {
          this.#logger.error('Falta el identificador');
          return;
        }
        this.#repo.update(this.idOriginal(), this.#currentContact()).subscribe({
          next: () => this.cancel(),
          error: (err) => this.handleError(err),
        });
        break;
      case 'view':
        this.cancel();
        break;
    }
  }
  handleError(err: HttpErrorResponse) {
    let message: string;
    switch (err.status) {
      case 0:
        message = err.message;
        break;
      case 404:
        message = `ERROR: ${err.status} ${err.message}`;
        break;
      default:
        message = err.error?.['detail'] ?? err.error?.['title'] ?? '';
        message = `ERROR: ${err.status} ${err.message}.${message ? ` Detalles: ${message}` : ''}`;
        if (err.error?.['errors']) {
          for (const cmp in err.error?.['errors'])
            message += ` ${cmp}: ${err.error?.['errors'][cmp]}.`;
        }
        break;
    }
    this.#notify.addNotification(message);
  }
  imageErrorHandler(event: Event, item: any) {
    (event.target as HTMLImageElement).src =
      `/images/user-not-found-${item.sexo === 'H' ? 'male' : 'female'}.png`;
  }

  readonly page = signal({ number: 0, totalPages: 0, totalRows: 0, rowsPerPage: 8 });
  load(page: number = -1) {
    if (page < 0) page = this.page().number;
    const rows = this.page().rowsPerPage;
    this.#repo.page(page, rows).subscribe({
      next: (data) => {
        this.page.set({
          number: data.page,
          totalPages: data.pages,
          totalRows: data.rows,
          rowsPerPage: rows,
        });
        this.#contactsList.set(data.list);
        this.modoCRUD.set('list');
      },
      error: (err) => this.handleError(err),
    });
  }
  pageChange(page: number = 0) {
    this.#router.navigate([], { queryParams: { page } });
  }
}
