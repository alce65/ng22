import { Routes } from '@angular/router';
import { MenuOption } from './core/types/menu.option';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    title: 'Home | Demo 03',
    data: {
      label: 'Inicio',
    },
    loadComponent: () => import('./features/home/home-page'),
  },
  {
    path: 'courses',
    title: 'Cursos | Demo 03',
    data: {
      label: 'Cursos',
    },
    children: [
      {
        path: '',
        loadComponent: () => import('./features/courses/courses-page'),
        // loadComponent: () =>
        //   import('./features/courses/components/hero-list/hero-list').then((m) => m.HeroList),
      },
      // {
      //   path: 'add',
      //   loadComponent: () => import('./features/courses/pages/new-page'),
      // },
      // {
      //   path: 'edit/:id',
      //   loadComponent: () => import('./features/courses/pages/edit-page'),
      //   resolve: {
      //     // superHero: () => import('./features/courses/routes/hero-resolver').then((m) => m.heroResolver),
      //     superHero: heroResolver,
      //   },
      // },
      // {
      //   // path: ':id',
      //   loadComponent: () => import('./features/courses/pages/details-page'),
      //   resolve: {
      //     // superHero: () =>
      //     //   import('./features/courses/routes/hero-resolver').then((m) => m.heroResolver),
      //     superHero: heroResolver,
      //   },
      //   matcher: heroIdMatcher,
      // },
    ],
  },

  {
    path: 'auth',
    // title: 'Auth | Demo 03',
    // loadComponent: () => import('./features/auth/auth-page'),
    children: [
      {
        path: 'login',
        title: 'Login | Demo 03',

        loadComponent: () => import('./features/auth/pages/login-page'),
      },
      {
        path: 'login/:formType',
        title: 'Login | Demo 03',
        loadComponent: () => import('./features/auth/pages/login-page'),
      },
      {
        path: 'register',
        title: 'Register | Demo 03',

        loadComponent: () => import('./features/auth/pages/register-page'),
      },
      {
        path: 'register/:formType',
        title: 'Register | Demo 03',
        loadComponent: () => import('./features/auth/pages/register-page'),
      },
    ],
  },
  {
    path: 'dashboard',
    title: 'Dashboard | Demo 03',
    data: {
      label: 'Dashboard',
    },
    loadComponent: () => import('./features/dashboard/dashboard-page'),
  },
  {
    path: 'about',
    title: 'About | Demo 03',
    data: {
      label: 'Angular (about)',
    },
    loadComponent: () => import('./features/about/about-page'),
  },

  // {
  //   path: 'notes',
  //   title: 'Notes | Demo 03',
  //   data: {
  //     label: 'Notas',
  //   },
  //   loadComponent: () => import('./features/notes/notes-page'),
  // },

  {
    path: '**',
    redirectTo: 'home',
  },
];

export const getRoutes = (): MenuOption[] => {
  return [
    ...routes
      .filter((route) => route.data?.['label'] && route.path)
      .map((route) => ({
        label: route.data?.['label'] as string,
        path: route.path as string,
      })),
  ];
};
