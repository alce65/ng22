import { Component, inject } from '@angular/core';
import { Store } from '../../services/store';
import { Router } from '@angular/router';

@Component({
  selector: 'alc-contacts-list',
  imports: [],
  template: `
    <div class="container">
      <h1>Lista de Contactos</h1>
      <button (click)="store.add(); navigateTo('add')">Agregar Contacto</button>
      <ul>
        @for (item of store.contactsList(); track $index) {
          <li>
            {{ item.name }} - {{ item.email }}
            <button (click)="store.view(item.id); navigateTo(item.id)">Ver Detalles</button>
            <button (click)="store.edit(item.id); navigateTo(item.id, 'edit')">Editar</button>
            <button (click)="store.delete(item.id)">Eliminar</button>
          </li>
        }
      </ul>
    </div>
  `,
  styles: ``,
})
export class ContactsList {
  protected readonly store = inject(Store);
  protected readonly router = inject(Router);
  // readonly contactsList = this.store.contactsList;

  constructor() {
    this.store.list();
  }

  navigateTo(...paths: (string | number|undefined)[] ): void {
    this.router.navigate(['/contacts', ...paths
      .filter((path) => path !== undefined)
      .map((path) => path.toString())
    ]);
  }
}
