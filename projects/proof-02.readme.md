# Proof 01

Proyecto de Angular 22 a partir del curso de ICONO.

- [Proof 01](#proof-01)
  - [Creación del proyecto](#creación-del-proyecto)
  - [Taller 1. Laboratorio Angular 22 - Creación y estructuración de una aplicación](#taller-1-laboratorio-angular-22---creación-y-estructuración-de-una-aplicación)
    - [Scaffolding de la aplicación](#scaffolding-de-la-aplicación)
    - [Layout inicial](#layout-inicial)
    - [Navegación](#navegación)
    - [Visual components](#visual-components)
    - [Resultado: Laboratorio Angular 22 - Creación y estructuración de una aplicación](#resultado-laboratorio-angular-22---creación-y-estructuración-de-una-aplicación)
  - [Signals](#signals)
  - [Taller 2. Laboratorio Angular 22 - Sistema de Notificaciones](#taller-2-laboratorio-angular-22---sistema-de-notificaciones)
    - [⚙️Servicio: Logger](#️servicio-logger)
      - [Uso del servicio `Logger` en un componente](#uso-del-servicio-logger-en-un-componente)
  - [Feature Notifications](#feature-notifications)
    - [Entidad (Model) Notification](#entidad-model-notification)
    - [Interface NotificationServiceType](#interface-notificationservicetype)
    - [⚙️Servicio NotificationService](#️servicio-notificationservice)
    - [Opciones](#opciones)
  - [Otros servicios](#otros-servicios)
  - [Sistema de contactos](#sistema-de-contactos)
    - [Entidad](#entidad)
    - [Environments](#environments)
    - [Servicios](#servicios)
      - [Repositorio o DAO. Clase abstracta](#repositorio-o-dao-clase-abstracta)
      - [Servicio Repositorio de contactos](#servicio-repositorio-de-contactos)
      - [Store (ViewModel)](#store-viewmodel)


## Creación del proyecto

Creamos el proyecto seleccionando las opciones

- estilo CSS (`--style css`)
- sin SSR (`--ssr false`)
- prefijo de selector (`p alc`)
- template inline (`-t`)
- estilos inline (`-s`)  

```shell
ng g app proof-02-icono --style css --ssr false -p alc -t -s 
```

Modificaciones de tsconfig: ` "rootDir": "'./src'"` 

## Taller 1. Laboratorio Angular 22 - Creación y estructuración de una aplicación 

Se añaden estilos y variables CSS como en las demos.

### Scaffolding de la aplicación

taller
 ├─ public
 │   └─ images
 └─ src
     ├─ app
     │   ├─ core
     │   │   ├─ components
     │   │   ├─ services
     │   │   └─ security
     │   ├─ layout
     │   └─ features
     ├─ environments
     └─ lib
         └─ my-library
             ├─ components
             ├─ directives
             ├─ pipes
             ├─ services
             └─ utils

Componentes:


- ng g c layout/PageNotFound --project proof-02-icono
- ng g c layout/header --project proof-02-icono
- ng g c layout/footer --project proof-02-icono
- creación del barrel
- ng g c features/home --project proof-02-icono
- ng g c features/demos --project proof-02-icono
- creación del barrel

### Layout inicial

- App: reubicado

```html
<app-header />
<div class="container-fluid">
  <main class="p-2">
    <router-outlet />
  </main>
</div>
<app-footer />
```

- Header: layout/header.initial.ts
- Footer: layout/footer.initial.ts
- PageNotFound: layout/page-not-found.initial.ts

### Navegación

- Páginas

  - Home: features/home.ts
  - Demos: features/demos.ts
  - PageNotFound: layout/page-not-found.ts

- Rutas: app.routes.ts

```ts
export const routes: Routes = [
  { path: '', pathMatch: 'full', component: Home },
  { path: 'inicio', component: Home },
  { path: 'demos', component: Demos },
  { path: '**', component: PageNotFound }
];
```

- Tipo para MenuOptions

- Función para generar el menú de navegación: `getMenuOptions()`

- Componente: 

  - Menu: layout/menu.ts

- Uso de menu desde header: layout/header.ts


### Visual components

- core/components/

  - separator: core/components/separator.ts
  - logo-coders: core/components/logo-coders.ts
  - user: core/components/user.ts
  - card: core/components/card.ts

Uso de los 3 primeros en el header y del card en la página not found.


### Resultado: Laboratorio Angular 22 - Creación y estructuración de una aplicación 

- Proyecto con el CLI. Linter. (Environments)
- (Servidor proxy para el backend)
- Estilos globales
- App. Reubicación en el Core. Scaffolding
- Imágenes en public: favicon, (logo.png)
- Componentes. State y signals
- Layout: Header, Footer, PageNotFound. Uso de barrels
- Features (Pages): Home, Demos 
- Rutas básicas y navegación en una MPA
- Componente Menu. @for
- Mejorando el aspecto: Visual components en el core: separator, logo-coders, user, card


Los elementos () no se han incorporado en nuestro ejemplo.

## Signals

En el componente demos se añade un ejemplo del uso de signals en un contador de clicks. Se añade un botón para incrementar el contador y se muestra el valor del contador en la plantilla.

Se incluye un ejemplo asíncrono, que solo funcionará si se usn signals.


## Taller 2. Laboratorio Angular 22 - Sistema de Notificaciones

### ⚙️Servicio: Logger

```shell
ng g s core/services/logger --project proof-02-icono
```

Definimos un tipo con los posibles niveles de error. Por claridad didactica lo podemos incluir en el servicio, pero lo recomendable es definirlo en un archivo aparte.

```ts
type ValidErrorLevel = 0 | 1 | 2 | 3 | 4

// Una alternativa es usar un enum, 
// enum ErrorLevel {
//   NONE = 0, // 0: No se muestran errores
//   ERROR = 1, // 1: Se muestran errores
//   WARN = 2, // 2: Se muestran errores y advertencias
//   INFO = 3, // 3: Se muestran errores, advertencias e información
//   LOG = 4 // 4: Se muestran errores, advertencias, información y logs
// }
```

Se crea el **servicio** y un **token de inyección** para poder pasarle un parámetro que defina el nivel de log.

```ts
import { Service, InjectionToken, inject } from '@angular/core';

export const ERROR_LEVEL = new InjectionToken<ValidErrorLevel>('ERROR_LEVEL')

@Service()
export class Logger {
  readonly #nivel: ValidErrorLevel = inject(ERROR_LEVEL, { optional: true }) ?? 4

  // constructor(@Optional() @Inject(ERROR_LEVEL) nivel?: ValidErrorLevel) {
  //   this.#nivel = nivel ?? 4
  // }
}
```

En Angular moderno utilizamos la función `inject()` para inyectar dependencias en lugar de usar el constructor. En cualquier caso, nos permite definir valores por defecto y hacer que la inyección sea opcional.

Los métodos del servicio `Logger` son simplemente wrappers de `console`,  que implementan de la siguiente manera:

```ts

  get nivel(): ValidErrorLevel {
    return this.#nivel
  }

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
```

#### Uso del servicio `Logger` en un componente

Creamos el componente `features/demos/logger-demo`

```shell
ng g c features/demos/components/logger-demo --project proof-02-icono
```


En el componente inyectamos el servicio `Logger`, definiendo el valor que será inyectado a partir del token de inyección.

```ts
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
})
export class LoggerDemo {
  readonly logger = inject(Logger);
  readonly errorLevel = ERROR_LEVEL_VALUE;
}
```

AL hacer que el provider del servicio sea el componente, se utilizará como parámetro del servicio el valor provisto a este mismo nivel para el token de inyección.

El templete es solo un ejemplo para comprobar el funcionamiento del servicio `Logger` y los niveles de log.

```html
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
```

## Feature Notifications

### Entidad (Model) Notification

La entidad `Notification` es un objeto que representa una notificación en el sistema. Contiene un id, un mensaje y un tipo de notificación (error, advertencia, información o éxito). 

Las tres propiedades son privadas y se acceden mediante getters. El constructor recibe los valores de las propiedades y los asigna a las mismas.

Deberíamos crearlo en un archivo aparte (`core/models/notification.model.ts`), pero para simplificar el ejemplo lo incluimos en el mismo archivo del servicio.

```ts

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
```

### Interface NotificationServiceType

Podemos incluir previamente un interface que defina el API que expondrá nuestro servicio, para que sea más fácil de mantener y testar.

```ts
interface NotificationServiceType {
  notificationsList: Signal<Notification[]>;
  addNotification(message: string, type?: NotificationType): void;
  remove(index: number): void;
  removeById(id: number): void;
  clear(): void;
}
```

Podemos ver que se expone el estado como una versión solo lectura de signal() y los métodos para añadir, eliminar y limpiar las notificaciones.

### ⚙️Servicio NotificationService

Servicio **stateful** responsable de las notificaciones en el sistema.

```shell
ng g s core/services/notifications --project proof-02-icono    
```

Se utiliza la nueva directiva **@Service**, incorporada en Angular 22, que permite definir un servicio sin necesidad de usar el decorador **@Injectable** y sin necesidad de definir un provider en el módulo.

```ts
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
```

Para usar el servicio `NotificationService` en un componente, simplemente lo inyectamos y usamos sus métodos y propiedades.

El servicio actuara como ViewModel (VM), y el componente como View, siguiendo el patrón MVVM.

Como buena práctica, el servicio se inyecta como propiedad privada y se define un getter para poder acceder a los datos en el template

```ts
@Component({
  :
  imports: [I18nSelectPipe],
  :
})
export class Notification {
  readonly #notificationService = inject(NotificationService);

  get ns() {
    return this.notificationService;
  }
}
```

En el template, podemos usar la propiedad `ns.notificationsList` para mostrar las notificaciones y los métodos del servicio para añadir, eliminar y limpiar las notificaciones.

```html
<button (click)="ns.addNotification('Mensaje de error', 'error')">Add Error</button>
@if (ns.hasNotifications()) {
  @for (let notification of ns.notificationsList(); track index) {

      <div [class]="notification.type">
        {{ notification.message }}
        <button (click)="ns.remove(i)">X</button>
      </div>
    </div>
    <button (click)="ns.clear()">Clear All</button>
  }
} @else {
  <p>No notifications</p>
}
```

Podemos añadir el componente com parte del layout, antes de `<router-outlet />`, para que se muestre en todas las páginas de la aplicación.

```html
<app-header />
<div class="container-fluid">
  <main class="p-2">
    <app-notifications />
    <router-outlet />
  </main>
</div>
<app-footer />
```

### Opciones

- sustituir el componente por otro que funcione como modal
- sustituir el servicio por otro basado en RxJs, que utilica un `BehaviorSubject` para mantener el estado de las notificaciones y exponerlo como un observable. Esto permite a los componentes suscribirse a los cambios en la lista de notificaciones y reaccionar en consecuencia.

## Otros servicios

- `NavigationService`: para navegar entre las distintas vistas de la aplicación.
- `AuthService`: para gestionar la autenticación y autorización de los usuarios.

## Sistema de contactos

Añadimos los componentes que formarán parte de la feature, y que se usarán para mostrar la lista de contactos, añadir un nuevo contacto, editar un contacto existente y ver los detalles de un contacto.

```shell
ng g c features/contacts/pages/contacts-list --project proof-02-icono
ng g c features/contacts/pages/contacts-add --project proof-02-icono
ng g c features/contacts/pages/contacts-edit --project proof-02-icono
ng g c features/contacts/pages/contacts-view --project proof-02-icono
```

Con esto habremos creado la carpeta para la feature `contacts` y los componentes que formarán parte de la misma.

En la feature `contacts` añadimos un fichero con sus propias rutas, `contacts.routes.ts`, que se importará en el módulo principal de la aplicación.

```ts
import { Routes } from "@angular/router";
import { ContactsAdd } from "../contacts/pages/contacts-add/contacts-add";
import { ContactsEdit } from "../contacts/pages/contacts-edit/contacts-edit";
import { ContactsList } from "../contacts/pages/contacts-list/contacts-list";
import { ContactsView } from "../contacts/pages/contacts-view/contacts-view";

export const contactsRoutes: Routes = [

    { path: '', component: ContactsList },
    { path: 'add', component: ContactsAdd },
    { path: ':id/edit', component: ContactsEdit },
    { path: ':id', component: ContactsView },
]
```

Añadimos las ruta  en `app.routes.ts` y comprobamos que funciona la principal, a la que accedemos como opción del menú.

```ts
export const routes: Routes = [
  //...
  {
    path: 'contacts',
    children: contactsRoutes,
  },
  //..
}
```

Esto nos indica que tendremos
- la página inicial de la feature `ContactsComponent`, que mostrará la lista de contactos y un botón para añadir un nuevo contacto
- la página para añadir un nuevo contacto `ContactosAdd`, que mostrará un formulario para introducir los datos del contacto
- la página para editar un contacto existente `ContactosEdit`, que mostrará un formulario con los datos del contacto a editar, reutilizando el mismo componente que el de añadir, pero con los datos del contacto a editar
- la página para ver los detalles de un contacto `ContactosView`, que mostrará los datos del contacto seleccionado, sin posibilidad de editarlos

### Entidad

Creamos la entidad `Contact` en un archivo aparte (`core/models/contact.model.ts`), que representa un contacto en el sistema. Existen dos opciones para definir la entidad: como clase o como interface. En este caso, se define un interface, ya que no necesitamos métodos ni lógica adicional. 

```ts
export interface Contact {
  [index: string]: any;
  id?: number;
  treatment?: string
  name: string;
  surname?: string
  email?: string;
  phone?: string;
  gender?: string
  birth?: string
  avatar?: string
  isConflictive?: boolean
  icon?: string
}
```

Definimos también una constante `DEFAULT_CONTACT` con los valores por defecto para un contacto, que se puede usar para inicializar un formulario o crear un nuevo contacto.

```ts
export const DEFAULT_CONTACT: Contact = {
  id: 0,
  // treatment: 'Sr.',
  name: '',
  // surname: '',
  // phone: '',
  // email: '',
  gender: 'M',
  // birth: '',
  // avatar: '',
  isConflictive: false,
  // icon: '',
}
```

### Environments

Si aun no lo hemos hecho, necesitamos definir los distintos entornos de ejecución (desarrollo, producción, etc.) con sus archivos de environments (`environment.ts` y `environment.prod.ts`) para poder definir la URL del backend y otros parámetros de configuración. 

```
ng g environments --project proof-02-icono
```

De momento necesitamos definir la URL del backend en el environment de producción, para poder usarla en el servicio repository.

```ts environment.prod.ts
{
  API_URL: 'http://localhost:3000/api',
}
```

### Servicios

En esta feature añadiremos un par de servicios: 

- el **servicio repository** o DAO (Data Access Object) que centralizará el acceso a los datos en el servidor, así como su persistencia, 
- y un **store** (servicio ViewModel) que gestionará el estado y la lógica de presentación.

#### Repositorio o DAO. Clase abstracta

Para el repositorio, creamos inicialmente una clase abstracta que defina la interfaz de acceso a los datos, que añadiremos en `core/classes/repository.ts`. Al ser una clase abstracta no es un servicio instanciable, y no es necesario crearlo con el CLI de Angular.

En la clase abstracta definimos 

- la propiedad correspondiente a la URL base del backend, que leemos delos `environment` de Angular
- la propiedad donde inyectamos el servicio `HttpClient` de Angular para poder realizar las peticiones HTTP
- los métodos que debe implementar el repositorio, usando genéricos para poder reutilizarlo con distintas entidades

Para hacer más flexible la conexión al backend, como parámetro podemos recibir una url alternativa o una modificación de la url base, que se añadirá a aquella para formar la url completa de la entidad.

```ts repository.ts
export abstract class Repository<T extends { id: K }, K> {
  protected readonly baseUrl = environment.API_URL;
  protected http = inject(HttpClient);

  constructor(
    entidad: string,
  ) {
    if (entidad.toLocaleLowerCase().startsWith('http')) this.baseUrl = entidad;
    else this.baseUrl += entidad;
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl);
  }

  getById(id: K): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${id}`);
  }

  query(extras = {}): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl, extras);
  }

  // add
  create(item: T): Observable<T> {
    return this.http.post<T>(this.baseUrl, item);
  }
  //change
  update(id: K, item: T): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${id}`, item);
  }
  //remove
  // Alñternativa: delete(id: number, id: K, extras = {}): Observable<void>
  delete(id: K): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${id}`);
  }
}
```

Los métodos  create y update reciben un objeto de tipo T, que representa la entidad a crear o actualizar, y devuelven un `Observable` de la entidad creada o actualizada. Como en la entidad el id es opcional, no se necesita definir un DTO (Data Transfer Object) aparte para la creación de un nuevo objeto, ya que el backend puede generar un id automáticamente al crear un nuevo objeto, que seguirá siendo del tipo T.

Todos los métodos devuelven un `Observable` de la entidad o de un array de entidades, para poder suscribirse a los cambios y reaccionar en consecuencia.

Esto sugiere que los posibles errores de la petición HTTP se gestionen en el componente que llama al repositorio, o bien en un servicio intermedio que haga de fachada y gestione los errores.

Podemos refinar el repository abstracto para hacerlo mas flexible al permitir pasar parámetros adicionales a las peticiones HTTP, como headers, params, etc. Estas opciones extra pueden tener dos orígenes:

- la propia clase repository, en la que añadimos una propiedad `options` que puede recibir un valor en el constructor
- cada uno de los métodos del repository, que puede recibir un parámetro opcional `extras`

La combinación de ambos, convertida en un nuevo objeto `options` se pasará al método correspondiente del servicio `HttpClient`.


```ts repository.ts
export abstract class RepositoryPro<T, K> {
  protected readonly baseUrl = environment.API_URL;
  protected http = inject(HttpClient);
  protected option;

  constructor(entidad: string, option = {}) {
    this.option = option;
    if (entidad.toLocaleLowerCase().startsWith('http')) {
      this.baseUrl = entidad;
    } else {
      this.baseUrl += entidad;
    }
  }

  getAll(extras = {}): Observable<T[]> {
    const options = Object.assign({}, this.option, extras);
    return this.http.get<T[]>(this.baseUrl, options);
  }

  getById(id: K, extras = {}): Observable<T> {
    const options = Object.assign({}, this.option, extras);
    return this.http.get<T>(`${this.baseUrl}/${id}`, options);
  }

  query(extras = {}): Observable<T[]> {
    const options = Object.assign({}, this.option, extras);
    return this.http.get<T[]>(this.baseUrl, options);
  }

  // add
  create(item: T, extras = {}): Observable<T> {
    const options = Object.assign({}, this.option, extras);
    return this.http.post<T>(this.baseUrl, item, options);
  }
  //change
  update(id: K, item: T, extras = {}): Observable<T> {
    const options = Object.assign({}, this.option, extras);
    return this.http.put<T>(`${this.baseUrl}/${id}`, item, options);
  }
  //remove
  // Alñternativa: delete(id: number, id: K, extras = {}): Observable<void>
  delete(id: K, extras = {}): Observable<T> {
    const options = Object.assign({}, this.option, extras);
    return this.http.delete<T>(`${this.baseUrl}/${id}`, options);
  }
}
```

#### Servicio Repositorio de contactos

Añadimos un servicio concreto que extienda la clase abstracta de los repositorios. Esto nos permite cambiar la implementación del repositorio sin afectar al resto de la aplicación.

```shell
ng g s features/contacts/services/contact-api-repository --project proof-02-icono
```

La sola creación de la clase nos permite concretar los tipos genéricos para poder usar el repositorio con la entidad `Contact` y su id de tipo `number`.

```ts contact-api-repository.ts
const URL_CONTACTS = 'contactos';

@Service()
export class ContactApiRepository extends Repository<Contact, number> {
  constructor() {
    super(URL_CONTACTS);
  }
}
```

Además podríamos sobre-escribir (override) los métodos de la clase abstracta para añadir lógica adicional, como por ejemplo la gestión de errores, el logging, etc.

Igualmente podemos añadir métodos adicionales que no estén definidos en la clase abstracta, como por ejemplo un método para paginar los resultados.

```ts contact-api-repository.ts
type PageResult = { page: number; pages: number; rows: number; list: Contact[] };

@Service()
export class ContactApiRepository extends Repository<Contact, number> {
  // ...
  page(page: number, rows: number = 20, sort?: string): Observable<PageResult> {
    let url = `${this.baseUrl}?_page=${page}&_rows=${rows}`;
    url = sort ? `${url}&_sort=${sort}` : url;
    return this.http.get<any>(url).pipe(
      map((data) => ({
        page: data.number,
        pages: data.totalPages,
        rows: data.totalElements,
        list: data.content,
      })),
    );
  }
}
```

#### Store (ViewModel)

Añadimos un servicio ...

```shell
# ng g s features/contacts/services/view-model --project proof-02-icono
ng g s features/contacts/services/store --project proof-02-icono
```

La clase necesita los siguientes atributos:

- bindings
  - Un modo (`modoCRUD`) para saber el estado de la operación.
  - Una colección con el listado de los elementos (`contactsList`) que se están visualizando.
  - Una referencia al elemento que se está visualizando o editando.
- Una cache del identificador del elemento que originalmente se solicitó (`idOriginal`) para su edición.
- Una referencia a la ruta principal del dominio (`listURL`).

```ts
export type ModoCRUD = 'list' | 'add' | 'edit' | 'view' | 'delete';

@Service()
export class Store {
  readonly #repo = inject(ContactApiRepository);
  readonly #notify = inject(NotificationService);
  readonly #logger = inject(LoggerService);
  readonly #navigation = inject(NavigationService);
  readonly #router = inject(Router);
  readonly #auth = inject(AuthService);

  readonly #contactsList = signal<Contact[]>([]);
  readonly #currentContact = signal<Contact>({ ...init_value });

  public contactsList = this.#contactsList.asReadonly();
  public currentContact = this.#currentContact.asReadonly();

  protected readonly modoCRUD = signal<ModoCRUD>('list');
  protected readonly idOriginal?: number;
  protected readonly listURL = '/contactos';
  protected readonly Today = new Date().toISOString().substring(0, 10);
  
  // readonly #page = signal<number>(1);
  // readonly #rows = signal<number>(20);
  // readonly #pages = signal<number>(1);
  // readonly #totalRows = signal<number>(0);
```

Inyección de dependencias:

- `ContactApiRepository`: para acceder a los datos de los contactos en el backend.
- `NotificationService`: para mostrar notificaciones al usuario.
- `LoggerService`: para registrar eventos y errores en la consola.
- `Router`: para manejar la navegación y las rutas de la aplicación.

Y los que se añadieron previamente (aun sin hacer).

- `NavigationService`: para navegar entre las distintas vistas de la aplicación.
- `AuthService`: para gestionar la autenticación y autorización de los usuarios.


Los comandos (métodos) del servicio serán los que se encarguen de
- gestionar el estado de la aplicación
- interactuar con el repositorio para realizar las operaciones CRUD (Create, Read, Update, Delete) sobre los contactos
- responder a la navegación entre las distintas páginas de la feature

- `list()`: para obtener la lista de contactos desde el repo y actualizar el estado de la aplicación.
- `add()`: para activar el modo añadir antes de navegar a la página de añadir un nuevo contacto.
- `edit()`: para obtener un contacto existente desde el repo y activar el modo de edición antes de navegar a la página de edición.
- `view()`: para obtener un contacto existente desde el repo y activar el modo de visualización antes de navegar a la página de visualización.
- `delete()`: para eliminar un contacto existente en repo y actualizar el estado de la aplicación.
- `clear()`: para limpiar el estado de la aplicación y volver al estado inicial.
- `cancel()`: para cancelar la operación actual navegando a la feature.
- `send()`: para concluir las operaciones de añadir, editar o ver detalles, que dependen de una segunda página; en los dos primeros casos, enviando al backend los datos del contacto añadido o editado. Después  actualizar el estado de la aplicación.
