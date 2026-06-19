import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'alc-details-page',
  imports: [JsonPipe],
  template: `<p>details-page works!</p>
  <pre>{{ hero() | json }}</pre>
  `,
  styles: ``,
})
export default class DetailsPage {
  protected readonly activateRoute = inject(ActivatedRoute);
  protected readonly hero = signal(this.activateRoute.snapshot.data['superHero']);
}
