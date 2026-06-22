import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'alc-auth-page',
  imports: [RouterOutlet],
  template: `
    <p>auth-page</p>
    <router-outlet />
  `,
  styles: ``,
})
export default class AuthPage {}
