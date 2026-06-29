import { Service, InjectionToken, inject } from '@angular/core';

export const ERROR_LEVEL = new InjectionToken<ValidErrorLevel>('ERROR_LEVEL')

type ValidErrorLevel = 0 | 1 | 2 | 3 | 4

// Posibles niveles de error:
// 0: No se muestran errores
// 1: Se muestran errores
// 2: Se muestran errores y advertencias
// 3: Se muestran errores, advertencias e información
// 4: Se muestran errores, advertencias, información y logs

@Service()
export class Logger {
  readonly #nivel: ValidErrorLevel = inject(ERROR_LEVEL, { optional: true }) ?? 4

  get nivel(): ValidErrorLevel {
    return this.#nivel
  }

  // constructor(@Optional() @Inject(ERROR_LEVEL) nivel?: ValidErrorLevel) {
  //   this.#nivel = nivel ?? 4
  // }

  public error(message: string): void {
    if (this.#nivel > 0) {
      console.error(message)
    }
  }

  public warn(message: string): void {
    if (this.#nivel > 1) {
      console.warn(message)
    }
  }

  public info(message: string): void {
    if (this.#nivel > 2) {
      if (console.info) {
        console.info(message)
      } else {
        console.log(message)
      }
    }
  }

  public log(message: string): void {
    if (this.#nivel > 3) {
      console.log(message)
    }
  }
}
