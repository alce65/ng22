import { Routes } from '@angular/router';
import { MenuOption } from './core/types/menu.option';

export const routes: Routes = [];


export const MENU_OPTIONS: MenuOption[]   = [
  { label: 'Inicio', path: '/' },
  { label: 'Tareas', path: '/tasks' },
  { label: 'Angular', path: '/angular' },
];
