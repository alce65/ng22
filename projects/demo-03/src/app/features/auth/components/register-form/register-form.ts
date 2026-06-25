import { JsonPipe, TitleCasePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  applyWhen,
  email,
  FieldTree,
  form,
  FormField,
  FormRoot,
  minLength,
  required,
  SchemaPathTree,
} from '@angular/forms/signals';
import { Gender, Course, GENDERS, COURSES } from '../../types/register-controls';
import { Router } from '@angular/router';

interface RegisterModel {
  email: string;
  password: string;
  firstName: string;
  surname: string;
  gender: Gender;
  hasCourse: boolean;
  course: Course;
  isOk: boolean;
}

// Versión inicial del formulario de registro,
// sin los campos de selección de género y curso, y sin validación de los campos.
// sin usar componentes de UI personalizados

@Component({
  selector: 'alc-register-form',
  imports: [FormField, FormRoot, JsonPipe, TitleCasePipe],
  template: `
    <form [formRoot]="registerForm" (submit)="submitForm()">
      <div aria-label="Email">
        <label for="email" class="form-control"
          >Email Email
          <input type="email" id="email" [formField]="registerForm.email" />
        </label>
        @if (registerForm.email()?.invalid() && registerForm.email()?.touched()) {
          <p class="error">
            {{ registerForm.email()?.errors()?.[0]?.message }}
          </p>
        }
      </div>
      <div aria-label="Password">
        <label for="password" class="form-control">
          Password
          <input type="password" id="password" [formField]="registerForm.password" />
        </label>
        @if (registerForm.password()?.invalid() && registerForm.password()?.touched()) {
          <p class="error">
            {{ registerForm.password()?.errors()?.[0]?.message }}
          </p>
        }
      </div>

      <fieldset aria-label="Gender">
        <legend>Gender</legend>
        @for (item of genders(); track $index) {
          <label [for]="'gender-' + item.value" class="form-control checkbox">
            <input
              type="radio"
              [id]="'gender-' + item.value"
              [formField]="registerForm.gender.value"
              [value]="item.value"
              (change)="registerForm.gender().value.set(item)"
            />
            {{ item.message | titlecase }}
          </label>
        }
      </fieldset>

      <div aria-label="Terms">
        <label for="isOk" class="form-control checkbox">
          <input type="checkbox" id="isOk" [formField]="registerForm.isOk" />
          Accept Terms ...
        </label>
        @if (registerForm.isOk()?.invalid() && registerForm.isOk()?.touched()) {
          <p class="error">
            {{ registerForm.isOk()?.errors()?.[0]?.message }}
          </p>
        }
      </div>

      <div aria-label="Has Course">
        <label for="hasCourse" class="form-control checkbox">
          <input type="checkbox" id="hasCourse" [formField]="registerForm.hasCourse" />
          ¿Quieres hacer un curso con nosotros?
        </label>
        @if (registerForm.hasCourse()?.invalid() && registerForm.hasCourse()?.touched()) {
          <p class="error">
            {{ registerForm.hasCourse()?.errors()?.[0]?.message }}
          </p>
        }
      </div>

      @if (registerForm.hasCourse().value()) {
        <div aria-label="Fist Name">
          <label for="firstName" class="form-control">
            First Name
            <input type="text" id="firstName" [formField]="registerForm.firstName" />
          </label>
          @if (registerForm.firstName()?.invalid() && registerForm.firstName()?.touched()) {
            <p class="error">
              {{ registerForm.firstName()?.errors()?.[0]?.message }}
            </p>
          }
        </div>
        <div aria-label="Surname">
          <label for="surname" class="form-control">
            Surname
            <input type="text" id="surname" [formField]="registerForm.surname" />
          </label>
          @if (registerForm.surname()?.invalid() && registerForm.surname()?.touched()) {
            <p class="error">
              {{ registerForm.surname()?.errors()?.[0]?.message }}
            </p>
          }
        </div>

        <label class="form-control" for="course">
          <span>Course</span>
          <select
            id="course"
            [formField]="registerForm.course.value"
            (change)="selectChange($event)"
          >
            @for (item of courses(); track $index) {
              <option [value]="item.value">{{ item.message }}</option>
            }
          </select>
        </label>
      }

      <div aria-label="Buttons" class="form-control">
        <button type="submit" [disabled]="registerForm().invalid()">Register</button>
      </div>
    </form>
    <div aria-label="Form Value" class="form-value">
      <p>Valor del formulario</p>
      <pre>{{ registerForm().value() | json }}</pre>
      <p>Valor de errores activos del formulario</p>
      <pre>{{ registerForm().errorSummary() | json }}</pre>
      <p>Errores activos del formulario</p>
      <ul class="error">
        @for (error of registerForm().errorSummary(); track $index) {
          <li>{{ error.message }}</li>
        }
      </ul>
    </div>
  `,
  styleUrls: ['../forms.css'],
  styles: `
    form {
      max-width: 500px;
    }
    fieldset {
      border: 1px solid #ccc;
      padding: 1rem;
      display: flex;
      gap: 1rem;
    }
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
export class RegisterForm {
  readonly #router = inject(Router);

  readonly #initialValues: RegisterModel = {
    email: '',
    password: '',
    firstName: '',
    surname: '',
    gender: { value: '', message: '' },
    isOk: false,
    hasCourse: false,
    course: { value: '', message: '' },
  };

  protected readonly genders = signal(GENDERS);
  protected readonly courses = signal(COURSES);

  protected readonly user = signal<RegisterModel>(this.#initialValues);

  readonly #optionalsSchema = (path: SchemaPathTree<RegisterModel>) => {
    required(path.firstName, { message: 'El nombre es obligatorio' });
    required(path.surname, { message: 'El apellido es obligatorio' });
    required(path.course.value, { message: 'El curso es obligatorio' });
  };

  readonly #registerFormSchema = (path: SchemaPathTree<RegisterModel>) => {
    required(path.email, { message: 'El email es obligatorio' });
    email(path.email, { message: 'El email no es válido' });
    required(path.password, { message: 'La contraseña es obligatoria' });
    minLength(path.password, 6, { message: 'La contraseña debe tener al menos 6 caracteres' });
    required(path.isOk, { message: 'Debes aceptar los términos y condiciones' });
  };

  protected readonly registerForm: FieldTree<RegisterModel> = form(this.user, (path) => {
    this.#registerFormSchema(path);
    applyWhen(
      path,
      ({ valueOf }) => valueOf(path.hasCourse) === true,
      (path) => this.#optionalsSchema(path)
    );
  });

  protected selectChange(event: Event) {
    const index = (event.target as HTMLSelectElement).selectedIndex;
    this.registerForm.course().value.set(this.courses()[index] || { value: '', message: '' });
  }

  submitForm() {
    if (this.registerForm().valid()) {
          console.log('Form submitted:', this.registerForm().value());
      // Navigate to the home page after successful login
      const formData: RegisterModel = this.registerForm().value();
      console.log('Form submitted:', formData);
      this.registerForm().reset(); // Reset the form after submission
      this.#router.navigate(['/']);
    } else {
      console.log('Form is invalid');
    }
  }
}
