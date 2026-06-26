import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  applyWhen,
  email,
  form,
  FormRoot,
  minLength,
  required,
  SchemaPathTree,
} from '@angular/forms/signals';
import { CheckBoxFree } from '../../../../core/components/UI/check-box-free/check-box-free';
import { RadioButtons } from '../../../../core/components/UI/radio-buttons/radio-buttons';
import { Select } from '../../../../core/components/UI/select/select';
import { Input } from '../../../../core/components/UI/input/input';
import { Gender, Course, GENDERS, COURSES } from '../../types/register-controls';
import { Router } from '@angular/router';
import { CheckBox } from '../../../../core/components/UI/check-box/check-box';

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
  imports: [FormRoot, JsonPipe, CheckBox, CheckBoxFree, RadioButtons, Select, Input],
  template: `
    <form [formRoot]="registerForm" (submit)="submitForm()">
      <alc-input
        aria-label="Email"
        [label]="'Email'"
        type="email"
        [fieldState]="registerForm.email()"
        [nativeAttrs]="{ 'aria-describedby': 'email-error' }"
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
        [fieldState]="registerForm.gender()"
      />
      <alc-check-box
        [label]="'Acepto los  términos ...'"
        [fieldState]="registerForm.isOk()"
        aria-disabled="Terms"
      />
      <div aria-label="Has Course">
        <alc-check-box-free
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
        <alc-select
          aria-label="Course"
          [label]="'Selecciona un curso'"
          [options]="courses()"
          [fieldState]="registerForm.course()"
        />
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
    required(path.gender.value, { message: 'Indicar el género es obligatorio' });
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
