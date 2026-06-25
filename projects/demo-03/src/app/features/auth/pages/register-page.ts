import { Component, DestroyRef, inject, input, signal } from '@angular/core';
import { Card } from '../../../core/components/card/card';
import { RegisterForm } from '../components/register-form/register-form';
import { NavigationStart, Router, RouterLink } from '@angular/router';
import { MenuOption } from '../../../core/types/menu.option';
import { SideBar } from '../../../core/components/side-bar/side-bar';
import { Menu } from '../../../core/components/menu/menu';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RegisterFormCustoms } from "../components/register-form-customs/register-form-customs";

type FormType = 'monolithic' | 'custom-components';
@Component({
  selector: 'alc-register-page',
  imports: [RouterLink, Card, SideBar, Menu, RegisterForm, RegisterFormCustoms],
  template: `
    <alc-side-bar [isOpenFromParent]="isOpenSideBar">
      <alc-menu class="side-bar-menu" [isVertical]="true" [options]="menuOptions()" />
    </alc-side-bar>

    <h2>Registro</h2>

    @if (!formType() || formType() === 'monolithic') {
      <p>Ejemplo de registro en un solo componente</p>
      <alc-card>
        <alc-register-form />
      </alc-card>
    } @else if (formType() === 'custom-components') {
      <p>Ejemplo de registro con componentes personalizados</p>
      <alc-card>
        <alc-register-form-customs />
      </alc-card>
    }
    <p>Cancelar y <a [routerLink]="['/home']">volver a home</a>.</p>
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
export default class RegisterPage {
  readonly destroyRef = inject(DestroyRef);
  readonly #router = inject(Router);

  // Utiliza signals para obtener el valor del parámetro de la ruta
  // y mostrar el formulario correspondiente.
  protected readonly formType = input<FormType>();

  protected readonly isOpenSideBar = signal(false);
  protected readonly menuOptions = signal<MenuOption[]>([
    {
      label: 'Monolithic Form',
      path: '/auth/register/monolithic',
    },
    {
      label: 'Custom Components',
      path: '/auth/register/custom-components',
    },
  ]);

  constructor() {
    this.#router.events.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isOpenSideBar.set(false);
        console.log(
          'NavigationStart event detected, closing sidebar',
          'isOpenSideBar',
          this.isOpenSideBar(),
        );
      }
    });
  }
}
