import { Component, DestroyRef, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationStart, Router } from '@angular/router';

import { Card } from '../../../core/components/card/card';
import { SideBar } from '../../../core/components/side-bar/side-bar';
import { MenuOption } from '../../../core/types/menu.option';
import { Menu } from '../../../core/components/menu/menu';
import { LoginFormTdf } from '../components/login-form-tdf/login-form-tdf';
import { LoginFormMdfRx } from '../components/login-form-mdf-rx/login-form-mdf-rx';
import { LoginFormSignals } from '../components/login-form-signals/login-form-signals';

type FormType = 'tdf' | 'mdf-rx' | 'signals';

@Component({
  selector: 'alc-login-page',
  imports: [RouterLink, LoginFormTdf, LoginFormMdfRx, LoginFormSignals, Card, SideBar, Menu],
  template: `
    <alc-side-bar [isOpenFromParent]="isOpenSideBar">
      <alc-menu class="side-bar-menu" [isVertical]="true" [options]="menuOptions()" />
    </alc-side-bar>
    <h2>Login</h2>

    @if (!formType() || formType() === 'tdf') {
      <p>Ejemplo de Template Driven Form</p>
      <alc-card>
        <alc-login-form-tdf />
      </alc-card>
    } @else if (formType() === 'mdf-rx') {
      <p>Ejemplo de Model Driven Form (RxJs)</p>
      <alc-card>
        <alc-login-form-mdf-rx />
      </alc-card>
    } @else if (formType() === 'signals') {
      <p>Ejemplo de Signals Form</p>
      <alc-card>
        <alc-login-form-signals />
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
  readonly destroyRef = inject(DestroyRef);
  readonly #router = inject(Router);
  protected readonly formType = input<FormType>();

  protected readonly isOpenSideBar = signal(false);
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

  constructor() {
    this.#router.events.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isOpenSideBar.set(false);
        console.log('NavigationStart event detected, closing sidebar',
          'isOpenSideBar', this.isOpenSideBar()
        );
      }
    });
  }
}
