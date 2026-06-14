import { Routes } from '@angular/router';
import { MenuOption } from './core/types/menu.option';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    title: 'Home | Demo 01',
    data: {
      label: 'Inicio',
    },
    loadComponent: () => import('./features/home/home-page').then((m) => m.default),
  },
  {
    path: 'heroes',
    title: 'Heroes | Demo 01',
    data: {
      label: 'Heroes',
    },
    loadComponent: () => import('./features/heroes/heroes-page').then((m) => m.default),
  },
  {
    path: 'notes',
    title: 'Notes | Demo 01',
    data: {
      label: 'Notas',
    },
    loadComponent: () => import('./features/notes/notes-page').then((m) => m.default),
  },
  {
    path: 'about',
    title: 'About | Demo 01',
    data: {
      label: 'Nosotros',
    },
    loadComponent: () => import('./features/about/about-page').then((m) => m.default),
  },

  {
    path: '**',
    redirectTo: 'home',
  },
  /* {
    path: 'dashboard',
    title: 'Dashboard | Demo 01',
    data: {
      label: 'Dashboard',
    },
    loadComponent: () => import('./features/dashboard/dashboard-page').then((m) => m.default),
  },
  {
    path: 'products',
    title: 'Products | Demo 01',
    data: {
      label: 'Productos',
    },
    loadComponent: () => import('./features/products/products-page').then((m) => m.default),
    providers: [TimeOld],
  }, */
];

export const getRoutes = (): MenuOption[] => {
  return routes
    .filter((route) => route.data?.['label'] && route.path)
    .map((route) => ({
      label: route.data?.['label'] as string,
      path: route.path as string,
    }));
};
