import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { email, form, FormField, FormRoot, minLength, required } from '@angular/forms/signals';
import { Router } from '@angular/router';

interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

@Component({
  selector: 'alc-login-form-signals',
  imports: [FormRoot, FormField, JsonPipe],
  template: `
    <form [formRoot]="loginForm" (submit)="submitForm()">
      <label class="form-control" for="email">
        <span> Email </span>
        <input type="email" id="email" [formField]="loginForm.email" />
      </label>
      @if (loginForm.email()?.invalid() && loginForm.email()?.touched()) {
        <!-- @if (loginForm.email().errors() && loginForm.email()?.touched()) { -->
        <p class="error">{{ loginForm.email().errors()[0].message }}</p>
      }
      <label class="form-control" for="password">
        <span>Password</span>
        <input type="password" id="password" [formField]="loginForm.password" />
      </label>
      @if (loginForm.password()?.invalid() && loginForm.password()?.touched()) {
        <p class="error">{{ loginForm.password().errors()[0].message }}</p>
      }
      <label class="form-control checkbox" for="rememberMe">
        <input type="checkbox" id="rememberMe" [formField]="loginForm.rememberMe" />
        <span>Remember me</span>
      </label>
      <div class="form-control">
        <button type="submit" class="btn btn-primary" [disabled]="loginForm().invalid()">Login</button>
      </div>
    </form>
    <pre>{{ loginForm().value() | json }}</pre>
  `,
  styleUrls: ['../forms.css'],
  styles: ``,
})
export class LoginFormSignals {
  readonly #router = inject(Router);
  readonly #loginFormInitialState: LoginForm = {
    email: '',
    password: '',
    rememberMe: false,
  };

  // Signal representing the form state
  readonly #loginFormState = signal<LoginForm>(this.#loginFormInitialState);
  // Sin valifdaciones
  // protected readonly loginForm = form(this.#loginFormState)
  // Añadiendo validaciones
  protected readonly loginForm = form(this.#loginFormState, (path) => {
    required(path.email, { message: 'El email es obligatorio' });
    email(path.email, { message: 'El email debe ser una dirección de correo válida' });
    required(path.password, { message: 'La contraseña es obligatoria' });
    minLength(path.password, 6, { message: 'La contraseña debe tener al menos 6 caracteres' });
  });

  protected submitForm() {
    console.log('Form submitted');
    if (this.loginForm().valid()) {
      console.log('Form submitted');
      const formData = this.loginForm().value();
      console.log('Form submitted:', formData);
      this.loginForm().reset(); // Reset the form after submission
      // Navigate to the home page after successful login
      this.#router.navigate(['/']);
    } else {
      console.log('Form is invalid');
    }
  }
}
