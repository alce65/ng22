import { Component } from '@angular/core';
import { Card } from '../../../core/components/card/card';
import { RegisterForm } from '../components/register-form/register-form';

@Component({
  selector: 'alc-register-page',
  imports: [Card, RegisterForm],
  template: `
    <alc-card>
      <alc-register-form />
    </alc-card>
  `,
  styles: ``,
})
export default class RegisterPage {}
