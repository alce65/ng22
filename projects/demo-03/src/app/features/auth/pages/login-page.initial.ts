import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
// import { DestroyRef } from '@angular/core';
// import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';

import { LoginForm } from '../components/login-form/login-form';
import { Card } from '../../../core/components/card/card';
import { SideBar } from '../../../core/components/side-bar/side-bar';
import { MenuOption } from '../../../core/types/menu.option';
import { Menu } from '../../../core/components/menu/menu';

// type FormType = 'tdf' | 'mdf-rx' | 'signals';

@Component({
  selector: 'alc-login-page',
  imports: [RouterLink, LoginForm, Card, SideBar, Menu, AsyncPipe],
  template: `
    <alc-side-bar>
      <alc-menu class="side-bar-menu" [isVertical]="true" [options]="menuOptions()" />
    </alc-side-bar>
    <h2>Login</h2>

    @let formType = (activatedRouter.params | async)?.['formType'] || 'tdf';

    @if (formType === 'tdf') {
      <alc-card>
        <alc-login-form />
      </alc-card>
    } @else if (formType === 'mdf-rx') {
      <alc-card>
        <!-- <alc-login-form /> -->
        <p>Model Driven Form (RxJs) is not implemented yet.</p>
      </alc-card>
    } @else if (formType === 'signals') {
      <alc-card>
        <!-- <alc-login-form /> -->
        <p>Signals Form is not implemented yet.</p>
      </alc-card>
    }
    <p>Si no tienes cuenta, <a [routerLink]="['/auth', 'register']">regístrate aquí</a>.</p>
  `,
  styles: `
    h2,
    p {
      text-align: center;
      margin-bottom: 1rem;
    }
    .side-bar-menu {
      display: flex;
      margin-block-start: 2rem;
      color: var(--color-primary);

      nav ul {
        gap: 5rem !important;
      }
    }
  `,
  styleUrls: ['../../pages.css'],
})
export default class LoginPage {
  protected readonly activatedRouter = inject(ActivatedRoute);
  // readonly destroyRef = inject(DestroyRef);
  // protected readonly formType = signal<FormType>('tdf');

  protected readonly menuOptions = signal<MenuOption[]>([
    {
      label: 'Template Driven Form',
      path: '/auth/login/tdf',
    },
    {
      label: 'Model Driven Form (RxJs)',
      path: '/auth/login/mdf-rx',
    },
    {
      label: 'Signals Form',
      path: '/auth/login/signals',
    },
  ]);

  // constructor() {
  //   this.#activatedRouter.params.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
  //     this.formType.set(params['formType'] || 'tdf');
  //   });
  // }
}
