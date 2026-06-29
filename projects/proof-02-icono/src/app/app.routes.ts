import { Routes } from '@angular/router';
import { Demos, Home } from './features';
import { PageNotFound } from './layout';
import { MenuOption } from './core';
import { contactsRoutes } from './features/contacts/routes/contacts.routes';


export const routes: Routes = [
  { path: '', pathMatch: 'full', component: Home },
  { path: 'inicio', component: Home },
  { path: 'demos', component: Demos },
  {
    path: 'contacts',
    children: contactsRoutes,
  },
  { path: '404.html', component: PageNotFound },
  { path: '**', component: PageNotFound },
];

export function getMenuOptions(): MenuOption[] {
  return [
    { label: 'Inicio', path: '/inicio', visible: true },
    { label: 'Demos', path: '/demos', visible: true },
    { label: 'Contactos', path: '/contacts', visible: true },
    { label: 'No existe', path: '/desconocido', visible: true },
  ];
}
