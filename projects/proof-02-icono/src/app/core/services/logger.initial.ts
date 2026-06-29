import { Service } from '@angular/core';

@Service()
export class Logger {
  public error(message: string): void {
    console.error(message);
  }

  public warn(message: string): void {
    console.warn(message);
  }

  public info(message: string): void {
    if (console.info) {
      console.info(message);
    } else {
      console.log(message);
    }
  }

  public log(message: string): void {
    console.log(message);
  }
}
