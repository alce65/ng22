import { Component, signal } from '@angular/core';
// import { Pills } from './components/pills/pills';
// import { Logo } from './components/logo/logo';
// import { Separator } from './components/separator/separator';

@Component({
  selector: 'alc-about-page',
  // imports: [Logo, Separator, Pills],
  template: `
    <!-- <alc-logo /> -->
    <h2>{{ pageTitle() }}</h2>
    <!-- 
    <alc-separator2 />
    <alc-pills /> -->
  `,
  styles: ``,
})
export default class AboutPage {
  protected readonly pageTitle = signal('About ng22');
}
