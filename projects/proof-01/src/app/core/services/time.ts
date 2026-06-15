import { Injectable, Service } from '@angular/core';

// En versiones previas a la 22

@Injectable({
  providedIn: 'root',
})
export class TimeOld {
  #time = new Date();

  getTime() {
    return this.#time.getTime();
  }
}

// En versiones 22 y posteriores
// Utilizando además elñ nuevo API Temporal de JavaScript

@Service()
export class Time {
  readonly #time = new Date();
  readonly #timeModern = Temporal.Now.instant();

  getTime() {
    return this.#timeModern?.epochMilliseconds ?? this.#time.getTime();
  }
}
