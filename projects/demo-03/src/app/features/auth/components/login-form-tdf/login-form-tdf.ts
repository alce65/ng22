import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'alc-login-form-tdf',
  imports: [FormsModule, JsonPipe],
  template: `
    <form #loginForm="ngForm" (ngSubmit)="formSubmit(loginForm)">
      <label class="form-control" for="email">
        <span>Email</span>
        <input type="email" id="email" name="email" ngModel email required />
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
        <input
          type="password"
          id="password"
          name="password"
          ngModel
          required minlength="6"
        />
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
        <input type="checkbox" id="rememberMe" name="rememberMe" [ngModel]="false" />
        <span>Remember me</span>
      </label>
      <div class="form-control">
        <button type="submit" class="btn btn-primary" [disabled]="!loginForm.form.valid">
          Login
        </button>
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
export class LoginFormTdf {

  readonly router = inject(Router);

  protected formSubmit(loginForm: NgForm) {
    if (loginForm.valid) {
      console.log('loginForm', loginForm);
      // Navigate to the home page after successful login
      console.log('Form submitted:', loginForm.value);
      loginForm.resetForm(); // Reset the form after submission
      this.router.navigate(['/']);
    } else {
      console.log('Form is invalid:', loginForm.value);
    }
  }
}
