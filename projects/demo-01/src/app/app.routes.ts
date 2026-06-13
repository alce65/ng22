import { Routes } from '@angular/router';
import { MenuOption } from './core/types/menu.option';

export const routes: Routes = [];

export const MENU_OPTIONS: MenuOption[] = [
  { label: 'Inicio', path: '#home' },
  { label: 'Dashboard', path: '#dashboard' },
  { label: 'Angular', path: '#about' },
];
