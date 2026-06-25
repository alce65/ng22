import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  email,
  FieldState,
  FieldTree,
  form,
  FormField,
  FormRoot,
  minLength,
  required,
  SchemaPathTree,
} from '@angular/forms/signals';
import { Router } from '@angular/router';

interface LoginModel {
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
        <button type="submit" class="btn btn-primary" [disabled]="loginForm().invalid()">
          Login
        </button>
      </div>
    </form>
    <div aria-label="Form Value" class="form-value">
      <p>Valor del formulario</p>
      <pre>{{ loginForm().value() | json }}</pre>
      <p>Valor de errores activos del formulario</p>
      <pre>{{ loginForm().errorSummary() | json }}</pre>
      <p>Errores activos del formulario</p>
      <ul class="error">
        @for (error of loginForm().errorSummary(); track $index) {
          <li>{{ error.message }}</li>
        }
      </ul>
    </div>
  `,
  styleUrls: ['../forms.css'],
  styles: `
    ul.error {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .form-value {
      margin-top: 2rem;
      padding: 1rem;
      border: 1px solid #ccc;
      background-color: #f9f9f9;
    }
  `,
})
export class LoginFormSignals {
  readonly #router = inject(Router);
  readonly #loginModelInitialState: LoginModel = {
    email: '',
    password: '',
    rememberMe: false,
  };

  // Signal representing the form model
  readonly #loginModel = signal<LoginModel>(this.#loginModelInitialState);

  // Sin validaciones
  // protected readonly loginForm = form(this.#loginModel)

  // Añadiendo validaciones
  // protected readonly loginForm = form(this.#loginModel, (path) => {
  //   required(path.email, { message: 'El email es obligatorio' });
  //   email(path.email, { message: 'El email debe ser una dirección de correo válida' });
  //   required(path.password, { message: 'La contraseña es obligatoria' });
  //   minLength(path.password, 6, { message: 'La contraseña debe tener al menos 6 caracteres' });
  // });

  // Schema de validación como propiedad de la clase

  readonly #loginFormSchema = (path:  SchemaPathTree<LoginModel>) => {
    required(path.email, { message: 'El email es obligatorio' });
    email(path.email, { message: 'El email debe ser una dirección de correo válida' });
    required(path.password, { message: 'La contraseña es obligatoria' });
    minLength(path.password, 6, { message: 'La contraseña debe tener al menos 6 caracteres' });
  };

  protected readonly loginForm = form(this.#loginModel, this.#loginFormSchema);

  constructor() {
    const fieldTree: FieldTree<LoginModel> = this.loginForm;
    const fieldState: FieldState<LoginModel> = fieldTree();
    const formValue = fieldState.value();

    const fieldEmail: FieldTree<LoginModel['email']> = fieldTree.email;
    const fieldStateEmail: FieldState<LoginModel['email']> = fieldEmail();
    const emailValue = fieldStateEmail.value();
  }

  protected submitForm() {
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
