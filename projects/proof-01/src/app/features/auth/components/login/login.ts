import { Component } from '@angular/core';
import { Card } from '../../../../core/components/card/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'alc-login',
  imports: [Card, RouterLink],
  template: `
    <alc-card>
      <p>login works!</p>
    </alc-card>
    <p>Si no tienes cuenta, <a [routerLink]="['/auth','register']">regístrate aquí</a>.</p>
  `,
  styles: ``,
})
export class Login {}
