import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  applyWhen,
  email,
  form,
  FormRoot,
  minLength,
  required,
  schema,
  SchemaPathTree,
  validate,
} from '@angular/forms/signals';
import { CheckBox } from '../UI/check-box/check-box';
import { RadioButtons } from '../UI/radio-buttons/radio-buttons';
import { Select } from '../UI/select/select';
import { Input } from '../UI/input/input';
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

@Component({
  selector: 'alc-register-form-customs',
  imports: [FormRoot, JsonPipe, CheckBox, RadioButtons, Select, Input],
  template: `
    <form [formRoot]="registerForm" (submit)="submitForm()">
      <alc-input
        aria-label="Email"
        [label]="'Email'"
        type="email"
        [fieldState]="registerForm.email()"
      />
      <alc-input
        aria-label="Password"
        [label]="'Password'"
        type="password"
        [fieldState]="registerForm.password()"
      />
      <alc-radio-buttons
        aria-label="Gender"
        [legend]="'Gender'"
        [options]="genders()"
        [selected]="registerForm.gender().value()"
        (selectedChange)="updateGender($event)"
      />
      <div aria-label="Terms">
        <alc-check-box
          [label]="'Accept Terms ...'"
          [checked]="registerForm.isOk().value()"
          (checkedChange)="updateIsOk($event)"
        />
        @if (registerForm.isOk()?.invalid() && registerForm.isOk()?.touched()) {
          <p class="error">
            {{ registerForm.isOk()?.errors()?.[0]?.message }}
          </p>
        }
      </div>
      <div aria-label="Has Course">
        <alc-check-box
          [label]="'Haz echo algún curso con nosotros'"
          [checked]="registerForm.hasCourse().value()"
          (checkedChange)="updateHasCourse($event)"
        />
      </div>

      @if (registerForm.hasCourse().value()) {
        <alc-input
          aria-label="First Name"
          [label]="'First Name'"
          type="text"
          [fieldState]="registerForm.firstName()"
        />
        <alc-input
          aria-label="Surname"
          [label]="'Surname'"
          type="text"
          [fieldState]="registerForm.surname()"
        />
        <div aria-label="Course">
          <alc-select
            [label]="'Selecciona un curso'"
            [options]="courses()"
            [selected]="registerForm.course().value()"
            (selectedChange)="registerForm.course().value.set($event)"
          />

          @if (
            registerForm.hasCourse().value() &&
            registerForm.course()?.invalid() &&
            registerForm.course()?.touched()
          ) {
            <div aria-label="Course Error" class="error">
              {{ registerForm.course()?.errors()?.[0]?.message }}
            </div>
          }
        </div>
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
export class RegisterFormCustoms {
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

  protected readonly registerForm = form(this.user, (schema) => {
    this.#registerFormSchema(schema);
    applyWhen(
      schema,
      ({ valueOf }) => valueOf(schema.hasCourse) === true,
      (schema) => this.#optionalsSchema(schema),
    );

    // Custom validation  para el select
    // finalmente no hizo falta
    // validate(schema.course, ({ value, valueOf }) => {
    //   if (value().value === '' && valueOf(schema.hasCourse) === true) {
    //     return {
    //       message: 'El curso es obligatorio',
    //       kind: 'required',
    //     };
    //   }
    //   return null;
    // });
  });

  protected updateEmail(newEmail: string) {
    this.registerForm.email().value.set(newEmail);
  }

  protected updateIsOk(newChecked: boolean) {
    this.registerForm.isOk().value.set(newChecked);
  }

  protected updateHasCourse(newChecked: boolean) {
    this.registerForm.hasCourse().value.set(newChecked);
  }

  protected updateGender(newGender: Gender) {
    this.registerForm.gender().value.set(newGender);
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
