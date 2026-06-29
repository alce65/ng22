import { computed, inject, Service, Signal, signal } from '@angular/core';
import { Logger } from './logger';

//export enum NotificationType { error = 'error', warn = 'warn', info = 'info', log = 'log' }

export type NotificationType = 'error' | 'warn' | 'info' | 'log';

export class Notification {
  #id: number;
  #message: string;
  #type: NotificationType;
  constructor(id: number, message: string, type: NotificationType) {
    this.#id = id;
    this.#message = message;
    this.#type = type;
  }

  public get id() {
    return this.#id;
  }
  public get message() {
    return this.#message;
  }
  public get type() {
    return this.#type;
  }
}

interface NotificationServiceType {
  notificationsList: Signal<Notification[]>;
  addNotification(message: string, type?: NotificationType): void;
  remove(index: number): void;
  removeById(id: number): void;
  clear(): void;
}

@Service()
export class NotificationService implements NotificationServiceType {
  logger = inject(Logger);

  public readonly NotificationType: NotificationType = 'log';
  readonly #notificationsList = signal<Notification[]>([]);
  public readonly hasNotifications = computed<boolean>(() => this.#notificationsList().length > 0);
  public get notificationsList() {
    return this.#notificationsList.asReadonly();
  }

  #generateId(): number {
    return this.hasNotifications()
      ? this.notificationsList()[this.notificationsList().length - 1].id + 1
      : 1;
  }

  public addNotification(message: string, type: NotificationType = 'log'): void {
    if (!message || message === '') {
      this.logger.error('Falta el mensaje de notificación.');
      return;
    }
    const id = this.#generateId();
    const notification = new Notification(id, message, type);
    this.#notificationsList.update((list) => [...list, notification]);
    this.logger.log(`Notification added: ${message} (type: ${type})`);

    // Redundancia: Los errores también se muestran en consola
    // if (!environment.production && type === 'error') {
    //   this.logger.error(`NOTIFICATION: ${msg}`);
    // }
  }

  public remove(index: number) {
    if (index < 0 || index >= this.notificationsList().length) {
      this.logger.error('Index out of range.');
      return;
    }
    this.#notificationsList.update((value) => value.filter((item, ind) => ind !== index));
  }

  public removeById(id: number) {
    this.#notificationsList.update((value) => value.filter((item) => item.id !== id));
  }

  public clear() {
    if (this.hasNotifications()) this.#notificationsList.set([]);
  }
}
