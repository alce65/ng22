import { Component, inject } from '@angular/core';
import { Logger, ERROR_LEVEL } from '../../../../core/services/logger';

// Posibles niveles de error:
// 0: No se muestran errores
// 1: Se muestran errores
// 2: Se muestran errores y advertencias
// 3: Se muestran errores, advertencias e información
// 4: Se muestran errores, advertencias, información y logs

// Normalmente definido en variables de entorno
// (environment.ts, environment.prod.ts, etc.)
const ERROR_LEVEL_VALUE = 2;

@Component({
  selector: 'alc-logger-demo',
  imports: [],
  providers: [
    // Sin Logger provider aquí, se usaría el valor por defecto 4
    Logger,
    { provide: ERROR_LEVEL, useValue: ERROR_LEVEL_VALUE },
  ],
  template: `
    <h2>Logger Demo</h2>
    <div>
      <p>ERROR_LEVEL_VALUE: {{ errorLevel }}</p>
      <p>logger.nivel: {{ logger.nivel }}</p>
    </div>
    <div>
      <button (click)="logger.error('Mensaje de error')">Error</button>
      <button (click)="logger.warn('Mensaje de advertencia')">Warn</button>
      <button (click)="logger.info('Mensaje de información')">Info</button>
      <button (click)="logger.log('Mensaje de log')">Log</button>
    </div>
    <div>
      <p>Ejemplo de uso de logger en la plantilla:</p>
    </div>
    <ul>
      <li>Error: {{ logger.nivel > 0 ? 'Sí' : 'No' }}</li>
      <li>Warn: {{ logger.nivel > 1 ? 'Sí' : 'No' }}</li>
      <li>Info: {{ logger.nivel > 2 ? 'Sí' : 'No' }}</li>
      <li>Log: {{ logger.nivel > 3 ? 'Sí' : 'No' }}</li>
    </ul>

    {{ logger.info('Mensaje de información') }}
  `,
  styles: `
    div {
      margin-bottom: 1rem;
    }
    button {
      margin-right: 0.5rem;
    }
  `,
})
export class LoggerDemo {
  readonly logger = inject(Logger);
  readonly errorLevel = ERROR_LEVEL_VALUE;
}
