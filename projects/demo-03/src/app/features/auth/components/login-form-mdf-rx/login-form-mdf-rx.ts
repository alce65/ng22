import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

@Component({
  selector: 'alc-login-form-mdf-rx',
  imports: [ReactiveFormsModule, JsonPipe],
  template: `
    <form [formGroup]="loginForm" (ngSubmit)="formSubmit()">
      <label class="form-control" for="email">
        <span> Email </span>
        <input type="email" id="email" formControlName="email" />
      </label>
      @if (loginForm.controls['email']?.invalid && loginForm.controls['email']?.touched) {
        <div class="error">
          @if (loginForm.controls['email']?.hasError('required')) {
            <p>El correo electrónico es obligatorio.</p>
          }
          @if (loginForm.controls['email']?.hasError('email')) {
            <p>Por favor, introduce una dirección de correo electrónico válida.</p>
          }
        </div>
      }
      <label class="form-control" for="password">
        <span>Password</span>
        <input type="password" id="password" formControlName="password" />
      </label>
      @if (loginForm.controls['password']?.invalid && loginForm.controls['password']?.touched) {
        <div class="error">
          @if (loginForm.controls['password']?.hasError('required')) {
            <p>La contraseña es obligatoria.</p>
          }
          @if (loginForm.controls['password']?.hasError('minlength')) {
            <p>La contraseña debe tener al menos 6 caracteres.</p>
          }
        </div>
      }
      <label class="form-control checkbox" for="rememberMe">
        <input type="checkbox" id="rememberMe" formControlName="rememberMe" />
        <span>Remember me</span>
      </label>
      <div class="form-control">
        <button type="submit" class="btn btn-primary" [disabled]="loginForm.invalid">Login</button>
      </div>
    </form>
    <pre>{{ loginForm.value | json }}</pre>
  `,
  styles: `
    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 80vw;
      max-width: 400px;

      .form-control {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        &.checkbox {
          flex-direction: row;
          align-items: center;
        }
      }
    }

    input,
    textarea {
      padding: 0.5rem;
      font-size: 1rem;
      color: var(--color-primary-hot);
      background-color: var(--color-background-primary);
      border: none;
      border-block-end: 2px solid var(--color-primary);
      border-radius: 4px;

      &:focus-visible {
        outline: var(--color-primary) auto 1px;
        background-color: var(--color-background);
      }
    }

    button {
      padding: 0.5rem 1rem;
      font-size: 1rem;
      color: var(--color-background);
      background-color: var(--color-primary);
      border: none;
      border-radius: 4px;
      cursor: pointer;

      &:disabled {
        background-color: color-mix(in srgb, var(--color-primary) 30%, transparent);
        cursor: not-allowed;
      }
    }

    .error {
      color: var(--color-tertiary);
      font-size: 0.8rem;
    }
  `,
})
export class LoginFormMdfRx {
  readonly #fb = inject(FormBuilder);
  readonly #router = inject(Router);

  readonly loginForm: FormGroup = this.#fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rememberMe: [false],
  });

  protected formSubmit() {
    if (this.loginForm.valid) {
      console.log('loginForm', this.loginForm);
      // Navigate to the home page after successful login
      const formData: LoginForm = this.loginForm.value;
      console.log('Form submitted:', formData);
      this.loginForm.reset(); // Reset the form after submission
      this.#router.navigate(['/']);
    } else {
      console.log('Form is invalid');
    }
  }
}
