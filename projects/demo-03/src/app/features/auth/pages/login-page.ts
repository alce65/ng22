import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginForm } from '../components/login-form/login-form';
import { Card } from '../../../core/components/card/card';

@Component({
  selector: 'alc-login-page',
  imports: [RouterLink, LoginForm, Card],
  template: `
    <alc-card>
      <alc-login-form />
    </alc-card>
    <p>Si no tienes cuenta, <a [routerLink]="['/auth', 'register']">regístrate aquí</a>.</p> `,
  styles: ``,
})
export default class LoginPage {}
