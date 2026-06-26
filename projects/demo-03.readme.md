# Proyecto demo-03

- [Proyecto demo-03](#proyecto-demo-03)
  - [Creación del proyecto](#creación-del-proyecto)
  - [Router](#router)
    - [Routes](#routes)
    - [Renderizado de las páginas en App](#renderizado-de-las-páginas-en-app)
    - [Actualización del menu](#actualización-del-menu)
  - [Feature Auth](#feature-auth)
    - [Páginas (opción 1)](#páginas-opción-1)
    - [Páginas (opción 2)](#páginas-opción-2)
    - [Link al login](#link-al-login)
    - [Rutas con parámetros: uso de Observables](#rutas-con-parámetros-uso-de-observables)
      - [Acceso a los parámetros desde LoginPage](#acceso-a-los-parámetros-desde-loginpage)
    - [Rutas con parámetros: signals](#rutas-con-parámetros-signals)
      - [Acceso a los parámetros desde LoginPage y RegisterPage usando signals](#acceso-a-los-parámetros-desde-loginpage-y-registerpage-usando-signals)
    - [Componentes](#componentes)
      - [🧿Sidebar en el core](#sidebar-en-el-core)
      - [Uso del sidebar en la página de login](#uso-del-sidebar-en-la-página-de-login)
      - [Uso del sidebar en la página de register](#uso-del-sidebar-en-la-página-de-register)
  - [Forms](#forms)
    - [🧿LoginFormTdf: Template-driven Form](#loginformtdf-template-driven-form)
      - [NgForm](#ngform)
      - [Controles del formulario y ngModel](#controles-del-formulario-y-ngmodel)
      - [Valor del formulario](#valor-del-formulario)
      - [Validación y feedback](#validación-y-feedback)
      - [Submit y Navegación](#submit-y-navegación)
      - [Resultado final](#resultado-final)
    - [🧿LoginFormMdfRx: Model-driven Form (Rx)](#loginformmdfrx-model-driven-form-rx)
      - [Lógica en el componente](#lógica-en-el-componente)
      - [Vinculación al template](#vinculación-al-template)
      - [Valor del formulario](#valor-del-formulario-1)
      - [Validación y feedback](#validación-y-feedback-1)
      - [Submit y Navegación](#submit-y-navegación-1)
      - [Resultado final](#resultado-final-1)
  - [Signals Forms](#signals-forms)
    - [Conceptos básicos](#conceptos-básicos)
    - [🧿SignalsForm: Signal-based Form](#signalsform-signal-based-form)
      - [Lógica en el componente](#lógica-en-el-componente-1)
      - [Vinculación al template](#vinculación-al-template-1)
      - [Valor del formulario](#valor-del-formulario-2)
      - [Validación y feedback](#validación-y-feedback-2)
      - [Submit y Navegación](#submit-y-navegación-2)
      - [Resultado final](#resultado-final-2)
    - [🧿RegisterForm basado en signals](#registerform-basado-en-signals)
      - [Controles de selección](#controles-de-selección)
      - [Lógica en el componente](#lógica-en-el-componente-2)
      - [Vinculación al template](#vinculación-al-template-2)
      - [Valor del formulario](#valor-del-formulario-3)
      - [Vinculación al template: problemas con objetos](#vinculación-al-template-problemas-con-objetos)
      - [Validación y feedback](#validación-y-feedback-3)
      - [Validaciones dependientes de otros campos](#validaciones-dependientes-de-otros-campos)
      - [Submit y Navegación](#submit-y-navegación-3)
      - [Resultado final](#resultado-final-3)
    - [Custom Controls](#custom-controls)
      - [🧿Custom CheckBox-Free](#custom-checkbox-free)
        - [Uso desde el formulario](#uso-desde-el-formulario)
      - [Signal model()](#signal-model)
      - [🧿Custom CheckBox (dependiendo de FieldState)](#custom-checkbox-dependiendo-de-fieldstate)
      - [🧿Custom Input](#custom-input)
      - [🧿Custom RadioButtons](#custom-radiobuttons)
      - [🧿Custom Select](#custom-select)
    - [Mejoras en los custom controls](#mejoras-en-los-custom-controls)
      - [🧿Directiva NativeAttrs](#directiva-nativeattrs)


## Creación del proyecto

Creamos el proyecto seleccionando las opciones

- estilo CSS (`--style css`)
- sin SSR (`--ssr false`)
- prefijo de selector (`p alc`)
- template inline (`-t`)
- estilos inline (`-s`)  

```shell
ng g app demo-03 --style css --ssr false -p alc -t -s 
```

- Copiamos desde demo-02 la carpeta `src` completa y la carpeta `public/assets`
- Actualizamos en `index.html` el título de la página: \<title>Demo03</title>
- Eliminamos los ficheros "extra en los componentes (versiones initial...)
- Cambiamos en header `search-ref` por `search` y eliminamos el primero
- Eliminamos `course-item-signals` y su referencia en `course-list` 
- Hacemos in-line template y styles de `course-item` (*)
- corregimos los tsconfig: `"rootDir": "./",`

(*) Pendiente de iterar para los stats del curso, que se hará más adelante

## Router

### Routes

En el fichero de rutas de Angular creamos las rutas de las páginas que ya tenemos:

- home
- courses
- dashboard
- about (Angular)


```ts
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    title: 'Home | Demo 03',
    data: {
      label: 'Inicio',
    },
    loadComponent: () => import('./features/home/home-page'),
  },
  {
    path: 'courses',
    title: 'Cursos | Demo 03',
    data: {
      label: 'Cursos',
    },
    children: [
      {
        path: '',
        loadComponent: () => import('./features/courses/courses-page'),
      },
    ],
  },
  {
    path: 'dashboard',
    title: 'Dashboard | Demo 03',
    data: {
      label: 'Dashboard',
    },
    loadComponent: () => import('./features/dashboard/dashboard-page'),
  },
  {
    path: 'about',
    title: 'About | Demo 03',
    data: {
      label: 'Angular (about)',
    },
    loadComponent: () => import('./features/about/about-page'),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
```

En el caso de los cursos, vemos como la misma ruta que a las otras páginas puede definirse como una ruta anidada, lo que permitirá luego una incorporación de las rutas relacionadas con ese path de forma más organizada

- la propiedad path define la ruta que se mostrará en el navegador
- la propiedad loadComponent define el componente que se cargará de forma perezosa (lazy loading) cuando se acceda a esa ruta. Tener estos componentes exportados `default` permite que Angular los cargue de forma más eficiente, ya que no necesita conocer el nombre del componente para importarlo.
- la propiedad title permite definir el título que mostrara el navegador en cada ruta
- la propiedad data permite definir información adicional que puede ser utilizada en la aplicación, en este caso para mostrar un label en el menú de navegación

- la primera ruta es la ruta por defecto, que redirige a la ruta home
- la última ruta es la ruta comodín, que redirige a la ruta home en caso de que no se encuentre ninguna ruta definida

Al final del fichero de rutas, añadimos una función que nos permite obtener las rutas que queremos mostrar en el menú de navegación, filtrando aquellas que no tienen un label definido en su data.

```ts
export const getRoutes = (): MenuOption[] => {
  return [
    ...routes
      .filter((route) => route.data?.['label'] && route.path)
      .map((route) => ({
        label: route.data?.['label'] as string,
        path: route.path as string,
      })),
  ];
};
```

### Renderizado de las páginas en App

Eliminamos todas las referencias a las páginas que incluía APP, dejando sólo el layout común a todas las páginas y el `router-outlet`, que es el encargado de renderizar las páginas según la ruta que se esté mostrando en el navegador.

```html
<alc-header [title]="title()" [subtitle]="subtitle()">
  <alc-logo-coders slot="logo" />
  <alc-menu slot="menu" [options]="menuOptions()" />
  <alc-menu slot="menu-vertical" [isVertical]="true" [options]="menuOptions()" />
</alc-header>
<main class="container">
  <router-outlet />
</main>
<alc-footer />
```

### Actualización del menu

En los enlaces del menú, eliminamos el atributo `href` y añadimos la directiva `routerLink`, que nos permite navegar entre las páginas de la app sin recargar la página completa, manteniendo el estado de la app y mejorando la experiencia de usuario.

```html
  <a [routerLink]="option.path" [routerLinkActive]="'active'">
    {{ option.label }}
  </a>
```

La segunda directiva utilizada, `routerLinkActive`, nos permite añadir una clase CSS al enlace cuando la ruta asociada está activa, lo que nos permite aplicar estilos diferentes a los enlaces activos.

Para ello es necesario que exista la clase css indicada, en este caso`active`, en el componente menu, que ya hemos definido en el fichero de estilos del componente.

```css
.active {
  display: inline-block;
  color: var(--color-primary-hot);
  border-bottom: 2px solid var(--color-primary-hot);
  transform: scale(1.1);
  transition: all 0.3s ease-in-out;
}
```

## Feature Auth

### Páginas (opción 1)

Creamos dentro de la feature 2 paginas alternativas de login y registro, que se renderizan en el mismo layout que las demás páginas, con el <h2> habitual y los estilos compartido de las demás páginas.

```shell
ng g c features/auth/pages/login-page --flat --project demo-03
ng g c features/auth/pages/register-page --flat --project demo-03
```

- Su única función es permitir la carga de los correspondientes componentes login y register
- Se crean como `pages` porque van a cargarse desde el router, y no como componentes que se renderizan dentro de otras páginas
- En consecuencia se exportan como `default` para que puedan cargarse de forma perezosa (lazy loading) desde el router
- No se crean en la raíz de la feature, `features/auth`, sino en la carpeta `pages` dentro de la feature, por su carácter de páginas anidadas
- No existe una página global a la feature, por lo que nuestras páginas se renderizan bajo el router-outlet de la app, y no bajo un router-outlet de la feature. 

En el router recogemos estas páginas como rutas hijas de la ruta `auth`, que no tiene componente asociado, y que nos permite agrupar las rutas de login y registro bajo un mismo path.

```ts
{
  path: 'auth',
  children: [
    {
      path: 'login',
      loadComponent: () => import('./features/auth/pages/login-page'),
    },
    {
      path: 'register',
      loadComponent: () => import('./features/auth/pages/register-page'),
    },
  ],
},
```

### Páginas (opción 2)

Una alternativa sería que existiera una página global de la feature, que se renderizaría bajo el router-outlet de la app, y que a su vez tuviera un router-outlet propio para renderizar las páginas hijas de login y registro.

Añadiríamos esta página global de la feature

```shell
ng g c features/auth/pages/auth-page --flat
```

Y lo reflejaríamos en el router de la app, como componente de la ruta `auth`.

```ts
{
  path: 'auth',
  component: () => import('./features/auth/pages/auth-page'),
  children: [
    {
      path: 'login',
      loadComponent: () => import('./features/auth/pages/login-page'),
    },
    {
      path: 'register',
      loadComponent: () => import('./features/auth/pages/register-page'),
    },
  ],
},
```

### Link al login

En el componente `user`, que ya tenemos en el `header`, añadimos un enlace al login utilizando el **routerLink**, que nos permite acceder a la página de login desde cualquier página de la app.

```html
<a [routerLink]="['/auth', 'login']" id="menu-icon" >(Icono SVG)</a>
```

- para reutilizar el componente `menu`
  - eliminamos el tamaño de fuente en la clase `vertical`
  - añadimos una clase con el tamaño de fuente cuando lo usamos en `app` como menu para mobile 

```html
<alc-menu
  slot="menu-vertical"
  [isVertical]="true"
  class="vertical-menu"
  [options]="menuOptions()"
/>
```

### Rutas con parámetros: uso de Observables

- Definición en el router: tanto la ruta original como la que soporta parámetros navegan a la misma página, que se encargará de recoger el parámetro y renderizar el formulario correspondiente. 

Para el caso del login, el resultado sería el siguiente

```ts
  {
    path: 'login',
    title: 'Login | Demo 03',
    loadComponent: () => import('./features/auth/pages/login-page'),
  },
    {
    path: 'login/:formType',
    title: 'Login | Demo 03',
    loadComponent: () => import('./features/auth/pages/login-page'),
  },
```

Lo mismo dejaremos preparado en el caso del registro

```ts
  {
    path: 'register',
    title: 'Register | Demo 03',
    loadComponent: () => import('./features/auth/pages/register-page'),
  },
  {
    path: 'register/:formType',
    title: 'Register | Demo 03',
    loadComponent: () => import('./features/auth/pages/register-page'),
  }
```

#### Acceso a los parámetros desde LoginPage

El servicio ActivatedRoute nos permite acceder a los parámetros de la ruta, proporcionándonos un Observable al que podemos suscribirnos para recibir los cambios en los parámetros. Más adelante veremos con más profundidad el uso de los Observables de RxJs

Existe una propiedad `params.snapshot` que nos permite acceder a los parámetros de la ruta de forma síncrona, pero no nos permite recibir los cambios en los parámetros cuando la ruta cambia, por lo que en este caso no es útil.

El operador de observables `takeUntilDestroyed` nos permite cancelar la suscripción cuando el componente se destruye, evitando posibles fugas de memoria. 

```ts
type FormType = 'tdf' | 'mdf-rx' | 'signals';

export default class LoginPage {
  readonly #activatedRouter = inject(ActivatedRoute);
  readonly destroyRef = inject(DestroyRef);
  protected readonly formType = signal<FormType>('tdf');

  constructor() {
    this.#activatedRouter.params
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        this.formType.set(params['formType'] || 'tdf');
      });
  }
}
```

Otra alternativa sería usar el observable `paramMap`, que nos permite acceder a los parámetros de la ruta de forma similar.

```ts
constructor() {
    this.#activatedRouter.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((paramMap) => {
        this.formType.set(paramMap.get('formType') as FormType || 'tdf');
      });
  }
```

- Uso en la vista para renderizar distintos formularios según el parámetro de la ruta

```html
 @if (!formType() ||formType() === 'tdf') {
      <p>Ejemplo de Template Driven Form</p> 
      <alc-card>
        <p>Template Driven Form is not implemented yet.</p>
      </alc-card>
    } @else if (formType() === 'mdf-rx') {
      <p>Ejemplo de Model Driven Form (RxJs)</p>
      <alc-card>
        <!-- <alc-login-form /> -->
        <p>Model Driven Form (RxJs) is not implemented yet.</p>
      </alc-card>
    } @else if (formType() === 'signals') {
      <p>Ejemplo de Signals Form</p>
      <alc-card>
        <!-- <alc-login-form /> -->
        <p>Signals Form is not implemented yet.</p>
      </alc-card>
    }
}
```

Finalmente una aproximación más propia de RxJs y mucho más simple, sería no hacer privado el servicio y utilizar directamente el observable en la vista, utilizando el pipe `async` para suscribirnos al observable y obtener el valor del parámetro de la ruta.

```ts
export default class LoginPage {
  protected readonly #activatedRouter = inject(ActivatedRoute);

  // constructor() {}
}
``` 

```html
    @let formType = (activatedRouter.params | async)?.['formType'] || 'tdf'">

    @if (formType === 'tdf') {
      <alc-login-form-tdf />
    } @elseif (formType === 'mdf-rx') {
      <alc-login-form-mdf-rx />
    } @elseif (formType === 'signals') {
      <alc-login-form-signals />
    }
```

### Rutas con parámetros: signals

Las versions más recientes de Angular permiten el uso de signals para acceder a los parámetros de la ruta, lo que nos permite simplificar aún más el código y evitar el uso de observables y suscripciones.

Para ello es necesario configurar el provider `Router` con la opción `withComponentInputBinding()`, que nos permite acceder a los parámetros de la ruta desde cualquier componente de la aplicación, sin necesidad de pasar los parámetros como inputs.   

```ts angular.config.ts
providers: [provideRouter(appRoutes, withComponentInputBinding())];
```

#### Acceso a los parámetros desde LoginPage y RegisterPage usando signals

En el componente solo necesitamos definir el parámetro como un input, y Angular se encargará de inyectar el valor del parámetro de la ruta en el componente.

```ts
export default class LoginPage {
 protected readonly formType = input<FormType>();
}
```

De esta forma no necesitamos inyectar el servicio ActivatedRoute y evitamos toda interacción con los elementos de RxJS.

Lo mismo hacemos en el caso del componente RegisterPage, que también tiene un parámetro de ruta `formType` que nos permite renderizar distintos formularios de registro según el valor del parámetro.

```ts
export default class RegisterPage {
  protected readonly formType = input<FormType>();
}
```

### Componentes

Para mantener las páginas lo más simples posibles, implicadas únicamente en el proceso de navegación, creamos los componentes de login-form... y register-form, que se encargan de la lógica de negocio y de la presentación de los formularios.

Del primero de ellos haremos tres versiones, una basada en template-driven forms, otra en model-driven forms y otra en signals, para mostrar distintos ejemplos de formularios en Angular.

```shell
ng g c features/auth/components/login-form-tdf --project demo-03
ng g c features/auth/components/login-form-mdf-rx --project demo-03
ng g c features/auth/components/login-form-signals --project demo-03
ng g c features/auth/components/register-form --project demo-03
```

La página de login renderiza el componente login-form, junto con un enlace a la página de registro, y la página de registro renderiza el componente register-form.

Para mostrar distintos ejemplos de un mismo formulario, en la pagina de login tendremos un menú en un sidebar, por lo que vamos añadir en el core un componente `sidebar` que nos permita renderizar un menú lateral en cualquier página de la app.

```shell
ng g c core/components/sidebar --project demo-03
```
#### 🧿Sidebar en el core

- En loas componentes Header y Footer eliminamos los margenes, que eran innecesarios y ahora se hacen visibles al usar el sidebar

En el nuevo componente añadimos un input `isOpenFromParent` que nos permite definir el estado inicial del sidebar, abierto o cerrado, desde la página en la que nos encontremos.

No recibimos el valor, sino la signal, para poder modificar el estado del sidebar desde el componente padre, y que el componente hijo se entere de los cambios en el estado del sidebar.

```ts
export class SideBar {
  readonly isOpenFromParent = input<WritableSignal<boolean>>();
  protected readonly isOpen = computed(() => this.isOpenFromParent()?.() ?? false);
  protected readonly size = signal('3rem');

  protected toggle(): void {
    this.isOpenFromParent()?.set(!this.isOpen());
  }
}
```

- Utilizamos una signal computada `isOpen` para controlar el estado del sidebar, abierto o cerrado, que depende del input `isOpenFromParent` para definir el estado del sidebar, que puede ser abierto o cerrado según la página en la que nos encontremos.
- En el template del componente utilizamos `@if` para renderizar el contenido del sidebar sólo cuando está abierto, y un svg como icono para abrir o cerrar el sidebar.
- El método que responde al click en el icono de abrir/cerrar el sidebar, modifica el valor de la signal `isOpenFromParent`, que como hemos visto recibe como input la signal del componente padre. Esto a su vez modifica el valor de la signal computada `isOpen`, que nos permite renderizar el contenido del sidebar sólo cuando está abierto.

- La proyección de contenido se realiza mediante el uso de `ng-content`, lo que nos permite renderizar cualquier contenido dentro del sidebar, sin necesidad de definirlo en el componente. 

```html
    <div class="icons" (click)="toggle()">
      @if (isOpen()) {
        <svg
          id="close-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
          [attr.width]="size()"
          [attr.height]="size()"
          fill="currentColor"
        >
          <!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.-->
          <path
            d="M144 480C144 488.8 151.2 496 160 496L480 496C488.8 496 496 488.8 496 480L496 160C496 151.2 488.8 144 480 144L160 144C151.2 144 144 151.2 144 160L144 480zM160 544C124.7 544 96 515.3 96 480L96 160C96 124.7 124.7 96 160 96L480 96C515.3 96 544 124.7 544 160L544 480C544 515.3 515.3 544 480 544L160 544zM224 320C224 313.3 226.8 307 231.7 302.4L343.7 198.4C350.7 191.9 360.9 190.2 369.6 194C378.3 197.8 384 206.5 384 216L384 424C384 433.5 378.3 442.2 369.6 446C360.9 449.8 350.7 448.1 343.7 441.6L231.7 337.6C226.8 333.1 224 326.7 224 320z"
          />
        </svg>
      } @else {
        <svg
          id="open-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
          [attr.width]="size()"
          [attr.height]="size()"
          fill="currentColor"
        >
          <!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.-->
          <path
            d="M496 160C496 151.2 488.8 144 480 144L160 144C151.2 144 144 151.2 144 160L144 480C144 488.8 151.2 496 160 496L480 496C488.8 496 496 488.8 496 480L496 160zM480 96C515.3 96 544 124.7 544 160L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 160C96 124.7 124.7 96 160 96L480 96zM416 320C416 326.7 413.2 333 408.3 337.6L296.3 441.6C289.3 448.1 279.1 449.8 270.4 446C261.7 442.2 256 433.5 256 424L256 216C256 206.5 261.7 197.8 270.4 194C279.1 190.2 289.3 191.9 296.3 198.4L408.3 302.4C413.2 306.9 416 313.3 416 320z"
          />
        </svg>
      }
    </div>
    @if (isOpen()) {
      <div class="content">
        <ng-content />
      </div>
    }
```

La posición del sidebar es absoluta, por lo que se renderiza sobre el contenido de la página, y no desplaza el contenido de la página cuando se abre o se cierra.

```css
:host {
  background-color: var(--color-background-primary);
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: fit-content;
  height: 100%;
  &:has(#open-icon) {
    width: 50px;
  }
}
.icons {
  background-color: color-mix(in srgb, var(--color-primary) 10%, transparent);
  color: var(--color-primary);
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.content {
  padding-inline-start: 2rem;
  padding-inline-end: 3rem;
}
```

#### Uso del sidebar en la página de login

Usamos el sidebar en la página de login, para mostrar un menú lateral con los distintos tipos de formularios que podemos renderizar en esa página, utilizando el componente `alc-side-bar` y el componente `alc-menu` que también nos ha permitido crear el menu principal.

En el siguiente ejemplo aparece el acceso a los parameters basados en observables, pero sería lo mismo si actualizamos la página para que utilice signals para acceder a los parámetros de la ruta.

```ts
type FormType = 'tdf' | 'mdf-rx' | 'signals';

@Component({
  selector: 'alc-login-page',
  imports: [RouterLink, LoginFormTdf, LoginFormMdfRx, LoginFormSignals, Card, SideBar, Menu],
  template: `
    <alc-side-bar [isOpenFromParent]="isOpenSideBar" >
      <alc-menu class="side-bar-menu"[isVertical]="true" [options]="menuOptions()" />
    </alc-side-bar>
    ...
    `
})
export default class LoginPage {
  readonly #router = inject(Router);
  readonly destroyRef = inject(DestroyRef);
  protected readonly formType = input<FormType>();

  protected readonly isOpenSideBar = signal(false);
  protected readonly menuOptions = signal<MenuOption[]>([
    {
      label: 'Template Driven Form',
      path: '/auth/login/tdf',
    },
    {
      label: 'Model Driven Form (RxJs)',
      path: '/auth/login/mdf-rx',
    },
    {
      label: 'Signals Form',
      path: '/auth/login/signals',
    },
  ]);
}
```

- la signal `isOpenSideBar` nos permite controlar el estado del sidebar, abierto o cerrado, desde la página de login, y se pasa como input al componente `alc-side-bar` para que pueda modificar su estado.


Finalmente, como la proyección es un menu, añadimos un efecto que nos permite cerrar el sidebar cuando se navega a otra página. 

Como la navegación se realiza a través del router de Angular, que utiliza observables de RxJs, podemos suscribirnos a los eventos del router y cerrar el sidebar cuando se produce un evento de navegación. Aplicamos el mismo patrón que en el caso de los parámetros de la ruta, utilizando el operador `takeUntilDestroyed` para cancelar la suscripción cuando el componente se destruye.

```ts
export default class LoginPage  {
  readonly #router = inject(Router);
  readonly destroyRef = inject(DestroyRef);
  ...

  constructor() {
    this.#router.events
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.isOpenSideBar.set(false);
    }
  });
}
```

#### Uso del sidebar en la página de register

Seguiremos el mismo patrón en la página de registro, para mostrar un menú lateral con los distintos tipos de formularios que podemos renderizar en esa página, utilizando el componente `alc-side-bar` y el componente `alc-menu` que también nos ha permitido crear el menu principal.

En este caso las opciones serán dos:

- monolithic, que renderiza un formulario de registro completo, con todos los campos en una sola página
- custom-components, que renderiza un formulario de registro utilizando componentes personalizados para cada campo del formulario.

```html
@if (!formType() || formType() === 'monolithic') {
  <p>Ejemplo de registro en un solo componente</p>
  <alc-card>
    <alc-register-form />
  </alc-card>
} @else if (formType() === 'custom-components') {
  <p>Ejemplo de registro con componentes personalizados</p>
  <alc-card>
    <alc-register-form-customs />
  </alc-card>
}
```


El componente completo, usando signal para acceder a los parámetros quedaría como sigue

```ts
export class RegisterPage {
  readonly destroyRef = inject(DestroyRef);
  readonly #router = inject(Router);
  protected readonly formType = input<FormType>();
  protected readonly isOpenSideBar = signal(false);
  protected readonly menuOptions = signal<MenuOption[]>([
    {
      label: 'Monolithic Form',
      path: '/auth/register/monolithic',
    },
    {
      label: 'Custom Components',
      path: '/auth/register/custom-components',
    },
  ]);

  constructor() {
    this.#router.events.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isOpenSideBar.set(false);
      }
    });
  }
}
```

## Forms

Como hemos dicho, con LoginForm veremos ejemplos de los tres tipos de formularios que Angular nos permite crear:

- Template-driven forms: se definen en el template de la página, utilizando directivas de Angular para enlazar los campos del formulario con las propiedades del componente. Son más sencillos de implementar, pero menos flexibles y escalables.
- Reactive forms: se definen en el componente, utilizando la clase FormGroup y FormControl para crear un modelo de datos que representa el formulario. Son más flexibles y escalables, pero requieren más código y conocimientos de Angular.
- Signal forms: nuevos formularios basados en signals, también definidos en el componente


### 🧿LoginFormTdf: Template-driven Form

En el componente `login-form-tdf` definimos el formulario en el template del componente, utilizando directivas de Angular para enlazar los campos del formulario con las propiedades del componente.

#### NgForm

Al importar el módulo `FormsModule` en la feature, podemos utilizar las directivas `ngModel` y `ngForm` para enlazar los campos del formulario con las propiedades del componente.

- `ngForm` tiene como selector `form`, por lo que se aplica implícitamente al elemento `form` nativo de html. Sin embargo, podemos utilizar una referencia local para acceder al objeto de tipo `NgForm` creado por la directiva, que representa el formulario, y acceder a sus propiedades y métodos.

- en la etiqueta form utilizamos también la directiva `ngSubmit`, que nos permite ejecutar un método del componente cuando se envía el formulario, pasándole el objeto `NgForm` que hemos referenciado 

```ts
@Component({
  selector: 'alc-login-form-tdf',
  imports: [FormsModule, JsonPipe],
  template: `
    <form #loginForm="ngForm" (ngSubmit)="formSubmit(loginForm)">
      <button type="submit" class="btn btn-primary">
        Login
      </button>
      <pre>{{ loginForm.value | json }}</pre>
    </form>
    `
    })
    export class LoginFormTdf {

        protected formSubmit(loginForm: NgForm) {
          console.log('loginForm', loginForm);
          console.log('loginForm.value', loginForm.value);
        }
    }
}
```

Al mostrar este objeto en consola, vemos que incluye:

-  un objeto `form` de tipo `FormGroup`,  y muchas de sus propiedades expuestas en el propio NgForm
-  propiedades como `valid`, `invalid`, `pristine`, `dirty`, etc. que definen el estado del formulario
-  una propiedad `value` que contiene los valores de los campos del formulario
-  métodos como `resetForm()` que nos permite resetear el formulario a su estado inicial

```shell
_NgForm {_composedValidatorFn: undefined, _composedAsyncValidatorFn: undefined, _rawValidators: Array(0), _rawAsyncValidators: Array(0), _onDestroyCallbacks: Array(0), …}
callSetDisabledState: "always"
form: FormGroup {_pendingDirty: false, _hasOwnPendingAsyncValidator: null, _pendingTouched: false, _updateOn: undefined, _onCollectionChange: ƒ, …}
name: undefined
ngSubmit: EventEmitter_ {closed: false, currentObservers: null, observers: Array(0), isStopped: false, hasError: false, …}
options: undefined
submittedReactive: () => signalGetFn(node)
__ngContext__: 36
_composedAsyncValidatorFn: undefined
_composedValidatorFn: undefined
_directives: Set(0) {size: 0}
_onDestroyCallbacks: []
_rawAsyncValidators: []
_rawValidators: []
_submitted: () => {…}
asyncValidator: (...)
control: (...)
controls: Object
dirty: false
disabled: (...)
enabled: (...)
errors: null
formDirective: (...)
invalid: false
path: (...)
pending: false
pristine: true
status: "VALID"
statusChanges: (...)
submitted: (...)
touched: false
untouched: true
valid: true
validator: (...)
value: Object
valueChanges: (...)
```

#### Controles del formulario y ngModel

En cada uno de los controles del formulario, utilizamos la directiva `ngModel` para enlazar el valor del control con una propiedad del componente, y el atributo `name`, nativo de HTML, para definir el nombre del control dentro del formulario.

```html
  <label class="form-control" for="email">
    <span> Email </span>
    <input type="email" id="email" name="email" class="form-control" ngModel />
  </label>
```

Si se necesita un valor inicial distinto de la cadena vacía, se puede utilizar la propiedad `ngModel` para enlazar el valor del control con una propiedad del componente, y definir el valor inicial en el componente.

```html
   <label class="form-control checkbox" for="rememberMe">
    <input type="checkbox" id="rememberMe" name="rememberMe" [ngModel]="false" />
    <span>Remember me</span>
  </label>
```

#### Valor del formulario

Como herramienta en desarrollo, que luego eliminaremos, añadimos un \<pre> que nos permite ver el valor del formulario en tiempo real, utilizando el pipe `json` para mostrarlo en formato JSON.

```html
  <pre>{{ loginForm.value | json }}</pre>
```

#### Validación y feedback

Las validaciones se definen en el template del formulario, utilizando los atributos nativos de HTML5, como `required`, `minlength`, `maxlength`, `pattern`, `email`, etc.

Para mostrar el feedback de las validaciones, podemos utilizar las propiedades del objeto `NgForm` y de los controles del formulario, como `valid`, `invalid`, `pristine`, `dirty`, `touched`, `untouched`, etc.

```html
  @if (loginForm.controls['email']?.invalid && loginForm.controls['email']?.touched) {
    <div class="error">
      @if (loginForm.controls['email']?.hasError('required')) {
        <p>El correo electrónico es obligatorio.</p>
      }
      @if (loginForm.controls['email']?.hasError('email')) {
        <p>Por favor, introduce una dirección de correo electrónico válida.</p>
      }
    </div>
  }
```

Para evitar el envío de formularios inválidos, podemos deshabilitar el botón de envío cuando el formulario es inválido, utilizando la propiedad `invalid` del objeto `NgForm`.

```html
  <button type="submit" class="btn btn-primary" [disabled]="loginForm.invalid">
    Login
  </button>
```

Además puede añadirse una comprobación extra en el método que maneja el envío del formulario, para asegurarnos de que no se envía un formulario inválido.

```ts
  protected formSubmit(loginForm: NgForm) {
    if (loginForm.valid) {
      console.log('loginForm', loginForm);
      // Navigate to the home page after successful login
      console.log('Form submitted:', loginForm.value);
      loginForm.resetForm(); // Reset the form after submission
    } else {
      console.log('Form is invalid');
    }
  }
```

#### Submit y Navegación

El proceso de submit incluirá la llamada a un servicio, responsable del login de cara al backend, que aun no existe. De momento solo es un console log para mostrar los datos que se enviarían al backend, y un reset del formulario para dejarlo limpio para un nuevo intento de login.

Además, finalizado el login, se navega a la página de inicio, utilizando el servicio `Router` de Angular, que nos permite navegar entre las páginas de la app sin recargar la página completa.

```ts
  protected formSubmit(loginForm: NgForm) {
    if (loginForm.valid) {
      console.log('loginForm', loginForm);
      // Navigate to the home page after successful login
      console.log('Form submitted:', loginForm.value);
      loginForm.resetForm(); // Reset the form after submission
      this.router.navigate(['/']);
    } else {
      console.log('Form is invalid:', loginForm.value);
    }
  }
```

#### Resultado final

El resultado final del componente es el siguiente

```ts
import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'alc-login-form-tdf',
  imports: [FormsModule, JsonPipe],
  template: `
    <form #loginForm="ngForm" (ngSubmit)="formSubmit(loginForm)">
      <label class="form-control" for="email">
        <span> Email </span>
        <input type="email" id="email" name="email" ngModel email required />
      </label>
      @if (loginForm.controls['email']?.invalid && loginForm.controls['email']?.touched) {
        <div class="error">
          @if (loginForm.controls['email']?.hasError('required')) {
            <p>El correo electrónico es obligatorio.</p>
          }
          @if (loginForm.controls['email']?.hasError('email')) {
            <p>Por favor, introduce una dirección de correo electrónico válida.</p>
          }
        </div>
      }
      <label class="form-control" for="password">
        <span>Password</span>
        <input
          type="password"
          id="password"
          name="password"
          ngModel
          required minlength="6"
        />
      </label>
      @if (loginForm.controls['password']?.invalid && loginForm.controls['password']?.touched) {
        <div class="error">
          @if (loginForm.controls['password']?.hasError('required')) {
            <p>La contraseña es obligatoria.</p>
          }
          @if (loginForm.controls['password']?.hasError('minlength')) {
            <p>La contraseña debe tener al menos 6 caracteres.</p>
          }
        </div>
      }
      <label class="form-control checkbox" for="rememberMe">
        <input type="checkbox" id="rememberMe" name="rememberMe" [ngModel]="false" />
        <span>Remember me</span>
      </label>
      <div class="form-control">
        <button type="submit" class="btn btn-primary" [disabled]="!loginForm.form.valid">
          Login
        </button>
      </div>
    </form>
    <pre>{{ loginForm.value | json }}</pre>
  `,
  styles: `
    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 80vw;
      max-width: 400px;

      .form-control {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        &.checkbox {
          flex-direction: row;
          align-items: center;
        }
      }
    }

    input,
    textarea {
      padding: 0.5rem;
      font-size: 1rem;
      color: var(--color-primary-hot);
      background-color: var(--color-background-primary);
      border: none;
      border-block-end: 2px solid var(--color-primary);
      border-radius: 4px;

      &:focus-visible {
        outline: var(--color-primary) auto 1px;
        background-color: var(--color-background);
      }
    }

    button {
      padding: 0.5rem 1rem;
      font-size: 1rem;
      color: var(--color-background);
      background-color: var(--color-primary);
      border: none;
      border-radius: 4px;
      cursor: pointer;

      &:disabled {
        background-color: color-mix(in srgb, var(--color-primary) 30%, transparent);
        cursor: not-allowed;
      }
    }

    .error {
      color: var(--color-tertiary);
      font-size: 0.8rem;
    }
  `,
})
export class LoginFormTdf {

  readonly router = inject(Router);

  protected formSubmit(loginForm: NgForm) {
    if (loginForm.valid) {
      console.log('loginForm', loginForm);
      // Navigate to the home page after successful login
      console.log('Form submitted:', loginForm.value);
      loginForm.resetForm(); // Reset the form after submission
      this.router.navigate(['/']);
    } else {
      console.log('Form is invalid:', loginForm.value);
    }
  }
}
```

### 🧿LoginFormMdfRx: Model-driven Form (Rx)

#### Lógica en el componente

Los formularios reactivos (model-driven forms) se definen en el componente, utilizando la clase `FormGroup` y `FormControl` para crear un modelo de datos que representa el formulario.

Por lo general, estas clases no se utilizan directamente, sino mediante el servicio `FormBuilder`, que nos permite crear los formularios de forma más sencilla y con menos código.

```ts

interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

export class LoginFormMdfRx {

  readonly #fb = inject(FormBuilder);

  readonly loginForm: FormGroup = this.#fb.group({
    email: [''],
    password: [''],
    rememberMe: [false],
  });
}
```
- obtenemos on `FormGroup<any>` el objeto que representa el formulario, y que nos permite acceder a sus propiedades y métodos, como `value`, `valid`, `invalid`, `reset()`, etc.
- en el se incluyen los controles del formulario, que son objetos de tipo `FormControl`, y que nos permiten igualmente acceder a sus propiedades y métodos, como `value`, `valid`, `invalid`, `reset()`, etc.

#### Vinculación al template

En los imports incluimos el módulo `ReactiveFormsModule`, que nos permite utilizar las directivas `formGroup` y `formControlName` para enlazar el formulario con el template.

- en la etiqueta \<form> del template utilizamos la directiva `formGroup` para enlazar el formulario con el objeto `FormGroup` creado en el componente, 
- en cada uno de los controles utilizamos la directiva `formControlName` para enlazar cada control del formulario con su correspondiente `FormControl` utilizando siempre el valor definido en el FormGroup. (Podemos eliminar el atributo nativo `name` que ya no es necesario)

```html
  <form [formGroup]="loginForm" (ngSubmit)="formSubmit()">
    <label class="form-control" for="email">
      <span> Email </span>
      <input type="email" id="email" formControlName="email" />
    </label>
    ...
  </form>
```

#### Valor del formulario

De nuevo, como herramienta en desarrollo, que luego eliminaremos, añadimos un \<pre> que nos permite ver el valor del formulario en tiempo real, utilizando el pipe `json` para mostrarlo en formato JSON.

```html
  <pre>{{ loginForm.value | json }}</pre>
```

#### Validación y feedback

Las validaciones ya NO se definen en el template del formulario, sino en el componente, utilizando los validadores de Angular, como `Validators.required`, `Validators.minLength`, `Validators.maxLength`, `Validators.pattern`, etc. equivalentes a los atributos nativos de HTML5, como `required`, `minlength`, `maxlength`, `pattern`, etc.

```ts
export class LoginFormMdfRx {
  readonly #fb = inject(FormBuilder);

  readonly loginForm: FormGroup = this.#fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rememberMe: [false],
  });
}
```

Para mostrar el feedback de las validaciones, podemos utilizar las propiedades del objeto `FormGroup` y de los controles del formulario, como `valid`, `invalid`, `pristine`, `dirty`, `touched`, `untouched`, etc. Es el mismo mecanismo que utilizábamos en los template-driven forms

```html
  @if (loginForm.controls['email']?.invalid && loginForm.controls['email']?.touched) {
    <div class="error">
      @if (loginForm.controls['email']?.hasError('required')) {
        <p>El correo electrónico es obligatorio.</p>
      }
      @if (loginForm.controls['email']?.hasError('email')) {
        <p>Por favor, introduce una dirección de correo electrónico válida.</p>
      }
    </div>
  }
```

Para evitar el envío de formularios inválidos, podemos deshabilitar el botón de envío cuando el formulario es inválido, utilizando la propiedad `invalid` del objeto `NgForm`.

```html
  <button type="submit" class="btn btn-primary" [disabled]="loginForm.invalid">
    Login
  </button>
```

Además puede añadirse una comprobación extra en el método que maneja el envío del formulario, para asegurarnos de que no se envía un formulario inválido.

```ts
  protected formSubmit(loginForm: NgForm) {
    if (loginForm.valid) {
      console.log('loginForm', loginForm);
      // Navigate to the home page after successful login
      console.log('Form submitted:', loginForm.value);
      loginForm.reset(); // Reset the form after submission
    } else {
      console.log('Form is invalid');
    }
  }
```

#### Submit y Navegación

El proceso de submit incluirá la llamada a un servicio, responsable del login de cara al backend, que aun no existe. De momento solo es un console log para mostrar los datos que se enviarían al backend, y un reset del formulario (ahora con el método `reset()` del FormGroup) para dejarlo limpio para un nuevo intento de login.

Además, finalizado el login, se navega a la página de inicio, utilizando el servicio `Router` de Angular, que nos permite navegar entre las páginas de la app sin recargar la página completa.

```ts
protected formSubmit() {
    if (this.loginForm.valid) {
      console.log('loginForm', this.loginForm);
      // Navigate to the home page after successful login
      const formData: LoginForm = this.loginForm.value;
      console.log('Form submitted:', formData);
      this.loginForm.reset(); // Reset the form after submission
      this.#router.navigate(['/']);
    } else {
      console.log('Form is invalid');
    }
  }
```

En la creación de formData, para adecuarlo al interface LoginForm, podríamos añadir las transformaciones y validaciones que fueran necesarias.

#### Resultado final

El resultado final del componente es el siguiente

```ts
import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

@Component({
  selector: 'alc-login-form-mdf-rx',
  imports: [ReactiveFormsModule, JsonPipe],
  template: `
    <form [formGroup]="loginForm" (ngSubmit)="formSubmit()">
      <label class="form-control" for="email">
        <span> Email </span>
        <input type="email" id="email" formControlName="email" />
      </label>
      @if (loginForm.controls['email']?.invalid && loginForm.controls['email']?.touched) {
        <div class="error">
          @if (loginForm.controls['email']?.hasError('required')) {
            <p>El correo electrónico es obligatorio.</p>
          }
          @if (loginForm.controls['email']?.hasError('email')) {
            <p>Por favor, introduce una dirección de correo electrónico válida.</p>
          }
        </div>
      }
      <label class="form-control" for="password">
        <span>Password</span>
        <input type="password" id="password" formControlName="password" />
      </label>
      @if (loginForm.controls['password']?.invalid && loginForm.controls['password']?.touched) {
        <div class="error">
          @if (loginForm.controls['password']?.hasError('required')) {
            <p>La contraseña es obligatoria.</p>
          }
          @if (loginForm.controls['password']?.hasError('minlength')) {
            <p>La contraseña debe tener al menos 6 caracteres.</p>
          }
        </div>
      }
      <label class="form-control checkbox" for="rememberMe">
        <input type="checkbox" id="rememberMe" formControlName="rememberMe" />
        <span>Remember me</span>
      </label>
      <div class="form-control">
        <button type="submit" class="btn btn-primary" [disabled]="loginForm.invalid">Login</button>
      </div>
    </form>
    <pre>{{ loginForm.value | json }}</pre>
  `,
  styles: `
   /* Igual que en el caso anterior */
  `,
})
export class LoginFormMdfRx {
  readonly #fb = inject(FormBuilder);
  readonly #router = inject(Router);

  readonly loginForm: FormGroup = this.#fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rememberMe: [false],
  });

  protected formSubmit() {
    if (this.loginForm.valid) {
      console.log('loginForm', this.loginForm);
      // Navigate to the home page after successful login
      const formData: LoginForm = this.loginForm.value;
      console.log('Form submitted:', formData);
      this.loginForm.reset(); // Reset the form after submission
      this.#router.navigate(['/']);
    } else {
      console.log('Form is invalid');
    }
  }
}
```

## Signals Forms

### Conceptos básicos

Los formularios basados en signals son una nueva forma de crear formularios disponible de forma estable en Angular 22, que nos permite definir el formulario y sus controles desde el componente (igual que en los formularios MD, basados en RxJs ), pero en este caso como signals, y utilizar las directivas `FormRoot` y `FormField` para enlazar el formulario con el template.

En el componente se define

- el **modelo de datos** del formulario como un interface, que nos permite anotar el tipo del valor del formulario y sus controles
- un signal que representa el **estado del formulario**, con un valor inicial de todos los campos, generalmente a cadena vacía, o false en el caso del checkbox
- un objeto de tipo `FieldTree`, creado mor la función `form`, que representa una **vista reactiva** del formulario:
  - es una vista reactiva sobre el signal que representa el estado del formulario
  - se crea a partir de dicha signal
  - nos permite acceder a sus propiedades y métodos, como `value()`, `valid()`, `invalid()`, `reset()`, etc.
- como segundo parámetro de la función `form`, podemos pasar un callback que define el **schema del formulario**, con sus validaciones. Este callback recibe como parámetro el path del formulario, que nos permite acceder a los controles del formulario y definir sus validaciones.

Esto supone algunas diferencias importantes en la forma de entender los formularios, por lo que hay quien habla de un cambio de paradigma:

- Tu **modelo** es la fuente de la verdad y define el schema. 
- El formulario es una **vista reactiva** sobre ese Signal. 
- Los errores viven en el **schema**. Con tipado automático basado en el modelo. Fine grained gracias a los Signals.

### 🧿SignalsForm: Signal-based Form

Como primer ejemplo de formulario basado en signals básico, crearemos un formulario de login, con los mismos campos que los formularios anteriores, y con las mismas validaciones.

#### Lógica en el componente

En el componente crearemos un signal para representar el valor o estado del formulario, anotando su tipo de acuerdo al interface correspondiente y dándole un valor inicial de todos los campos a cadena vacía, o false en el caso del checkbox.

```ts
interface LoginModel {
  email: string;
  password: string;
  rememberMe: boolean;
}


@Component({
  ...
})
export class LoginFormSignals {

  readonly #loginModelInitialState: LoginModel = {
    email: '',
    password: '',
    rememberMe: false,
  };

  // Signal representing the form model
  readonly #loginModel = signal<LoginModel>(this.#loginModelInitialState);

  protected readonly loginForm = form(this.#loginModel)

  protected formSubmit() {
    const fieldTree: FieldTree<LoginModel> = this.loginForm;
    const fieldState: FieldState<LoginModel> = fieldTree();
    const formValue = fieldState.value();

    const fieldEmail: FieldTree<LoginModel['email']> = fieldTree.email;
    const fieldStateEmail: FieldState<LoginModel['email']> = fieldEmail();
    const emailValue = fieldStateEmail.value();
    
    console.log('Form submitted', formValue);
    console.log('Email submitted', emailValue);
  }
}
```

La función `form()` nos devuelve un objeto de tipo `FieldTree`, que representa una **vista reactiva** del formulario. En el se incluye cada uno de los controles del formulario, que son objetos de tipo `FieldTree`.

Si usamos el getter del signal `loginForm`, o de cualquiera de los `FieldTree` de los controles, podemos acceder al `FielState` del formulario, y a sus propiedades y métodos, como `value()`, `valid()`, `invalid()`, `reset()`, etc.

#### Vinculación al template

En el template se utilizan las directivas `FormRoot` y `FormField`, importadas de `@angular/forms/signals` para enlazar el formulario con el template.

```ts
  imports: [FormRoot, FormField],
  template: `
    <form [formRoot]="loginForm" (submit)="formSubmit()">
      <label class="form-control" for="email">
        <span> Email </span>
        <input type="email" id="email" [formField]="loginForm.email" />
      </label>
      ...
    </form>
  `
```

En este caso, la directiva `formRoot` se aplica al elemento `form`, y la directiva `formField` se aplica a cada uno de los controles del formulario, enlazándolos no con un nombre, sino con las propiedades correspondientes del objeto `loginForm`.

En lugar del evento `ngSubmit`, que no está disponible en los formularios signals, utilizamos el evento nativo `submit` del elemento form, que nos permite ejecutar un método del componente cuando se envía el formulario.

Hay que tener en cuente que tampoco estarán disponibles las clases de css que Angular aplica a los formularios y controles, como `ng-valid`, `ng-invalid`, `ng-touched`, `ng-untouched`, etc. por lo que habrá que definir nuestras propias clases de css para mostrar el feedback de las validaciones o utilizar las propiedades del objeto `FieldState` de cada control para añadir estilos al feedback de las validaciones.

#### Valor del formulario

De nuevo, como herramienta en desarrollo, que luego eliminaremos, añadimos un \<pre> que nos permite ver el valor del formulario en tiempo real, utilizando el pipe `json` para mostrarlo en formato JSON.

```html
  <pre>{{ loginForm().value() | json }}</pre>
```

En este caso accedemos al estado del formulario, es decir el valor de la signal `loginForm` mediante la llamada a su getter `loginForm()`, y al valor de la propiedad `value` mediante la llamada a su getter `value()`.

#### Validación y feedback

Igual que el los formularios MD, las validaciones se definen en el componente, en este caso en un callback que se pasa como segundo parámetro al método `form()` como **schema** de validación, Esta función recibe el valor del formulario y devuelve un objeto con los errores de validación.

```ts
export class LoginFormSignals {
  ...
  protected readonly loginForm = form(this.#loginFormState, (path) => {
    required(path.email, { message: 'El email es obligatorio' });
    email(path.email, { message: 'El email debe ser una dirección de correo válida' });
    required(path.password, { message: 'La contraseña es obligatoria' });
    minLength(path.password, 6, { message: 'La contraseña debe tener al menos 6 caracteres' });
  });
  ...
}
```

El API de signals forms nos permite definir validaciones para cada uno de los campos del formulario, utilizando funciones como `required`, `minLength`, `maxLength`, `pattern`, `email`, etc. que reciben como primer parámetro el path del campo, y como segundo parámetro un objeto con las opciones de la validación, como el mensaje de error.

La función  que define el schema puede declararse aparte, como cualquier callback, y pasarse como referencia al método `form()`, para mantener el código más limpio y legible, dejando más claro el concepto de **schema de validación** como una propiedad del componente.

```ts
readonly #loginFormSchema = (path: any) => {
  required(path.email, { message: 'El email es obligatorio' });
  email(path.email, { message: 'El email debe ser una dirección de correo válida' });
  required(path.password, { message: 'La contraseña es obligatoria' });
  minLength(path.password, 6, { message: 'La contraseña debe tener al menos 6 caracteres' });
};

protected readonly loginForm = form(this.#loginModel, this.#loginFormSchema);
```

A la hora de mostrar el feedback de las validaciones, podemos utilizar la propiedad `errors` del objeto `loginForm`, que nos devuelve un objeto con los errores de validación de cada uno de los campos del formulario.

```ts
  @if (loginForm.email()?.invalid() && loginForm.email()?.touched()) {
    <!-- @if (loginForm.email().errors() && loginForm.email()?.touched()) { -->
    <p class="error">{{ loginForm.email().errors()[0].message }}</p>
  }
``` 

Opcionalmente, en lugar de mostrar solo el error activo, podemos mostrar todos los que afecten al componente 

```ts
  @if (loginForm.email()?.invalid() && loginForm.email()?.touched()) {
    <!-- @if (loginForm.email().errors() && loginForm.email()?.touched()) { -->
    <ul class="error">
      @for (const error of loginForm.email().errors()) {
        <li>{{ error.message }}</li>
      }
    </ul>
  }
```

También es posible accede a todo el conjunto de errores del formulario, utilizando la propiedad `errorSummary` del objeto `loginForm`, que nos devuelve un objeto con los errores de validación de cada uno de los campos del formulario.

```ts
<p>Errores del formulario</p>
<ul class="error">
  @for (error of loginForm().errorSummary(); track $index) {
    <li>{{ error.message }}</li>
  }
</ul>
```

#### Submit y Navegación

El proceso de submit incluirá la llamada a un servicio, responsable del login de cara al backend, que aun no existe, pasándole los datos de la signal value(), que ya están tipados de acuerdo con el interface LoginForm. 

De momento solo es un console log para mostrar los datos que se enviarían al backend, y un reset del formulario (ahora con el método `reset()` del Signal Form) para dejarlo limpio para un nuevo intento de login.

Además, finalizado el login, se navega a la página de inicio, utilizando el servicio `Router` de Angular, que nos permite navegar entre las páginas de la app sin recargar la página completa.

```ts
  protected formSubmit() {
    if (this.loginForm().valid()) {
      console.log('Form submitted');
      const formData = this.loginForm().value();
      console.log('Form submitted:', formData);
      this.loginForm().reset(); // Reset the form after submission
      // Navigate to the home page after successful login
      this.#router.navigate(['/']);
    } else {
      console.log('Form is invalid');
    }
  }
```

En la creación de formData, para adecuarlo al interface LoginModel, podríamos añadir las transformaciones y validaciones que fueran necesarias.

#### Resultado final

El resultado final del componente es el siguiente

```ts
import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  email,
  FieldState,
  FieldTree,
  form,
  FormField,
  FormRoot,
  minLength,
  required,
} from '@angular/forms/signals';
import { Router } from '@angular/router';

interface LoginModel {
  email: string;
  password: string;
  rememberMe: boolean;
}

@Component({
  selector: 'alc-login-form-signals',
  imports: [FormRoot, FormField, JsonPipe],
  template: `
    <form [formRoot]="loginForm" (submit)="submitForm()">
      <label class="form-control" for="email">
        <span> Email </span>
        <input type="email" id="email" [formField]="loginForm.email" />
      </label>
      @if (loginForm.email()?.invalid() && loginForm.email()?.touched()) {
        <!-- @if (loginForm.email().errors() && loginForm.email()?.touched()) { -->
        <p class="error">{{ loginForm.email().errors()[0].message }}</p>
      }
      <label class="form-control" for="password">
        <span>Password</span>
        <input type="password" id="password" [formField]="loginForm.password" />
      </label>
      @if (loginForm.password()?.invalid() && loginForm.password()?.touched()) {
        <p class="error">{{ loginForm.password().errors()[0].message }}</p>
      }
      <label class="form-control checkbox" for="rememberMe">
        <input type="checkbox" id="rememberMe" [formField]="loginForm.rememberMe" />
        <span>Remember me</span>
      </label>
      <div class="form-control">
        <button type="submit" class="btn btn-primary" [disabled]="loginForm().invalid()">
          Login
        </button>
      </div>
    </form>
    <pre>{{ loginForm().value() | json }}</pre>
    <pre>{{ loginForm().errorSummary() | json }}</pre>
    <p>Errores del formulario</p>
    <ul class="error">
      @for (error of loginForm().errorSummary(); track $index) {
        <li>{{ error.message }}</li>
      }
    </ul>
  `,
  styleUrls: ['../forms.css'],
  styles: `
  ul.error {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  `,
})
export class LoginFormSignals {
  readonly #router = inject(Router);
  readonly #loginModelInitialState: LoginModel = {
    email: '',
    password: '',
    rememberMe: false,
  };

  // Signal representing the form model
  readonly #loginModel = signal<LoginModel>(this.#loginModelInitialState);

  // Sin validaciones
  // protected readonly loginForm = form(this.#loginModel)

  // Añadiendo validaciones
  // protected readonly loginForm = form(this.#loginModel, (path) => {
  //   required(path.email, { message: 'El email es obligatorio' });
  //   email(path.email, { message: 'El email debe ser una dirección de correo válida' });
  //   required(path.password, { message: 'La contraseña es obligatoria' });
  //   minLength(path.password, 6, { message: 'La contraseña debe tener al menos 6 caracteres' });
  // });

  // Schema de validación como propiedad de la clase

  readonly #loginFormSchema = (path: any) => {
    required(path.email, { message: 'El email es obligatorio' });
    email(path.email, { message: 'El email debe ser una dirección de correo válida' });
    required(path.password, { message: 'La contraseña es obligatoria' });
    minLength(path.password, 6, { message: 'La contraseña debe tener al menos 6 caracteres' });
  };

  protected readonly loginForm = form(this.#loginModel, this.#loginFormSchema);

  constructor() {
    const fieldTree: FieldTree<LoginModel> = this.loginForm;
    const fieldState: FieldState<LoginModel> = fieldTree();
    const formValue = fieldState.value();

    const fieldEmail: FieldTree<LoginModel['email']> = fieldTree.email;
    const fieldStateEmail: FieldState<LoginModel['email']> = fieldEmail();
    const emailValue = fieldStateEmail.value();
  }

  protected submitForm() {
    if (this.loginForm().valid()) {
      console.log('Form submitted');
      const formData = this.loginForm().value();
      console.log('Form submitted:', formData);
      this.loginForm().reset(); // Reset the form after submission
      // Navigate to the home page after successful login
      this.#router.navigate(['/']);
    } else {
      console.log('Form is invalid');
    }
  }
}
```

### 🧿RegisterForm basado en signals

Para tener un ejemplo algo más completo, añadimos un formulario de registro basado en signals, que incluye otros elementos, como radio buttons y select, y que nos permite ver cómo se comportan estos elementos en un formulario basado en signals.

#### Controles de selección

Respecto a Los controles de selección, como los radio buttons y los select, se puede definir un array de opciones, incluyendo los valores y las etiquetas que se mostrarán en el template, donde se renderizarán los controles iterando los datos con un `@for`.

```ts
interface masterData {
  value: string;
  message: string;
};

export interface Gender extends masterData {
  value: 'm' | 'f' | 'o' | 'n' | '';
  message: 'hombre' | 'mujer' | 'otro' | 'prefiero no decirlo' | '';
};

export const GENDERS: Gender[] = [
  { value: 'm', message: 'hombre' },
  { value: 'f', message: 'mujer' },
  { value: 'o', message: 'otro' },
  { value: 'n', message: 'prefiero no decirlo' },
];

export interface Course extends masterData {
  value: 'a' | 'r' | 'n' | 'h' | 'j' | 't' | '';
  message: 'Angular' | 'React' | 'Node.js' | 'HTML/CSS' | 'JavaScript' | 'TypeScript' | '';
};

export const COURSES: Course[] = [
  { value: 'a', message: 'Angular' },
  { value: 'r', message: 'React' },
  { value: 'n', message: 'Node.js' },
  { value: 'h', message: 'HTML/CSS' },
  { value: 'j', message: 'JavaScript' },
  { value: 't', message: 'TypeScript' },
];
```

En el componente importamos las contantes como propiedades de la clase, para poder utilizarlas en el template.

```ts
export class RegisterForm {
  protected readonly genders = signal(GENDERS);
  protected readonly courses = signal(COURSES);
}
```

En el caso del radio button, el resultado sería

```html
<fieldset aria-label="Gender">
  <legend>Gender</legend>
  @for (item of genders(); track $index) {
    <label [for]="'gender-' + item.value" class="form-control checkbox">
      <input
        type="radio"
        [id]="'gender-' + item.value"
      />
      {{ item.message | titlecase }}
    </label>
  }
</fieldset>
```

En el caso del select, el resultado sería

```html
<label class="form-control" for="course">
  <span>Course</span>
  <select id="course">
    @for (item of courses(); track $index) {
      <option [value]="item.value">{{ item.message }}</option>
    }
  </select>
</label>
```

####  Lógica en el componente

En primer lugar definimos el interface que representa el formulario, y un array de opciones para los radio buttons y el select.

```ts
interface RegisterForm {
  email: string;
  password: string;
  firstName: string;
  surname: string;
  gender: Gender;
  genderKey: Gender['value'];
  hasCourse: boolean;
  course: Course;
  isOk: boolean;
}
```

Para los valores objetos que representan  datos maestros (o master data)  incluimos la posibilidad de guardar el objeto completo, y también solo la clave del objeto, para poder enlazarlo con los radio buttons y el select, que solo devuelven el valor de la opción seleccionada.

Los pasos siguientes son ya conocidos, y son los mismos que en el caso del formulario de login basado en signals:

1. Definimos un objeto con los valores iniciales del formulario, con todos los campos a cadena vacía, o false en el caso del checkbox
2. Creamos un signal que representa el estado del formulario, con el valor inicial definido en el paso anterior
3. Creamos un objeto de tipo `FieldTree`, que representa una **vista reactiva** del formulario, a partir del signal que representa el estado del formulario.
4. Al crear el objeto `FieldTree`, podemos añadir  el **schema del formulario** con sus validaciones, como callback anónimo, o mejor a través de una propiedad de la clase. Cualquiera de ambos recibe como parámetro el path del formulario, que nos permite acceder a los controles del formulario y definir sus validaciones.
 
```ts
export class RegisterForm {
  readonly #initialValues: RegisterModel = {
    email: '',
    password: '',
    firstName: '',
    surname: '',
    gender: { value: '', message: '' },
    isOk: false,
    hasCourse: false,
    course: { value: '', message: '' },
  };

  protected readonly genders = signal(GENDERS);
  protected readonly courses = signal(COURSES);

  protected readonly user = signal<RegisterModel>(this.#initialValues);
  protected readonly registerForm: FieldTree<RegisterModel> = form(this.user, (schema) => {
    required(schema.email);
    email(schema.email);
    ...
  });

  submitForm() {
    console.log('Form submitted:', this.registerForm().value());
  }
}
```

#### Vinculación al template

El formulario se enlaza con el template utilizando las directivas `FormRoot` y `FormField`, importadas de `@angular/forms/signals`.

En el caso de los inputs text (email, password) y checkboxes, lo hacemos de la misma forma que en el formulario de login basado en signals.

```html
<form [formRoot]="registerForm" (submit)="submitForm()">
  <div aria-label="Email">
    <label for="email" class="form-control"
      >Email Email
      <input type="email" id="email" [formField]="registerForm.email" />
    </label>
  </div>
  <div aria-label="Password">
    <label for="password" class="form-control">
      Password
      <input type="password" id="password" [formField]="registerForm.password" />
    </label>
  </div>
  <div aria-label="Fist Name">
    <label for="firstName" class="form-control">
      First Name
      <input type="text" id="firstName" [formField]="registerForm.firstName" />
    </label>
  </div>
  <div aria-label="Surname">
    <label for="surname" class="form-control">
      Surname
      <input type="text" id="surname" [formField]="registerForm.surname" />
    </label>
  </div>
  <div aria-label="Buttons" class="form-control">
    <button type="submit" [disabled]="registerForm().invalid()">Register</button>
  </div>

  <div aria-label="Terms">
    <label for="isOk" class="form-control checkbox">
      <input type="checkbox" id="isOk" [formField]="registerForm.isOk" />
      Accept Terms ...
    </label>
  </div>

  <div aria-label="Has Course">
    <label for="hasCourse" class="form-control checkbox">
      <input type="checkbox" id="hasCourse" [formField]="registerForm.hasCourse" />
      ¿Quieres hacer un curso con nosotros?
    </label>
  </div>
</form>
<pre>{{ registerForm().value() | json }}</pre>
```

#### Valor del formulario

De nuevo, como herramienta en desarrollo, que luego eliminaremos, añadimos un \<pre> que nos permite ver el valor del formulario en tiempo real, utilizando el pipe `json` para mostrarlo en formato JSON.

```html
  <pre>{{ registerForm().value() | json }}</pre>
```

En este caso accedemos al estado del formulario (`FieldState`), es decir el valor de la signal `registerForm` mediante la llamada a su getter `registerForm()`

En el `FieldState` obtenemos al valor de la propiedad `value` mediante la llamada a su getter `value()`.

#### Vinculación al template: problemas con objetos

En el caso de los radio buttons y los select, solo podemos obtener el valor de la opción seleccionada, y no el objeto completo, enlazando el control con la propiedad del formulario que contiene la clave del objeto, y no con la propiedad que contiene el objeto completo.

Para terminar utilizamos el evento `(change)` del control radio button, para actualizar el objeto completo, accediendo al value de FieldState del control radio button (`registerForm.gender()`), y "seteando" la signal que almacena el valor.


```html
<fieldset aria-label="Gender">
  <legend>Gender</legend>
  @for (item of genders(); track $index) {
    <label [for]="'gender-' + item.value" class="form-control checkbox">
      <input
        type="radio"
        [id]="'gender-' + item.value"
        [formField]="registerForm.gender.value"
        [value]="item.value"
        (change)="registerForm.gender().value.set(item)"
      />
      {{ item.message | titlecase }}
    </label>
  }
</fieldset>
```

En el select la respuesta al evento change es similar, pero en este caso accedemos al target del evento y debemos haces casting del tipo, por lo que pasamos el código a un método del componente.

```html
<label class="form-control" for="course">
  <span>Course</span>
  <select
    id="course"
    [formField]="registerForm.course.value"
    (change)="selectChange($event)"
  >
    @for (item of courses(); track $index) {
      <option [value]="item.value">{{ item.message }}</option>
    }
  </select>
```

En el handler del evento change, aprovechamos la propiedad `selectedIndex` del target del evento, nativa de HTML, que nos da el índice de la opción seleccionada, para obtener el objeto completo del array de opciones, que seteamos en la signal correspondiente.

```ts
  protected selectChange(event: Event) {
    const index = (event.target as HTMLSelectElement).selectedIndex;
    this.registerForm.course().value.set(
      this.courses()[index] || { value: '', message: '' }
    );
  }

```

#### Validación y feedback

Las validaciones se definen en el componente, y como buena práctica lo haremos en una propiedad de la clase, que es un callback que se pasa como segundo parámetro al método `form()` como **schema** de validación. Esta función recibe el path del formulario, que nos permite acceder a los controles del formulario y definir sus validaciones.

```ts
readonly #registerFormSchema = (path: any) => {
  required(path.email, { message: 'El email es obligatorio' });
  email(path.email, { message: 'El email no es válido' });
  required(path.password, { message: 'La contraseña es obligatoria' });
  minLength(path.password, 6, { message: 'La contraseña debe tener al menos 6 caracteres' });
  required(path.gender.value, { message: 'Indicar el género es obligatorio' });
  //....
};

protected readonly registerForm = form(this.user, this.#registerFormSchema);
```

#### Validaciones dependientes de otros campos

A nivel visual, los campos de nombre, apellidos y selección del curso solo aparecen cuando se ha seleccionado la opción de hacer un curso, por lo que las validaciones de estos campos solo se deben aplicar cuando el checkbox `hasCourse` está marcado.

```ts
required(schema.firstName, {
  when: ({ valueOf }) => valueOf(schema.hasCourse) === true,
  message: 'El nombre es obligatorio',
});
```

Podemos crear un segundo schema de validación, con aquellas que solo se aplican cuando el checkbox `hasCourse` está marcado, y que se añada al schema principal mediante la función `applyWhen()`, que nos permite añadir un schema adicional condicional.

```ts
readonly #optionalsSchema = (path: SchemaPathTree<RegisterModel>) => {
  required(path.firstName, { message: 'El nombre es obligatorio' });
  required(path.surname, { message: 'El apellido es obligatorio' });
  required(path.course.value, { message: 'El curso es obligatorio' });
};

protected readonly registerForm: FieldTree<RegisterModel> = form(this.user, (path) => {
  this.#registerFormSchema(path);
  applyWhen(
    path,
    ({ valueOf }) => valueOf(path.hasCourse) === true,
    (path) => this.#optionalsSchema(path)
  );
});
```

#### Submit y Navegación

Como en los ejemplos anteriores, El proceso de submit incluirá la llamada a un servicio, responsable del login de cara al backend, que aun no existe. De momento solo es un console log para mostrar los datos que se enviarían al backend, y un reset del formulario (ahora con el método `reset()` del FormGroup) para dejarlo limpio para un nuevo intento de login.

Además, finalizado el login, se navega a la página de inicio, utilizando el servicio `Router` de Angular, que nos permite navegar entre las páginas de la app sin recargar la página completa.

```ts
protected formSubmit() {
    if (this.loginForm.valid) {
      console.log('loginForm', this.loginForm);
      // Navigate to the home page after successful login
      const formData: LoginForm = this.loginForm.value;
      console.log('Form submitted:', formData);
      this.loginForm.reset(); // Reset the form after submission
      this.#router.navigate(['/']);
    } else {
      console.log('Form is invalid');
    }
  }
```

En la creación de formData, para adecuarlo al interface LoginForm, podríamos añadir las transformaciones y validaciones que fueran necesarias.

#### Resultado final

```ts
import { JsonPipe, TitleCasePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  applyWhen,
  email,
  FieldTree,
  form,
  FormField,
  FormRoot,
  minLength,
  required,
  SchemaPathTree,
} from '@angular/forms/signals';
import { Gender, Course, GENDERS, COURSES } from '../../types/register-controls';
import { Router } from '@angular/router';

interface RegisterModel {
  email: string;
  password: string;
  firstName: string;
  surname: string;
  gender: Gender;
  hasCourse: boolean;
  course: Course;
  isOk: boolean;
}

// Versión inicial del formulario de registro,
// sin los campos de selección de género y curso, y sin validación de los campos.
// sin usar componentes de UI personalizados

@Component({
  selector: 'alc-register-form',
  imports: [FormField, FormRoot, JsonPipe, TitleCasePipe],
  template: `
    <form [formRoot]="registerForm" (submit)="submitForm()">
      <div aria-label="Email">
        <label for="email" class="form-control"
          >Email Email
          <input type="email" id="email" [formField]="registerForm.email" />
        </label>
        @if (registerForm.email()?.invalid() && registerForm.email()?.touched()) {
          <p class="error">
            {{ registerForm.email()?.errors()?.[0]?.message }}
          </p>
        }
      </div>
      <div aria-label="Password">
        <label for="password" class="form-control">
          Password
          <input type="password" id="password" [formField]="registerForm.password" />
        </label>
        @if (registerForm.password()?.invalid() && registerForm.password()?.touched()) {
          <p class="error">
            {{ registerForm.password()?.errors()?.[0]?.message }}
          </p>
        }
      </div>

      <fieldset aria-label="Gender">
        <legend>Gender</legend>
        @for (item of genders(); track $index) {
          <label [for]="'gender-' + item.value" class="form-control checkbox">
            <input
              type="radio"
              [id]="'gender-' + item.value"
              [formField]="registerForm.gender.value"
              [value]="item.value"
              (change)="registerForm.gender().value.set(item)"
            />
            {{ item.message | titlecase }}
          </label>
        }
      </fieldset>

      <div aria-label="Terms">
        <label for="isOk" class="form-control checkbox">
          <input type="checkbox" id="isOk" [formField]="registerForm.isOk" />
          Accept Terms ...
        </label>
        @if (registerForm.isOk()?.invalid() && registerForm.isOk()?.touched()) {
          <p class="error">
            {{ registerForm.isOk()?.errors()?.[0]?.message }}
          </p>
        }
      </div>

      <div aria-label="Has Course">
        <label for="hasCourse" class="form-control checkbox">
          <input type="checkbox" id="hasCourse" [formField]="registerForm.hasCourse" />
          ¿Quieres hacer un curso con nosotros?
        </label>
        @if (registerForm.hasCourse()?.invalid() && registerForm.hasCourse()?.touched()) {
          <p class="error">
            {{ registerForm.hasCourse()?.errors()?.[0]?.message }}
          </p>
        }
      </div>

      @if (registerForm.hasCourse().value()) {
        <div aria-label="Fist Name">
          <label for="firstName" class="form-control">
            First Name
            <input type="text" id="firstName" [formField]="registerForm.firstName" />
          </label>
          @if (registerForm.firstName()?.invalid() && registerForm.firstName()?.touched()) {
            <p class="error">
              {{ registerForm.firstName()?.errors()?.[0]?.message }}
            </p>
          }
        </div>
        <div aria-label="Surname">
          <label for="surname" class="form-control">
            Surname
            <input type="text" id="surname" [formField]="registerForm.surname" />
          </label>
          @if (registerForm.surname()?.invalid() && registerForm.surname()?.touched()) {
            <p class="error">
              {{ registerForm.surname()?.errors()?.[0]?.message }}
            </p>
          }
        </div>

        <label class="form-control" for="course">
          <span>Course</span>
          <select
            id="course"
            [formField]="registerForm.course.value"
            (change)="selectChange($event)"
          >
            @for (item of courses(); track $index) {
              <option [value]="item.value">{{ item.message }}</option>
            }
          </select>
        </label>
      }

      <div aria-label="Buttons" class="form-control">
        <button type="submit" [disabled]="registerForm().invalid()">Register</button>
      </div>
    </form>
    <div aria-label="Form Value" class="form-value">
      <p>Valor del formulario</p>
      <pre>{{ registerForm().value() | json }}</pre>
      <p>Valor de errores activos del formulario</p>
      <pre>{{ registerForm().errorSummary() | json }}</pre>
      <p>Errores activos del formulario</p>
      <ul class="error">
        @for (error of registerForm().errorSummary(); track $index) {
          <li>{{ error.message }}</li>
        }
      </ul>
    </div>
  `,
  styleUrls: ['../forms.css'],
  styles: `
    form {
      max-width: 500px;
    }
    fieldset {
      border: 1px solid #ccc;
      padding: 1rem;
      display: flex;
      gap: 1rem;
    }
    ul.error {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .form-value {
      margin-top: 2rem;
      padding: 1rem;
      border: 1px solid #ccc;
      background-color: #f9f9f9;
    }
  `,
})
export class RegisterForm {
  readonly #router = inject(Router);

  readonly #initialValues: RegisterModel = {
    email: '',
    password: '',
    firstName: '',
    surname: '',
    gender: { value: '', message: '' },
    isOk: false,
    hasCourse: false,
    course: { value: '', message: '' },
  };

  protected readonly genders = signal(GENDERS);
  protected readonly courses = signal(COURSES);

  protected readonly user = signal<RegisterModel>(this.#initialValues);

  readonly #optionalsSchema = (path: SchemaPathTree<RegisterModel>) => {
    required(path.firstName, { message: 'El nombre es obligatorio' });
    required(path.surname, { message: 'El apellido es obligatorio' });
    required(path.course.value, { message: 'El curso es obligatorio' });
  };

  readonly #registerFormSchema = (path: SchemaPathTree<RegisterModel>) => {
    required(path.email, { message: 'El email es obligatorio' });
    email(path.email, { message: 'El email no es válido' });
    required(path.password, { message: 'La contraseña es obligatoria' });
    minLength(path.password, 6, { message: 'La contraseña debe tener al menos 6 caracteres' });
    required(path.isOk, { message: 'Debes aceptar los términos y condiciones' });
  };

  protected readonly registerForm: FieldTree<RegisterModel> = form(this.user, (path) => {
    this.#registerFormSchema(path);
    applyWhen(
      path,
      ({ valueOf }) => valueOf(path.hasCourse) === true,
      (path) => this.#optionalsSchema(path)
    );
  });

  protected selectChange(event: Event) {
    const index = (event.target as HTMLSelectElement).selectedIndex;
    this.registerForm.course().value.set(this.courses()[index] || { value: '', message: '' });
  }

  submitForm() {
    if (this.registerForm().valid()) {
          console.log('Form submitted:', this.registerForm().value());
      // Navigate to the home page after successful login
      const formData: RegisterModel = this.registerForm().value();
      console.log('Form submitted:', formData);
      this.registerForm().reset(); // Reset the form after submission
      this.#router.navigate(['/']);
    } else {
      console.log('Form is invalid');
    }
  }
}
```

### Custom Controls

En el formulario de registro vemos que se repiten los inputs y los checkboxes, e incluso los radio buttons y los select, tienen un templete definido con el que podría pasar lo mismo.

En todos los casos podemos crear **componentes personalizados** para cada uno de estos controles, que nos permitan reutilizarlos en otros formularios, y que nos permitan encapsular la lógica de validación y feedback de cada control. De esta forma estaremos creando un siistema de diseño (System Design) propio, que nos permitirá mantener la consistencia visual y funcional de nuestra aplicación.

#### 🧿Custom CheckBox-Free

Este componente es un wrapper del input nativo de tipo checkbox, que nos permite utilizarlo como un componente de Angular, y que nos permite enlazarlo con un signal de tipo boolean. Como no estamos pasando elementos de formulario, podríamos usar el componente libremente, fuera de un formulario.

El componente recibe dos inputs:

- `checked`: un signal de tipo boolean que representa el estado del checkbox
- `label`: un signal de string que representa el texto que se muestra al lado del checkbox

Y un output

- `checkedChange`: un output que emite un evento cuando el estado del checkbox cambia, para que el componente padre pueda actualizar su signal correspondiente.

```ts
export class  CheckBoxFree { {

  readonly checked = input.required<boolean>();
  readonly checkedChange = output<boolean>();
  readonly label = input.required<string>();
}
```

En el template, utilizamos un label que contiene el input de tipo checkbox, y un span que muestra el texto del label. 

El input está enlazado con el signal `checked` mediante la propiedad `[checked]`, y el evento `(checkedChange)` emite el evento `emitCheckedChange`, que corresponde al cambio de estado del checkbox, realizado a nivel visual en el HTML.

```html
<label class="custom-checkbox">
  <input type="checkbox" 
        [checked]="checked()" 
        (change)="checkedChange.emit(!checked())" />
  <span class="check-mark"></span>
  <span class="label-text">{{ label() }}</span>
</label>
```

##### Uso desde el formulario

En el formulario de registro, utilizamos el componente `CheckBoxFree` para el campo `hasCourse` y enlazamos su estado con el signal `registerForm.hasCourse()` mediante la propiedad `[checked]`, y el evento `(emitCheckedChange)` llama al método `updateHasCourse()` que actualiza el signal correspondiente.

```html
  <alc-check-box
    [label]="'Accept Terms ...'"
    [checked]="registerForm.hasCourse().value()"
    (emitCheckedChange)="updateHasCourse($event)"
  />
```

```ts
  protected updateHasCourse(newChecked: boolean) {
    this.registerForm.hasCourse().value.set( newChecked )
  }
```

#### Signal model()

En el caso anterior, en el componente `CheckBoxFree`,   podríamos utilizar otra primitiva de señales, `model()`, que nos permite agrupar en un solo elemento las dos direcciones de comunicación, input y output.

```ts
export class CheckBoxFree {
    // readonly checked = input.required<boolean>();
    // readonly checkedChange = output<boolean>();
  readonly checked = model.required<boolean>();
  
  readonly label = input.required<string>();
}
```

En el template, en lugar de utilizar las propiedades `[checked]` hace el bindong con la propiedad igual que antes pero el binding del evento cambia. Ahora no tenemos acceso directo al output: cambiamos el valor de la signal de tipo model y esta emite automáticamente un evento de cambio, que podemos escuchar en el componente padre. Para ello solo hay que tener encuenta que el nombre del evento es el nombre de la propiedad con el sufijo `Change`, en este caso `checkedChange`.

```html 
<input type="checkbox" [checked]="checked()" (change)="checked.set(!checked())" />
```

En el formulario de registro, el binding es igual que antes, ya que el evento que escuchamos ya se denominaba `checkedChange`, que es el nombre de la propiedad con el sufijo `Change`.

```html
<div aria-label="Has Course">
  <alc-check-box-free
    [label]="'Haz echo algún curso con nosotros'"
    [checked]="registerForm.hasCourse().value()"
    (checkedChange)="updateHasCourse($event)"
  />
</div>
```

Por el momento no existe una directiva similar a `[(ngModel)]` para hacer el binding bidireccional con un signal de tipo model, pero es posible crearla, y de hecho ya existe un PR abierto en Angular para implementarla.

#### 🧿Custom CheckBox (dependiendo de FieldState)

Otro enfoque para este y los demás controles personalizados es que dependan directamente del FieldTree / FieldState, lo que permitirá integrar fácilmente las validaciones del formulario y el feedback de los errores, y que se puedan utilizar en cualquier formulario basado en signals. 

El componente recibe como inputs el texto que debe mostrar (label) y el FieldState del control que representa el checkbox, y se encarga de enlazar el estado del checkbox con el valor del FieldState, y de mostrar los errores de validación si los hay.

Añadimos como opcional un input `id` para aportar el id del input, u creamos uno cuando no se suministra.   

```ts
import { Component, input } from '@angular/core';
import { FieldState, FormField } from '@angular/forms/signals';

@Component({
  selector: 'alc-check-box',
  imports: [FormField],
  template: `
    <label for="{{ id() }}" class="custom-checkbox">
      <input type="checkbox" [formField]="fieldState" [id]="id()" />
      <span class="check-mark"></span>
      <span class="label-text">{{ label() }}</span>
    </label>
    @if (fieldState().invalid() && fieldState().touched()) {
      <p class="error">
        {{ fieldState().errors()?.[0]?.message }}
      </p>
    }
  `,
  styles: ``,
})
export class CheckBox {
  readonly label = input.required<string>();
  readonly id = input<string>(`checkbox-${Math.random().toString(36).slice(2, 9)}`);
  readonly fieldState = input.required<FieldState<boolean>>();
}
```

El uso desde el formulario se simplifica al máximo, ya que solo hay que pasar el FieldState del control correspondiente, y el componente se encarga de todo lo demás.

```html
<alc-check-box
  [label]="'Acepto los términos ...'"
  [fieldState]="registerForm.isOk()"
/>
```

Los estilos del componente permiten darle el aspecto adecuado para conseguir un sistema de diseño consistente, y se pueden personalizar según las necesidades del proyecto.

```css
.custom-checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0.8rem 0;
  cursor: pointer;
  user-select: none;

  input[type='checkbox'] {
    margin: 0;
    opacity: 0;
  }
}

.check-mark {
  width: 18px;
  height: 18px;
  border: 2px solid #ddd;
  border-radius: 3px;
  display: inline-block;
  position: relative;
}

.custom-checkbox input[type='checkbox']:checked + .check-mark {
  background-color: var(--color-secondary);
  border-color: var(--color-tertiary-hot);
}

.custom-checkbox input[type='checkbox']:checked + .check-mark::after {
  content: '✓';
  position: absolute;
  color: var(--color-background);
  font-size: 14px;
  top: -2px;
  left: 2px;
}

.error {
  color: var(--color-tertiary);
  font-size: 0.8rem;
}
```

#### 🧿Custom Input

Siguiendo el ejemplo anterior, podemos crear un componente personalizado para los inputs de tipo texto, que reciba como inputs el texto que debe mostrar (label) y el FieldState del control que representa el input, y se encargue de enlazar el estado del input con el valor del FieldState, y de mostrar los errores de validación si los hay.

```ts
import { Component, input } from '@angular/core';
import { FieldState, FormField } from '@angular/forms/signals';

@Component({
  selector: 'alc-input',
  imports: [FormField],
  template: `
    <label for="{{ id() }}" class="form-control"
      >{{ label() }}
      <input type="{{ type() }}" id="{{ id() }}" [formField]="fieldState" />
    </label>
    @if (fieldState().invalid() && fieldState().touched()) {
      <p class="error">
        {{ fieldState().errors()?.[0]?.message }}
      </p>
    }
  `,
  styles: ``,
})
export class Input {
  readonly type = input<string>('text');
  readonly label = input.required<string>();
  // readonly fieldTree = input.required<FieldTree<string>>();
  readonly fieldState = input.required<FieldState<string>>();
}
```

En el css podemos usar un enfoque similar al de material design, con un label que se mueve hacia arriba cuando el input está enfocado o tiene valor, y un borde inferior que cambia de color cuando el input está enfocado o tiene error.

```css
.form-control {
  padding-block-start: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
input,
textarea {
  padding: 0.5rem;
  font-size: 1rem;
  color: var(--color-primary-hot);
  background-color: var(--color-background-primary);
  border: none;
  border-block-end: 2px solid var(--color-primary);
  border-radius: 4px;

  &:focus-visible {
    outline: var(--color-primary) auto 1px;
    background-color: var(--color-background);
  }
}

span {
  font-size: 0.8rem;
  color: var(--color-primary);
  margin-bottom: 0.2rem;
  position: relative;
  top: -2rem;
}

input:focus-visible + span,
input:not(:placeholder-shown) + span {
  color: var(--color-primary-hot);
  top: -4rem;
}

.error {
  color: var(--color-tertiary);
  font-size: 0.8rem;
}
```

#### 🧿Custom RadioButtons

Al crear un componente custom para el siguiendo el mismo planteamiento que en casos anteriores, tenemos un problema en nuestro modelo del formulario, ya que hemos definido la propiedad que usará el control de radio buttons como un objeto (`gender: Gender`), mientras que el elemento HTML nativo de tipo radio button solo devuelve el valor de la opción seleccionada, y no el objeto completo. 

Como antes, debemos crear un componente que reciba como inputs 
- el texto que debe mostrar (label), 
- el FieldState del control que representa el radio button, y 
- un array de opciones

```ts
@Component({
  ...
})
export class RadioButtons<T extends { value: string; message: string }> {
  readonly legend = input.required<string>();
  readonly options = input.required<T[]>();
  readonly fieldState = input.required<FieldState<T>>();
}
```

El uso del tipado generico nos permite crear un componente que pueda ser utilizado con cualquier objeto que tenga las propiedades `value` y `message`, como en nuestro caso los objetos `Gender` y `Course`.

Pero tendremos un problema en el template, ya que el binding de la directiva FormField [formField] con el FieldState fallara porque esta directiva solo funciona con valores primitivos, y no con objetos.

En lugar de usar la directiva FormField, podemos usar el binding de `[checked]` con la propiedad value del FieldState, que nos permite enlazar el valor del control con el valor del FieldState, y el evento `(change)` para actualizar el valor del FieldState cuando se selecciona una opción.

```html
<fieldset>
  <legend>{{ legend() }}</legend>
  @for (item of options(); track $index) {
    <label [for]="'gender-' + item.value" class="form-control checkbox">
      <input
        type="radio"
        [id]="'gender-' + item.value"
        (blur)="fieldState().markAsTouched()"
        [checked]="fieldState().value().value === item.value"
        (change)="fieldState().value.set(item)"
        [value]="item.value"
      />
      <span>{{ item.message | titlecase }}</span>
    </label>
  }
</fieldset>
@if (fieldState().invalid() && fieldState().touched()) {
  <p class="error">
    {{ fieldState().errorSummary()?.[0]?.message }}
  </p>
}
```

Quizás por el uso de `[checked]` y `(change)` en lugar de `[formField]`, el componente necesita dos pequeños ajustes:

- marcarlo touched cuando se pierde el foco, para que se muestren los errores de validación cuando el usuario interactúa con el control
- mostrar los errores de validación como `errorSummary()` en lugar de `errors()`, ya que el control de radio buttons no tiene un valor primitivo, sino un objeto.

El css proporciona a los radio buttons aspecto similar al de botones.

```css
fieldset {
  border: 1px solid #ccc;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: space-around;
}

legend {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

label {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  span {
    color: color-mix(in srgb, var(--color-primary) 85%, transparent);
    background-color: color-mix(in srgb, var(--color-primary) 25%, transparent);
    border: 2px solid rgba(0, 0, 0, 0.2);
    border-radius: 10%;
    padding: 0.5rem;
    cursor: pointer;
  }

  input {
    opacity: 0;
    position: absolute;
    right: 0;
    &:checked + span {
      background: var(--color-secondary);
      border-color: var(--color-tertiary-hot);
      color: var(--color-background);
    }
  }
}

.error {
  color: var(--color-tertiary);
  font-size: 0.8rem;
}
```


#### 🧿Custom Select

La situación es prácticamente la misma que en los radiobutton.

El componente es genérico y recibe los mismos inputs

```ts
@Component({
  ...
})
export class Select<T extends { value: string; message: string }> {
  readonly label = input.required<string>();
  readonly options = input.required<T[]>();
  readonly fieldState = input.required<FieldState<T>>();
}
```

El binding en el template es muy similar al de los radio buttons, utilizando en este caso el binding de `[value]` con la propiedad value del FieldState, y el evento `(change)` para actualizar el valor del FieldState cuando se selecciona una opción.

```html
<label for="select" class="form-control" >
  <select
    id="select"
    (blur)="fieldState().markAsTouched()"
    [value]="fieldState().value().value"
    (change)="onSelectChange($event.target)"
    [class.is-valid]="fieldState().valid()"
  >
    <option [value]=""></option>
    @for (option of options(); track $index) {
      <option [value]="option.value">{{ option.message }}</option>
    }
  </select>
  <span>{{ label() }}</span>
</label>
@if (fieldState().invalid() && fieldState().touched()) {
  <p class="error">
    {{ fieldState().errorSummary()?.[0]?.message }}
  </p>
}
```

De nuevo encontramos las dos particularidades mencionadas en los radio bttons

- marcarlo touched cuando se pierde el foco, para que se muestren los errores de validación cuando el usuario interactúa con el control
- mostrar los errores de validación como `errorSummary()` en lugar de `errors()`, ya que el control de radio buttons no tiene un valor primitivo, sino un objeto.

El css alinea los selects con el aspecto delos inputs

```css
.form-control {
  padding-block-start: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
select {
  padding: 0.5rem;
  font-size: 1rem;
  color: var(--color-primary-hot);
  background-color: var(--color-background-primary);
  border: none;
  border-block-end: 2px solid var(--color-primary);
  border-radius: 4px;
  -webkit-appearance: none;
  -ms-appearance: none;
  -moz-appearance: none;
  appearance: none;

  &:focus-visible {
    outline: var(--color-primary) auto 1px;
    background-color: var(--color-background);
  }
}

span {
  font-size: 0.8rem;
  color: var(--color-primary);
  margin-bottom: 0.2rem;
  position: relative;
  top: -2rem;
}

select:focus-visible + span,
select.is-valid + span {
  color: var(--color-primary-hot);
  top: -4rem;
}

.error {
  color: var(--color-tertiary);
  font-size: 0.8rem;
}
```

### Mejoras en los custom controls

Los componentes creados son solo ejemplos simples de controles personalizados. En la practica puede ser necesario tener en cuenta la posibilidad de otros atributos y eventos, que se pueden definir de forma específica.

De esa forma el API expuesto por los componentes podría incluir:

- name?: string
- disabled?: boolean
- readonly?: boolean
- tabIndex?: number
- autocomplete?: string
- indeterminate?: boolean
- ariaLabel?: string
- ariaDescribedBy?: string
- nativeAttrs?: Record<string, string | number | boolean | null | undefined>

Otros outputs, como `blur` y `focus`, podemos hacer que el componente sea más completo y reutilizable.

La ultima propiedad `nativeAttrs` es un objeto que permite pasar cualquier atributo nativo de HTML al input nativo del control, para que el componente sea más flexible y se pueda utilizar en diferentes contextos.

Para usar esta propiedad necesitamos:

-  en el template, añadir una referencia al control nativo.
-  en el componente, definir el input que recibirá `nativeAttrs`
-  en el constructor, crear un effect vinculado a este input que invoque un método auxiliar
-  en el método, iterar sobre las propiedades del objeto `nativeAttrs` y añadirlas al control nativo mediante Renderer2 y su método `setAttribute()`
 
```html
<input type="checkbox" [formField]="fieldState" #nativeInput />
```

```ts
type NativeAttrs = Record<string, string | number | boolean | null | undefined>;

export class CheckBox {
  readonly #renderer = inject(Renderer2);
  readonly #nativeAttrs = input<NativeAttrs>({});
  readonly #nativeInput = viewChild.required<ElementRef<HTMLInputElement>>('nativeInput');

  #previousNativeAttrKeys = new Set<string>();

  constructor() {
    effect(() => {
      const inputEl = this.#nativeInput();
      if (!inputEl) {
        return;
      }

      this.applyNativeAttrs(inputEl.nativeElement, this.#nativeAttrs());
    });
  }

  private applyNativeAttrs(element: HTMLInputElement, attrs: NativeAttrs): void {
    const nextKeys = new Set(Object.keys(attrs));

    for (const key of this.#previousNativeAttrKeys) {
      if (!nextKeys.has(key)) {
        this.renderer.removeAttribute(element, key);
      }
    }

    for (const [key, value] of Object.entries(attrs)) {
      if (value === null || value === undefined || value === false) {
        this.renderer.removeAttribute(element, key);
        continue;
      }

      if (value === true) {
        this.renderer.setAttribute(element, key, '');
        continue;
      }

      this.renderer.setAttribute(element, key, String(value));
    }

    this.#previousNativeAttrKeys = nextKeys;
  }
}
```

Este sería un buen caso de uso de cuando crear un directiva propia en Angular, incorpodrando este código y evitando la necesidad de repetirlo en cada uno de los controles personalizados. 

#### 🧿Directiva NativeAttrs

Creamos la directiva

```shell
ng g d core/directives/native-attrs --project demo-03 
```

Incluimos la funcionalidad que podríamos haber añadido en los componentes

- creamos un tipo para los posibles atributos nativos, que es un objeto "Record" con claves de tipo string y valores de tipo string, number, boolean, null o undefined

```ts
export type NativeAttrRecord = Record<string, string | number | boolean | null | undefined>;
```

-  en el selector, limitamos el uso de la directiva a los controles de formulario

```ts
@Directive({
  selector: 'input[alcNativeAttrs], textarea[alcNativeAttrs], select[alcNativeAttrs]',
  // selector: '[alcNativeAttrs]',
})
```

- en la directiva, como suele ser habitual, inyectamos Renderer2 y ElementRef, que nos permiten acceder al elemento nativo del control y modificar sus atributos de forma segura y compatible con Angular.

- como input recibimos los atributos, de acuerdo con el tipo `NativeAttrRecord` definido anteriormente, y creamos un set para almacenar las claves de los atributos que se han aplicado previamente, para poder eliminarlos si ya no están presentes en el objeto de atributos.

```ts
export class NativeAttrs {
  readonly alcNativeAttrs = input<NativeAttrRecord>({});
  readonly #elementRef = inject(
    ElementRef<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  );
  readonly #renderer = inject(Renderer2);

  #previousKeys = new Set<string>();
}
```

-  en el constructor, crear un effect vinculado al input que invoque un método auxiliar

```ts
constructor() {
  effect(() => {
    this.applyAttrs(this.alcNativeAttrs());
  });
}
```

-  en el método, igual que anteriormente, terar sobre las propiedades del objeto `nativeAttrs` y añadirlas al control nativo mediante Renderer2 y su método `setAttribute()`

```ts
private applyAttrs(attrs: NativeAttrRecord): void {
  const element = this.#elementRef.nativeElement;
  const nextKeys = new Set(Object.keys(attrs));

  // Remove attributes that are no longer present
  for (const key of this.#previousKeys) {
    if (!nextKeys.has(key)) {
      this.#renderer.removeAttribute(element, key);
    }
  }

  // Add or update attributes based on the new values
  for (const [key, value] of Object.entries(attrs)) {
    if (value === null || value === undefined || value === false) {
      this.#renderer.removeAttribute(element, key);
      continue;
    }

    if (value === true) {
      this.#renderer.setAttribute(element, key, '');
      continue;
    }

    this.#renderer.setAttribute(element, key, String(value));
  }

  this.#previousKeys = nextKeys;
}
```

En el template de nuestros componentes personalizado, aplicamos la directiva al control nativo (input, textarea, select).

```html
<input 
  type="{{ type() }}" 
  id="{{ id() }}" 
  [formField]="fieldState" 
  placeholder=" " 
  [alcNativeAttrs]="nativeAttrs()"
/>
```

Y en el componente recogemos el objeto de atributos nativos como input.

```ts
export class Input {
  //...
    readonly nativeAttrs = input<NativeAttrRecord>({});
}
```

En el formulario que utiliza nuestro componente personalizado, podemos pasar cualquier atributo nativo que queramos aplicar al control nativo, como los atributos `aria-` que permiten mejorar la accesibilidad del formulario, o cualquier otro atributo que necesitemos.

```html
<alc-input
      aria-label="Email"
      [label]="'Email'"
      type="email"
      [fieldState]="registerForm.email()"
      [nativeAttrs]="{ 'aria-describedby': 'email-error' }"
    />
```