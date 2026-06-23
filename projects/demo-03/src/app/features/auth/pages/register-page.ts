import { Component } from '@angular/core';
import { Card } from '../../../core/components/card/card';
import { RegisterForm } from '../components/register-form/register-form';

@Component({
  selector: 'alc-register-page',
  imports: [Card, RegisterForm],
  template: `
    <h2>Registro</h2>
    <alc-card>
      <alc-register-form />
    </alc-card>
  `,
  styles: ``,
  styleUrls: ['../../pages.css'],
})
export default class RegisterPage {}
