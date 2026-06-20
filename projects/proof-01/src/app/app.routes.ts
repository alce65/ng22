import { Routes } from '@angular/router';
import { MenuOption } from './core/types/menu.option';
import { heroResolver } from './features/super-heroes/routes/hero.resolver';
import { heroIdMatcher } from './features/super-heroes/routes/hero-id.matcher';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    title: 'Home | Proof 01',
    data: {
      label: 'Inicio',
    },
    loadComponent: () => import('./features/home/home-page'),
  },
  {
    path: 'heroes',
    title: 'Heroes | Proof 01',
    data: {
      label: 'Heroes',
    },
    loadComponent: () => import('./features/heroes/heroes-page'),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/heroes/components/hero-list/hero-list').then((m) => m.HeroList),
      },
      {
        path: 'add',
        loadComponent: () =>
          import('./features/heroes/components/hero-form/hero-form').then((m) => m.HeroForm),
      },
    ],
  },
  {
    path: 'super-heroes',
    title: 'Super Heroes | Proof 01',
    data: {
      label: 'Super Heroes',
    },
    children: [
      {
        path: '',
        loadComponent: () => import('./features/super-heroes/super-heroes-page'),
        // loadComponent: () =>
        //   import('./features/super-heroes/components/hero-list/hero-list').then((m) => m.HeroList),
      },
      {
        path: 'add',
        loadComponent: () => import('./features/super-heroes/pages/new-page'),
      },
      {
        path: 'edit/:id',
        loadComponent: () => import('./features/super-heroes/pages/edit-page'),
        resolve: {
          // superHero: () => import('./features/super-heroes/routes/hero-resolver').then((m) => m.heroResolver),
          superHero: heroResolver,
        },
      },
      {
        // path: ':id',
        loadComponent: () => import('./features/super-heroes/pages/details-page'),
        resolve: {
          // superHero: () =>
          //   import('./features/super-heroes/routes/hero-resolver').then((m) => m.heroResolver),
          superHero: heroResolver,
        },
        matcher: heroIdMatcher,
      },
    ],
  },
  {
    path: 'notes',
    title: 'Notes | Proof 01',
    data: {
      label: 'Notas',
    },
    loadComponent: () => import('./features/notes/notes-page'),
  },
  {
    path: 'auth',
    title: 'Auth | Proof 01',
    loadComponent: () => import('./features/auth/auth-page'),
    children: [
      {
        path: 'login',
        title: 'Login | Proof 01',
        data: {
          label: 'Login',
        },
        loadComponent: () => import('./features/auth/components/login/login').then((m) => m.Login),
      },
      {
        path: 'register',
        title: 'Register | Proof 01',
        data: {
          label: 'Registro',
        },
        loadComponent: () =>
          import('./features/auth/components/register/register').then((m) => m.Register),
      },
    ],
  },
  {
    path: 'about',
    title: 'About | Proof 01',
    data: {
      label: 'Nosotros',
    },
    loadComponent: () => import('./features/about/about-page'),
  },

  {
    path: '**',
    redirectTo: 'home',
  },
  /* {
    path: 'dashboard',
    title: 'Dashboard | Proof 01',
    data: {
      label: 'Dashboard',
    },
    loadComponent: () => import('./features/dashboard/dashboard-page'),
  },
  {
    path: 'products',
    title: 'Products | Proof 01',
    data: {
      label: 'Productos',
    },
    loadComponent: () => import('./features/products/products-page'),
    providers: [TimeOld],
  }, */
];

export const getRoutes = (): MenuOption[] => {
  return [
    ...routes
      .filter((route) => route.data?.['label'] && route.path)
      .map((route) => ({
        label: route.data?.['label'] as string,
        path: route.path as string,
      })),
    {
      label: 'Login',
      path: 'auth/login',
    },
  ];
};
