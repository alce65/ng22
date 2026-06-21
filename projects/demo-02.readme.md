# Demo 01

- [Demo 01](#demo-01)
  - [Proyecto demo-02](#proyecto-demo-02)
  - [Estilos](#estilos)
    - [Variables CSS](#variables-css)
    - [Reset de estilos](#reset-de-estilos)
  - [Scaffolding](#scaffolding)
    - [Reubicación de app](#reubicación-de-app)
  - [Core: Componente sample: Course-Item](#core-componente-sample-course-item)
  - [Core - Componentes del layout](#core---componentes-del-layout)
    - [Elementos de Angular en los componentes del layout](#elementos-de-angular-en-los-componentes-del-layout)
    - [1. `alc-app`](#1-alc-app)
    - [2. `alc-header`: contiene un grid con dos filas](#2-alc-header-contiene-un-grid-con-dos-filas)
    - [3. `alc-footer`](#3-alc-footer)
    - [4. Otros componentes (Card y Menu)](#4-otros-componentes-card-y-menu)
    - [Resultados: Componentes del layout](#resultados-componentes-del-layout)
  - [Core - Componentes de navegación (Menu, Menu Mobile, Socials)](#core---componentes-de-navegación-menu-menu-mobile-socials)
    - [Elementos de Angular en los componentes de navegación](#elementos-de-angular-en-los-componentes-de-navegación)
    - [Tipos y datos para el menú](#tipos-y-datos-para-el-menú)
    - [1. `alc-menu`: muestra las opciones de navegación.](#1-alc-menu-muestra-las-opciones-de-navegación)
    - [2. `alc-menu-mobile`](#2-alc-menu-mobile)
    - [3. `alc-socials`](#3-alc-socials)
    - [Resultados: Componentes de navegación](#resultados-componentes-de-navegación)
  - [Core - Componentes gráficos](#core---componentes-gráficos)
    - [Elementos de Angular en los componentes gráficos](#elementos-de-angular-en-los-componentes-gráficos)
    - [1. `alc-separator`](#1-alc-separator)
    - [2. `alc-logo-angular`](#2-alc-logo-angular)
    - [3. `alc-logo-coders`](#3-alc-logo-coders)
    - [4. `alc-card`](#4-alc-card)
    - [Resultados: Componentes gráficos](#resultados-componentes-gráficos)
  - [Core - Componentes de funcionalidad (right-side del header)](#core---componentes-de-funcionalidad-right-side-del-header)
    - [Elementos de Angular en los componentes de funcionalidad](#elementos-de-angular-en-los-componentes-de-funcionalidad)
    - [1. `alc-search`](#1-alc-search)
    - [2. `alc-search-ref`](#2-alc-search-ref)
    - [3. `alc-user`](#3-alc-user)
    - [4. `alc-toggle`](#4-alc-toggle)
    - [Resultados: Componentes de funcionalidad](#resultados-componentes-de-funcionalidad)
  - [Core - versión final](#core---versión-final)
    - [Components en la versión final](#components-en-la-versión-final)
    - [Elementos de Angular utilizados](#elementos-de-angular-utilizados)
  - [Pages](#pages)
    - [Páginas iniciales](#páginas-iniciales)
    - [Página about (Angular)](#página-about-angular)
    - [Resultados: Páginas iniciales (sin router)](#resultados-páginas-iniciales-sin-router)
  - [Comunicación entre componentes: inputs](#comunicación-entre-componentes-inputs)
  - [Dashboard: counters](#dashboard-counters)
    - [1. `alc-counter`: contador inicial](#1-alc-counter-contador-inicial)
    - [2. `alc-counter`: contador mejorado](#2-alc-counter-contador-mejorado)
    - [2.  `alc-counters-list`: lista de contadores](#2--alc-counters-list-lista-de-contadores)
    - [Resultados: Páginas dashboard con contadores](#resultados-páginas-dashboard-con-contadores)
  - [Core - Componentes modal y menu mobile](#core---componentes-modal-y-menu-mobile)
    - [El componente modal](#el-componente-modal)
    - [El header](#el-header)
    - [En alc-menu-mobile: el icono burger del menú](#en-alc-menu-mobile-el-icono-burger-del-menú)
    - [Incorporación del menú vertical en el modal](#incorporación-del-menú-vertical-en-el-modal)
    - [Resultados: Despliegue del menu mobile](#resultados-despliegue-del-menu-mobile)

## Proyecto demo-02

Creamos el proyecto seleccionando las opciones

- estilo CSS (`--style css`)
- sin SSR (`--ssr false`)
- prefijo de selector (`p alc`)
- template inline (`-t`)
- estilos inline (`-s`)  

```shell
ng g app demo-01 --style css --ssr false -p alc -t -s 
```

Copiamos desde demo-01:

- ficheros de configuración: `tsconfig.app.json`, `tsconfig.spec.json`
  Así Modificaciones de tsconfig: ` "rootDir": "'./src'"` 
- ficheros de estilos globales: `styles.css` y `variables.css`


Se asume el conocimiento de:

- componentes: selector, template, estilos
- content projection

No se experimenta con ellos pero también se dan por conocidos:

- view encapsulation
- change detection
- lifecycle hooks 

Al final del proyecto se aborda la comunicación entre componentes, usando inputs y outputs.

## Estilos

En el fichero de estilos globales (styles.css) se definen: 

- las variables CSS para los colores 
- las variables CSS para la tipografía (fuentes) 
- el reset de los elementos principales: *, html, body, p
 
### Variables CSS

Las variables se utilizan en toda la aplicación para mantener la consistencia visual.

Las variables CSS para los colores definen 

- una paleta de colores para el tema claro
- una paleta de colores para el tema oscuro
- una paleta final valida para ambos temas, usando la función light-dark()

Las variables CSS para tipografía definen las fuentes ba´sca y para los título

Se instalan las fuentes necesarias para la aplicación, en este caso las fuentes `Inter`
y `Inter Tight`.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100..900;1,100..900&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet">
```

Alternativamente podrían instalarse las fuentes localmente mediante [Fontsource](https://fontsource.org/docs/getting-started/install), utilizando el comando:

```shell
npm install @fontsource/inter @fontsource/inter-tight
```

### Reset de estilos

- en todos los elementos se aplican box-sizing: border-box para facilitar el manejo de los tamaños y márgenes.

- en el elemento html se establece 
  - la fuente base
  - la altura del elemento, para que la hereda el body
  - el tema claro por defecto.
  - usando :has(#theme-toggle:checked) se cambia al tema oscuro cuando el toggle de cambio de tema está activado.

- en el body se establece la altura para que ocupe toda la pantalla, se eliminan los márgenes y se establece un fondo y un color para el texto usando las variables CSS definidas para el tema.

- en los párrafos se elimina el margen

```css styles.css
:root {
  --electric-violet: oklch(53.18% 0.28 296.97);
  --french-violet: oklch(47.66% 0.246 305.88);
  --vivid-pink: oklch(69.02% 0.277 332.77);

  --bright-blue: oklch(51.01% 0.274 263.83);
  --hot-red: oklch(61.42% 0.238 15.34);
  --orange-red: oklch(63.32% 0.24 31.68);

  --gray-900: oklch(19.37% 0.006 300.98);
  --gray-700: oklch(36.98% 0.014 302.71);
  --gray-400: oklch(70.9% 0.015 304.04);
  --gray-100: oklch(95.11% 0.006 301.97);
  --gray-50: oklch(98.93% 0.003 301.97);

  --color-text-light: var(--gray-900);
  --color-background-light: var(--gray-50);
  --color-background-primary-light: var(--gray-100);

  /* Brand colors */
  --color-primary-light: var(--electric-violet);
  --color-primary-hot-light: var(--french-violet);
  --color-secondary-light: var(--vivid-pink);

  /* otros colores secundarios */
  --color-accent-light: var(--bright-blue);
  --color-tertiary-light: var(--orange-red);
  --color-tertiary-hot-light: var(--hot-red);

  /* Dark Theme */
  --color-text-dark: var(--gray-100);
  --color-background-dark: var(--gray-700);
  --color-background-primary-dark: var(--gray-900);

  /* Brand colors */
  --color-primary-dark: var(--electric-violet);
  --color-primary-hot-dark: var(--french-violet);
  --color-secondary-dark: var(--vivid-pink);

  /* otros colores secundarios */
  --color-accent-dark: var(--bright-blue);
  --color-tertiary-dark: var(--orange-red);
  --color-tertiary-hot-dark: var(--hot-red);

  /* Apply theme variables */
  --color-text: light-dark(var(--color-text-light), var(--color-text-dark));
  --color-background: light-dark(var(--color-background-light), var(--color-background-dark));
  --color-background-primary: light-dark(
    var(--color-background-primary-light),
    var(--color-background-primary-dark)
  );
  --color-primary: light-dark(var(--color-primary-light), var(--color-primary-dark));
  --color-primary-hot: light-dark(var(--color-primary-hot-light), var(--color-primary-hot-dark));
  --color-secondary: light-dark(var(--color-secondary-light), var(--color-secondary-dark));
  --color-accent: light-dark(var(--color-accent-light), var(--color-accent-dark));
  --color-tertiary: light-dark(var(--color-tertiary-light), var(--color-tertiary-dark));
  --color-tertiary-hot: light-dark(var(--color-tertiary-hot-light), var(--color-tertiary-hot-dark));

  --red-to-pink-to-purple-vertical-gradient: linear-gradient(
    180deg,
    var(--orange-red) 0%,
    var(--vivid-pink) 50%,
    var(--electric-violet) 100%
  );

  --red-to-pink-to-purple-horizontal-gradient: linear-gradient(
    90deg,
    var(--orange-red) 0%,
    var(--vivid-pink) 50%,
    var(--electric-violet) 100%
  );

  --pill-accent: var(--bright-blue);
}

:root {
  --fontfamily:
    'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';

  --font-family-heading:
    'Inter Tight', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial,
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
}

*, *::before, *::after {
  box-sizing: border-box;
}

html {
  font-family: var(--font-family);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100dvh;
  color-scheme: light dark;
}

html:has(#theme-toggle:checked) {
  color-scheme: dark;
}

html:has(#theme-toggle:indeterminate) {
  color-scheme: light;
}

body {
  margin: 0;
  padding: 0;
  width: 100%;
  min-width: 560px;
  height: 100%;
  color: var(--color-text);
  background-color: var(--color-background);
}

p {
  margin: 0;
}
```

## Scaffolding

Utilizando un **enfoque basado en características (features) o dominios**, los archivos se organizan según las características o dominios de la aplicación.  

Se crean carpetas para cada característica principal de la aplicación y para recalcar la separación entre el core y las características, 
se agrupan todas las últimas en una carpeta

  - src
    - app
      - core (elementos comunes a toda la aplicación)
      - features
        - usuarios
        - productos
        - pedidos

Dentro de cada carpeta tendríamos los componentes, servicios, tipos o modelos y otros elementos relacionados con esa característica, agrupados en subcarpetas para cada tipo de archivo dentro de la carpeta de la característica. 

 - src
    - app
      - core 
        - components
        - services
        - types

Este enfoque puede ser más escalable y facilitar la navegación en proyectos grandes, ya que agrupa todo lo relacionado con una característica en un solo lugar. Entre otras versiones, suele relacionarse este enfoque con la arquitectura **Vertical Slice** o incluso con el **Domain-Driven Design (DDD)**.

### Reubicación de app

Se reubica el componente raíz `App` a `core/components/app` para que sirva como contenedor principal de la aplicación, manteniendo el mismo scaffolding que el resto de los componentes del core

- sin componentes
- layout inicial y estilos

```ts

@Component({
  selector: 'alc-root',
  imports: [RouterOutlet],
  template: `
    <header>header</header>
    <main class="container">
      <router-outlet />
      <p>Este es un proyecto de demostración de Angular 22</p>
    </main>
    <footer>footer</footer>
  `,
  styles: `
    :host {
      display: grid;
      grid-template-rows: auto 1fr auto;
      min-height: 100vh;
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
    }
    main.container {
      padding: 1rem 2rem;
      width: 100%;
      min-height: 90%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 1rem;
      position: relative;
    }
    @media (width > 600px) {
      .wide {
        align-self: stretch;
        margin-inline: 5rem;
      }
    }
  `,
})
export class App {}
```

Los estilos definen un grid de 3 filas, para el header, el main y el footer, y un main con display flex para centrar su contenido. Además se define una media query para que los elementos con clase `wide` se estiren a lo ancho de la pantalla a partir de un ancho de 600px.

Nota: el test se incluye ya ajustado, a partir de demo-01

## Core: Componente sample: Course-Item

## Core - Componentes del layout

Creamos los componentes de layout que se utilizarán en toda la aplicación, como el header, el footer y el menú de navegación.

```shell
ng g c core/components/header --project demo-01
ng g c core/components/footer  --project demo-01
ng g c core/components/menu  --project demo-01
```

La relación entre estos componentes y el componente raíz `alc-app` se puede representar en un diagrama de árbol:

- `alc-app`
  - `alc-header`
    - `alc-menu`
  - `router-outlet` 
  - `alc-footer`

### Elementos de Angular en los componentes del layout

En estos componentes vemos 

- el **binding de expresiones JS** en el template, usando `{{ }}` para mostrar el título y el subtítulo del header, y para mostrar el año actual en el footer.
- el uso de **signals** para definir propiedades reactivas en los componentes, incluso cuando no este previsto que cambien, como el título y el subtítulo del header, y el año actual en el footer.
- el uso de la **proyección de contenido** (content projection) para proyectar el menú dentro del header
- el uso de `router-outlet` que más adelante servirá para mostrar las páginas de la aplicación
- los **estilos** de cada componente, usando displays de CSS (grid, flex) y media queries para adaptar el diseño a diferentes tamaños de pantalla.

### 1. `alc-app`

Incluye en su template los componentes `alc-header` y `alc-footer`, junto con la etiqueta <main> envolviendo el `router-outlet`. El `alc-header` contiene el `alc-menu`, proyectándolo en el componente header mediante content projection. 

```ts app.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { Menu } from '../menu/menu';

@Component({
  selector: 'alc-root',
  imports: [RouterOutlet, Header, Footer, Menu],
  template: `
    <alc-header>
      <alc-menu />
    </alc-header>
    <main class="container">
      <router-outlet />
      <p>Páginas de la aplicación</p>
    </main>
    <alc-footer />
  `,
  styles: `
    :host {
      display: grid;
      grid-template-rows: auto 1fr auto;
      min-height: 100vh;
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
    }
    main.container {
      padding: 1rem 2rem;
      width: 100%;
      min-height: 90%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1rem;
      position: relative;
    }
  `,
})
export class App {}
```

### 2. `alc-header`: contiene un grid con dos filas

La primera incluye un dos divs, clases `right-side` y `left-side`, para colocar logos e iconos, junto con un hgroup en el centro, para el heading `h1`.
La segunda fila incluye un párrafo con el subtítulo y un div con clase `desktop-only` para proyectar el menú en la versión de escritorio.

```ts header.ts
import { Component, signal } from '@angular/core';

@Component({
  selector: 'alc-header',
  imports: [],
  template: `
    <header class="container">
      <div class="left-side"></div>
      <hgroup>
        <h1>{{ title() }}</h1>
      </hgroup>
      <div class="right-side"></div>
      <div class="bottom-row">
        <p>{{ subtitle() }}</p>
        <div class="desktop-only">
          <ng-content></ng-content>
        </div>
      </div>
    </header>
  `,
  styles: [
    `
      :host {
        margin-bottom: 1.5rem;
        min-height: 15vh;
        color: var(--color-primary-hot);
        background-color: var(--color-background-primary);
      }

      header {
        padding: 1rem 2rem;
        display: grid;
        grid-template-columns: minmax(auto, max-content) 1fr minmax(auto, max-content);
        justify-items: center;
        align-items: center;
        text-align: center;
      }

      .left-side {
        min-width: 5rem;
      }

      hgroup {
        max-width: 15rem;
        h1 {
          color: var(--color-primary);
          font-family: var(--font-family-heading);
          font-size: 3.125rem;
          font-weight: 500;
          line-height: 100%;
          letter-spacing: -0.125rem;
          margin: 0;
        }
      }

      .right-side {
        min-width: 5rem;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 0.5rem;

        .icons {
          display: flex;
          gap: 1rem;
        }
      }

      .bottom-row {
        grid-column: span 3;
        margin-top: 0.6rem;

        .desktop-only {
          display: none;
        }
      }
    `,
    `
      /*
        @media screen and (min-width: 900px) {
        */
      @media (width > 800px) {
        hgroup {
          max-width: none;
        }

        alc-menu-mobile {
          display: none;
        }
        .bottom-side {
          .desktop-only {
            display: block;
            margin-top: 1rem;
          }
        }
      }
    `,
  ],
})
export class Header {
  protected readonly title = signal('Curso de Angular 22');
  protected readonly subtitle = signal('Aprende a desarrollar aplicaciones con Angular');

  // protected readonly isModalOpen = signal(false);
  // readonly menuTemplate = input<TemplateRef<MenuTemplateContext>>();
  // protected readonly desktopMenuContext: MenuTemplateContext = { isVertical: false };
  // protected readonly mobileMenuContext: MenuTemplateContext = { isVertical: true };

  // toggleModal(isOpen: boolean) {
  //   console.log('Toggling modal:', isOpen);
  //   this.isModalOpen.set(isOpen);
  // }
}
```

En los estilos vemos como se puede incorporar una media-query a nivel de componente usando la nueva sintaxis de media queries: `@media (width > 800px)`. Con ella hacemos que el menú móvil se oculte y el menú de escritorio se muestre a partir de un ancho de 800px. 

### 3. `alc-footer`

Contiene un párrafo con el texto "Copyright 2024" (más adelante añadiremos el componente `alc-socials` para mostrar los iconos de redes sociales).

```ts footer.ts
import { Component, signal } from '@angular/core';

@Component({
  selector: 'alc-footer',
  template: `
    <footer>
      <address>
        <p>{{ autor() }}</p>
        <p>{{ brand() }} © {{ today().getFullYear() }}</p>
      </address>
    </footer>
  `,
  styles: `
    :host {
      background-color: var(--color-background-primary);
      color: var(--color-primary-hot);
      display: flex;
      justify-content: center;
      align-items: center;
      border-top: 2px solid var(--color-primary);
      margin-top: 1rem;
      padding-block-start: 1rem;
      min-height: 10vh;
    }
    footer {
      text-align: center;
    }
    address {
      font-style: normal;
    }
  `,
})
export class Footer {
  protected readonly autor = signal('Alejandro Cerezo');
  protected readonly brand = signal('ICONO Training for Indra');
  protected readonly today = signal(new Date());
}
```

### 4. Otros componentes (Card y Menu)

1. `alc-menu`: contiene las opciones de navegación para la versión de escritorio.

2. Añadir aquí el componente Card, mencionado más adelante

### Resultados: Componentes del layout

![Primera versión para mobile](./assets/initial-mobile.png)

![Primera versión para desktop](./assets/initial-desktop.png)

## Core - Componentes de navegación (Menu, Menu Mobile, Socials)

Creamos los componentes de navegación que se utilizarán en toda la aplicación, como el menú de navegación (ya creado), el menú móvil y los iconos de redes sociales.

```shell
ng g c core/components/menu-mobile  --project demo-01
ng g c core/components/socials  --project demo-01
```

- `alc-menu` (ya creado)
- `alc-socials`
- `alc-menu-mobile`

### Elementos de Angular en los componentes de navegación

En estos componentes vemos

- la creación de **interfaces** para definir **datos** útiles para la aplicación, como las opciones de menú y las opciones de redes sociales.
- **iteración** sobre arrays de datos en el template, usando **`@for`** para mostrar cada opción como un enlace de navegación.
- uso de **svg** dentro del template, personalizándolos con propiedades y atributos vinculados a propiedades del componente, como el color, el tamaño y el evento de click.
- **vinculación (binding) de eventos** de click a métodos del componente, que más adelante se utilizará para abrir un modal con el menú de navegación en la versión móvil.
- el uso de **`@switch`** en el template para mostrar el icono correspondiente a cada red social según su nombre.

### Tipos y datos para el menú

Definimos un tipo para las opciones del menú:

```ts
export type MenuOption = {
  label: string;
  path: string;
};
```

En el fichero de rutas (`app.routes.ts`) se define un array de opciones de menú, cada una con una etiqueta y una ruta:

```ts app.routes.ts 
const MENU_OPTIONS: MenuOption[]   = [
  { label: 'Inicio', path: '/' },
  { label: 'Tareas', path: '/tasks' },
  { label: 'Angular', path: '/angular' },
];
```

### 1. `alc-menu`: muestra las opciones de navegación.

En el componente se crea una señal que contiene las opciones del menú, y se itera sobre ellas en el template para mostrar cada opción como un enlace de navegación:

```ts menu.ts
import { Component, signal } from '@angular/core';
import { MenuOption } from '../../types/menu.option';
import { MENU_OPTIONS } from '../../../app.routes';

@Component({
  selector: 'alc-menu',
  imports: [],
  template: `
    <nav>
      <ul>
        @for (option of options(); track option.path) {
          <li>
            <a href="{{ option.path }}">
              {{ option.label }}
            </a>
          </li>
        }
      </ul>
    </nav>
  `,
  styles: `
    nav {
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        gap: 1rem;
      }

      a {
        color: inherit;
        text-decoration: none;
        font-weight: bold;
      }
    }
  `,
})
export class Menu {
  protected readonly options = signal<MenuOption[]>(MENU_OPTIONS);
}
```

De momento la etiquetas anchor (\<a>) utilizan `href` y referencias internas (`#`) para navegar dentro de una misma página haciendo scroll, pero más adelante se cambiará a `routerLink` para aprovechar el enrutamiento de Angular.

### 2. `alc-menu-mobile` 

Contiene el icono de hamburguesa característico en los diseños mobile.

El icono en formato SVG se puede obtener de [fontawesome](https://fontawesome.com/icons/bars?s=solid), [svgrepo](https://www.svgrepo.com/svg/5125/hamburger-menu) o cualquier otra fuente de SVGs.

El svg se puede incrustar directamente en el template del componente, lo que permite usar propiedades de svg (fill, stroke, etc.) o definirle atributos (con `attr`) y vincularlos (bind) a propiedades del componente, como el color, el tamaño y el evento de click.

Para asignarle el color del contenedor, se utiliza el valor `currentColor` en el atributo `fill` del svg, lo que hace que herede el color del contenedor padre.

```ts
import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'alc-menu-mobile',
  imports: [],
  template: `
    <nav>
      <a href="" id="menu-icon" (click)="toggleMenu($event)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
          [attr.width]="size()"
          [attr.height]="size()"
          fill="currentColor"
        >
          <title>Menu</title>
          <path
            d="M96 160C96 142.3 110.3 128 128 128L512 128C529.7 128 544 142.3 544 160C544 177.7 529.7 192 512 192L128 192C110.3 192 96 177.7 96 160zM96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320zM544 480C544 497.7 529.7 512 512 512L128 512C110.3 512 96 497.7 96 480C96 462.3 110.3 448 128 448L512 448C529.7 448 544 462.3 544 480z"
          />
        </svg>
      </a>
    </nav>
  `,
  styles: `
    a {
      text-decoration: none;
      color: inherit;
    }
  `,
})
export class MenuMobile {
  protected readonly size = signal('3rem');

  toggleMenu(event: Event) {
    console.log('Abriendo menú mobile');
  }
}
```

El evento click del icono de hamburguesa está vinculado al método `toggleMenu`, que recibe el evento y lo previene para evitar que el enlace navegue a otra página.
De momento el método de respuesta al click no tiene ninguna funcionalidad, pero más adelante se añadirá un evento de click para abrir un modal con el menú de navegación.

El componente se se incorpora en el `alc-header`, en el div con la clase `right-side`, y se muestra u oculta según el ancho de la pantalla, usando media queries en los estilos del componente `alc-header`. 

### 3. `alc-socials`

Contiene los iconos de redes sociales para mostrar en el footer. 

Por una parte definimos un tipo para las opciones de redes sociales, con una etiqueta, una url y el svg correspondiente:

```ts
export interface SocialLink {
  name: string;
  href: string;
  ariaLabel: string;
}
```

El componente `alc-socials` declara como signal un array de opciones de redes sociales y su template itera sobre el, mostrando cada una como un enlace (\<a>) a la url correspondiente.

Por otro lado obtenemos los iconos en formato SVG, en alguna de las fuentes ya citadas y se incorporan al template dentro de un @switch, mostrando el icono correspondiente a cada red social según su nombre. Para asignarle el color del contenedor, se utiliza el valor `currentColor` en el atributo `fill` del svg, lo que hace que herede el color del contenedor padre.

### Resultados: Componentes de navegación

![Navegación en la versión mobile](./assets/nav-mobile.png)

![Navegación en la versión desktop](./assets/nav-desktop.png)

## Core - Componentes gráficos

Creamos los componentes gráficos que se utilizarán en toda la aplicación, como el separador, los logos de Angular y Coders y el componente de tarjeta.

```shell
ng g c core/components/separator --project demo-01
ng g c core/components/logo-angular --project demo-01
ng g c core/components/logo-coders --project demo-01
ng g c core/components/card --project demo-01
```

- `alc-separator`
- `alc-logo-angular`
- `alc-logo-coders`
- `alc-card`

Los primeros componentes de este bloque son componentes gráficos que se utilizan en el header y la aplicación, para mostrar los logos de Angular y Coders, así como un separador entre el header y el contenido principal.

El último de ellos, `alc-card`, es un componente de utilidad para mostrar contenido en formato de tarjeta, con estilos predefinidos para el fondo, los bordes, las sombras y el padding. Este componente se utilizará más adelante para mostrar el contenido de las páginas de la aplicación.

### Elementos de Angular en los componentes gráficos

En estos componentes vemos

- **componentes de presentación** (presentational components) o componentes gráficos mínimos, que no tienen lógica de negocio ni estado propio, y que se limitan a mostrar contenido  **encapsulando estilos CSS** apartando semántica y homogeneidad de los elementos de la aplicación, siendo todos componentes
- uso de **ficheros svg como template**, con la posibilidad de aplicar en ellos todos los elementos de Angular, como binding de propiedades y eventos
- componentes de **utilidad** (utility components) o del **sistema de diseño** (design system), como `alc-card`, que se pueden reutilizar en toda la aplicación para mostrar contenido en formato de tarjeta, con estilos predefinidos para el fondo, los bordes, las sombras y el padding.

### 1. `alc-separator`

Es un componente que muestra una línea horizontal de separación entre el header y el contenido principal. Se limita a aplicar en un div un gradiente definido en el css utilizando la paleta de colores de la aplicación.

```ts separator.ts
import { Component } from '@angular/core';

@Component({
  selector: 'alc-separator',
  imports: [],
  template: ` <div role="separator" aria-label="Divider" class="divider"></div> `,
  styles: `
    .divider {
      width: 100%;
      height: 3px;
      background: var(--red-to-pink-to-purple-horizontal-gradient);
      margin-block: 0rem;
    }
  `,
})
export class Separator {}
```

El componente `alc-separator` se incorpora en el `alc-header`, justo debajo del <header>, para separar visualmente el header del contenido principal de la aplicación.

### 2. `alc-logo-angular`

Es un componente que muestra el logo de Angular junto con el nombre del framework en formato SVG, tal como se incluye en la aplicación ejemplo incluida en la instalación completa de Angular (workspace y project al tiempo)

Como en este caso no se modifica el SVG, este puede utilizarse directamente com template, vinculándolo a la propiedad templateURL del decorador @Component, lo que permite mantener el código del componente más limpio y separado del código del SVG.

```svg logo-ng.svg
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 982 239"
  fill="none"
  class="angular-logo"
>
  <g clip-path="url(#a)">
    <path
      fill="url(#b)"
      d="M388.676 191.625h30.849L363.31 31.828h-35.758l-56.215 159.797h30.848l13.174-39.356h60.061l13.256 39.356Zm-65.461-62.675 21.602-64.311h1.227l21.602 64.311h-44.431Zm126.831-7.527v70.202h-28.23V71.839h27.002v20.374h1.392c2.782-6.71 7.2-12.028 13.255-15.956 6.056-3.927 13.584-5.89 22.503-5.89 8.264 0 15.465 1.8 21.684 5.318 6.137 3.518 10.964 8.673 14.319 15.382 3.437 6.71 5.074 14.81 4.992 24.383v76.175h-28.23v-71.92c0-8.019-2.046-14.237-6.219-18.819-4.173-4.5-9.819-6.791-17.102-6.791-4.91 0-9.328 1.063-13.174 3.272-3.846 2.128-6.792 5.237-9.001 9.328-2.046 4.009-3.191 8.918-3.191 14.728ZM589.233 239c-10.147 0-18.82-1.391-26.103-4.091-7.282-2.7-13.092-6.382-17.511-10.964-4.418-4.582-7.528-9.655-9.164-15.219l25.448-6.136c1.145 2.372 2.782 4.663 4.991 6.954 2.209 2.291 5.155 4.255 8.837 5.81 3.683 1.554 8.428 2.291 14.074 2.291 8.019 0 14.647-1.964 19.884-5.81 5.237-3.845 7.856-10.227 7.856-19.064v-22.665h-1.391c-1.473 2.946-3.601 5.892-6.383 9.001-2.782 3.109-6.464 5.645-10.965 7.691-4.582 2.046-10.228 3.109-17.101 3.109-9.165 0-17.511-2.209-25.039-6.545-7.446-4.337-13.42-10.883-17.757-19.474-4.418-8.673-6.628-19.473-6.628-32.565 0-13.091 2.21-24.301 6.628-33.383 4.419-9.082 10.311-15.955 17.839-20.7 7.528-4.746 15.874-7.037 25.039-7.037 7.037 0 12.846 1.145 17.347 3.518 4.582 2.373 8.182 5.236 10.883 8.51 2.7 3.272 4.746 6.382 6.137 9.327h1.554v-19.8h27.821v121.749c0 10.228-2.454 18.737-7.364 25.447-4.91 6.709-11.538 11.7-20.048 15.055-8.509 3.355-18.165 4.991-28.884 4.991Zm.245-71.266c5.974 0 11.047-1.473 15.302-4.337 4.173-2.945 7.446-7.118 9.573-12.519 2.21-5.482 3.274-12.027 3.274-19.637 0-7.609-1.064-14.155-3.274-19.8-2.127-5.646-5.318-10.064-9.491-13.255-4.174-3.11-9.329-4.746-15.384-4.746s-11.537 1.636-15.792 4.91c-4.173 3.272-7.365 7.772-9.492 13.418-2.128 5.727-3.191 12.191-3.191 19.392 0 7.2 1.063 13.745 3.273 19.228 2.127 5.482 5.318 9.736 9.573 12.764 4.174 3.027 9.41 4.582 15.629 4.582Zm141.56-26.51V71.839h28.23v119.786h-27.412v-21.273h-1.227c-2.7 6.709-7.119 12.191-13.338 16.446-6.137 4.255-13.747 6.382-22.748 6.382-7.855 0-14.81-1.718-20.783-5.237-5.974-3.518-10.72-8.591-14.075-15.382-3.355-6.709-5.073-14.891-5.073-24.464V71.839h28.312v71.921c0 7.609 2.046 13.664 6.219 18.083 4.173 4.5 9.655 6.709 16.365 6.709 4.173 0 8.183-.982 12.111-3.028 3.927-2.045 7.118-5.072 9.655-9.082 2.537-4.091 3.764-9.164 3.764-15.218Zm65.707-109.395v159.796h-28.23V31.828h28.23Zm44.841 162.169c-7.61 0-14.402-1.391-20.457-4.091-6.055-2.7-10.883-6.791-14.32-12.109-3.518-5.319-5.237-11.946-5.237-19.801 0-6.791 1.228-12.355 3.765-16.773 2.536-4.419 5.891-7.937 10.228-10.637 4.337-2.618 9.164-4.664 14.647-6.055 5.4-1.391 11.046-2.373 16.856-3.027 7.037-.737 12.683-1.391 17.102-1.964 4.337-.573 7.528-1.555 9.574-2.782 1.963-1.309 3.027-3.273 3.027-5.973v-.491c0-5.891-1.718-10.391-5.237-13.664-3.518-3.191-8.51-4.828-15.056-4.828-6.955 0-12.356 1.473-16.447 4.5-4.009 3.028-6.71 6.546-8.183 10.719l-26.348-3.764c2.046-7.282 5.483-13.336 10.31-18.328 4.746-4.909 10.638-8.59 17.511-11.045 6.955-2.455 14.565-3.682 22.912-3.682 5.809 0 11.537.654 17.265 2.045s10.965 3.6 15.711 6.71c4.746 3.109 8.51 7.282 11.455 12.6 2.864 5.318 4.337 11.946 4.337 19.883v80.184h-27.166v-16.446h-.9c-1.719 3.355-4.092 6.464-7.201 9.328-3.109 2.864-6.955 5.237-11.619 6.955-4.828 1.718-10.229 2.536-16.529 2.536Zm7.364-20.701c5.646 0 10.556-1.145 14.729-3.354 4.173-2.291 7.364-5.237 9.655-9.001 2.292-3.763 3.355-7.854 3.355-12.273v-14.155c-.9.737-2.373 1.391-4.5 2.046-2.128.654-4.419 1.145-7.037 1.636-2.619.491-5.155.9-7.692 1.227-2.537.328-4.746.655-6.628.901-4.173.572-8.019 1.472-11.292 2.781-3.355 1.31-5.973 3.11-7.855 5.401-1.964 2.291-2.864 5.318-2.864 8.918 0 5.237 1.882 9.164 5.728 11.782 3.682 2.782 8.51 4.091 14.401 4.091Zm64.643 18.328V71.839h27.412v19.965h1.227c2.21-6.955 5.974-12.274 11.292-16.038 5.319-3.763 11.456-5.645 18.329-5.645 1.555 0 3.355.082 5.237.163 1.964.164 3.601.328 4.91.573v25.938c-1.227-.41-3.109-.819-5.646-1.146a58.814 58.814 0 0 0-7.446-.49c-5.155 0-9.738 1.145-13.829 3.354-4.091 2.209-7.282 5.236-9.655 9.164-2.373 3.927-3.519 8.427-3.519 13.5v70.448h-28.312ZM222.077 39.192l-8.019 125.923L137.387 0l84.69 39.192Zm-53.105 162.825-57.933 33.056-57.934-33.056 11.783-28.556h92.301l11.783 28.556ZM111.039 62.675l30.357 73.803H80.681l30.358-73.803ZM7.937 165.115 0 39.192 84.69 0 7.937 165.115Z"
    />
    <path
      fill="url(#c)"
      d="M388.676 191.625h30.849L363.31 31.828h-35.758l-56.215 159.797h30.848l13.174-39.356h60.061l13.256 39.356Zm-65.461-62.675 21.602-64.311h1.227l21.602 64.311h-44.431Zm126.831-7.527v70.202h-28.23V71.839h27.002v20.374h1.392c2.782-6.71 7.2-12.028 13.255-15.956 6.056-3.927 13.584-5.89 22.503-5.89 8.264 0 15.465 1.8 21.684 5.318 6.137 3.518 10.964 8.673 14.319 15.382 3.437 6.71 5.074 14.81 4.992 24.383v76.175h-28.23v-71.92c0-8.019-2.046-14.237-6.219-18.819-4.173-4.5-9.819-6.791-17.102-6.791-4.91 0-9.328 1.063-13.174 3.272-3.846 2.128-6.792 5.237-9.001 9.328-2.046 4.009-3.191 8.918-3.191 14.728ZM589.233 239c-10.147 0-18.82-1.391-26.103-4.091-7.282-2.7-13.092-6.382-17.511-10.964-4.418-4.582-7.528-9.655-9.164-15.219l25.448-6.136c1.145 2.372 2.782 4.663 4.991 6.954 2.209 2.291 5.155 4.255 8.837 5.81 3.683 1.554 8.428 2.291 14.074 2.291 8.019 0 14.647-1.964 19.884-5.81 5.237-3.845 7.856-10.227 7.856-19.064v-22.665h-1.391c-1.473 2.946-3.601 5.892-6.383 9.001-2.782 3.109-6.464 5.645-10.965 7.691-4.582 2.046-10.228 3.109-17.101 3.109-9.165 0-17.511-2.209-25.039-6.545-7.446-4.337-13.42-10.883-17.757-19.474-4.418-8.673-6.628-19.473-6.628-32.565 0-13.091 2.21-24.301 6.628-33.383 4.419-9.082 10.311-15.955 17.839-20.7 7.528-4.746 15.874-7.037 25.039-7.037 7.037 0 12.846 1.145 17.347 3.518 4.582 2.373 8.182 5.236 10.883 8.51 2.7 3.272 4.746 6.382 6.137 9.327h1.554v-19.8h27.821v121.749c0 10.228-2.454 18.737-7.364 25.447-4.91 6.709-11.538 11.7-20.048 15.055-8.509 3.355-18.165 4.991-28.884 4.991Zm.245-71.266c5.974 0 11.047-1.473 15.302-4.337 4.173-2.945 7.446-7.118 9.573-12.519 2.21-5.482 3.274-12.027 3.274-19.637 0-7.609-1.064-14.155-3.274-19.8-2.127-5.646-5.318-10.064-9.491-13.255-4.174-3.11-9.329-4.746-15.384-4.746s-11.537 1.636-15.792 4.91c-4.173 3.272-7.365 7.772-9.492 13.418-2.128 5.727-3.191 12.191-3.191 19.392 0 7.2 1.063 13.745 3.273 19.228 2.127 5.482 5.318 9.736 9.573 12.764 4.174 3.027 9.41 4.582 15.629 4.582Zm141.56-26.51V71.839h28.23v119.786h-27.412v-21.273h-1.227c-2.7 6.709-7.119 12.191-13.338 16.446-6.137 4.255-13.747 6.382-22.748 6.382-7.855 0-14.81-1.718-20.783-5.237-5.974-3.518-10.72-8.591-14.075-15.382-3.355-6.709-5.073-14.891-5.073-24.464V71.839h28.312v71.921c0 7.609 2.046 13.664 6.219 18.083 4.173 4.5 9.655 6.709 16.365 6.709 4.173 0 8.183-.982 12.111-3.028 3.927-2.045 7.118-5.072 9.655-9.082 2.537-4.091 3.764-9.164 3.764-15.218Zm65.707-109.395v159.796h-28.23V31.828h28.23Zm44.841 162.169c-7.61 0-14.402-1.391-20.457-4.091-6.055-2.7-10.883-6.791-14.32-12.109-3.518-5.319-5.237-11.946-5.237-19.801 0-6.791 1.228-12.355 3.765-16.773 2.536-4.419 5.891-7.937 10.228-10.637 4.337-2.618 9.164-4.664 14.647-6.055 5.4-1.391 11.046-2.373 16.856-3.027 7.037-.737 12.683-1.391 17.102-1.964 4.337-.573 7.528-1.555 9.574-2.782 1.963-1.309 3.027-3.273 3.027-5.973v-.491c0-5.891-1.718-10.391-5.237-13.664-3.518-3.191-8.51-4.828-15.056-4.828-6.955 0-12.356 1.473-16.447 4.5-4.009 3.028-6.71 6.546-8.183 10.719l-26.348-3.764c2.046-7.282 5.483-13.336 10.31-18.328 4.746-4.909 10.638-8.59 17.511-11.045 6.955-2.455 14.565-3.682 22.912-3.682 5.809 0 11.537.654 17.265 2.045s10.965 3.6 15.711 6.71c4.746 3.109 8.51 7.282 11.455 12.6 2.864 5.318 4.337 11.946 4.337 19.883v80.184h-27.166v-16.446h-.9c-1.719 3.355-4.092 6.464-7.201 9.328-3.109 2.864-6.955 5.237-11.619 6.955-4.828 1.718-10.229 2.536-16.529 2.536Zm7.364-20.701c5.646 0 10.556-1.145 14.729-3.354 4.173-2.291 7.364-5.237 9.655-9.001 2.292-3.763 3.355-7.854 3.355-12.273v-14.155c-.9.737-2.373 1.391-4.5 2.046-2.128.654-4.419 1.145-7.037 1.636-2.619.491-5.155.9-7.692 1.227-2.537.328-4.746.655-6.628.901-4.173.572-8.019 1.472-11.292 2.781-3.355 1.31-5.973 3.11-7.855 5.401-1.964 2.291-2.864 5.318-2.864 8.918 0 5.237 1.882 9.164 5.728 11.782 3.682 2.782 8.51 4.091 14.401 4.091Zm64.643 18.328V71.839h27.412v19.965h1.227c2.21-6.955 5.974-12.274 11.292-16.038 5.319-3.763 11.456-5.645 18.329-5.645 1.555 0 3.355.082 5.237.163 1.964.164 3.601.328 4.91.573v25.938c-1.227-.41-3.109-.819-5.646-1.146a58.814 58.814 0 0 0-7.446-.49c-5.155 0-9.738 1.145-13.829 3.354-4.091 2.209-7.282 5.236-9.655 9.164-2.373 3.927-3.519 8.427-3.519 13.5v70.448h-28.312ZM222.077 39.192l-8.019 125.923L137.387 0l84.69 39.192Zm-53.105 162.825-57.933 33.056-57.934-33.056 11.783-28.556h92.301l11.783 28.556ZM111.039 62.675l30.357 73.803H80.681l30.358-73.803ZM7.937 165.115 0 39.192 84.69 0 7.937 165.115Z"
    />
  </g>
  <defs>
    <radialGradient
      id="c"
      cx="0"
      cy="0"
      r="1"
      gradientTransform="rotate(118.122 171.182 60.81) scale(205.794)"
      gradientUnits="userSpaceOnUse"
    >
      <stop stop-color="#FF41F8" />
      <stop offset=".707" stop-color="#FF41F8" stop-opacity=".5" />
      <stop offset="1" stop-color="#FF41F8" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="b" x1="0" x2="982" y1="192" y2="192" gradientUnits="userSpaceOnUse">
      <stop stop-color="#F0060B" />
      <stop offset="0" stop-color="#F0070C" />
      <stop offset=".526" stop-color="#CC26D5" />
      <stop offset="1" stop-color="#7702FF" />
    </linearGradient>
    <clipPath id="a"><path fill="#fff" d="M0 0h982v239H0z" /></clipPath>
  </defs>
</svg>
```

```ts logo-angular.ts
import { Component } from '@angular/core';

@Component({
  selector: 'alc-logo-ng',
  imports: [],
  templateUrl: './logo-ng.svg',
  styles: `
    :host {
      display: block;
      max-width: 9.2rem;
      margin: 0 auto;
    }
  `,
})
export class LogoNg {}
```

El componente `alc-logo-ng` se incorpora en el `alc-header`, en el `hgroup`, para mostrar el logo de Angular junto con el nombre del framework integrado en el "título" de la app.

### 3. `alc-logo-coders`

Es un componente que muestra el logo de "Coders" como logo de la aplicación, en formato SVG. Como en el caso anterior, el SVG es un fichero independiente que se vincula como template del componente.

```svg logo-coders.svg
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"
 "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 [attr.width]="size" [attr.height]="size" viewBox="0 0 1039.000000 1037.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,1037.000000) scale(0.100000,-0.100000)">

<path id="upper" [attr.fill]="upperColor" (click)="handleClick('upper')" d="..."/>

<path id="down" [attr.fill]="downColor" d="..."/>
</g>
</svg>
```

En el svg se utiliza attr para vincular los atributos de tamaño y color con las propiedades del componente, lo que permite personalizar el logo desde el componente padre.

Además en uno de los paths se añade un evento de click para manejar la interacción con el logo, lo que permitirá más adelante mostrar un modal con información sobre la aplicación al hacer click en una parte concreta del logo.

```ts logo-coders.ts
import { Component } from '@angular/core';

@Component({
  selector: 'alc-logo-coders',
  imports: [],
  templateUrl: './logo-coders.svg',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class LogoCoders {
  size = '5.5rem';
  upperColor = 'var(--color-primary)';
  downColor = 'var(--color-secondary)';

  handleClick(source: string) {
    console.log('LogoCoders clicked from:', source);
  }
}
```

En el componente se definen las propiedades para el tamaño y los colores del logo, que se vinculan con los atributos del svg. Además se define un método para manejar el evento de click en el logo, que por ahora solo muestra un mensaje en la consola, pero que más adelante se utilizará para mostrar un modal con información sobre la aplicación.

El componente `alc-logo-coders` se incorpora en el `alc-header`, en el div con la clase `left-side`, que asegura su posición a la izquierda.

### 4. `alc-card`

Es un componente de utilidad para mostrar contenido en formato de tarjeta, con estilos predefinidos para el fondo, los bordes, las sombras y el padding. Este componente se utilizará más adelante para mostrar el contenido de las páginas de la aplicación.

```ts card.ts
import { Component } from '@angular/core';

@Component({
  selector: 'alc-card',
  imports: [],
  template: ` <ng-content></ng-content> `,
  styles: `
    :host {
      display: block;
      margin: 1rem 0;
      padding: 1rem;
      border: 1px solid #ccc;
      border-radius: 8px;
      box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
      text-align: center;
    }
  `,
})
export class Card {}
```

En este componente tenemos un ejemplo muy sencillo de proyección de contenido: se utiliza ng-content para permitir que el contenido de la tarjeta sea dinámico y se pueda personalizar desde el componente padre. Los estilos predefinidos aseguran que todas las tarjetas tengan una apariencia consistente en toda la aplicación.

Como ejemplo, podemos utilizar Card en el componente App para envolver el mensaje que indica donde se mostrara el contenido principal de la aplicación, cuando existan las páginas.

```ts app.ts
  template: `
    <alc-header>
      <alc-menu />
    </alc-header>
    <main class="container">
      <router-outlet />
      <alc-card>
        <p>Páginas de la aplicación</p>
      </alc-card>
    </main>
    <alc-footer />
  `,
```

### Resultados: Componentes gráficos

![Elementos gráficos en la versión mobile](./assets/logos-mobile.png)

![Elementos gráficos en la versión desktop](./assets/logos-desktop.png)

## Core - Componentes de funcionalidad (right-side del header)

- `alc-search` / `alc-search-ref`
- `alc-user` 
- `alc-toggle`

```shell
ng g c core/components/search --project demo-01
ng g c core/components/user --project demo-01
ng g c core/components/toggle --project demo-01
```

En la fila inferior del header se añade el componente `alc-search`, que incorpora un input de búsqueda y un botón para resetear el valor del input.

En el lado derecho del header se añaden dos componentes de distinta funcionalidad: `alc-user` y `alc-toggle`. 

### Elementos de Angular en los componentes de funcionalidad

En estos componentes vemos

- la **vinculación en dos sentidos** (two-way binding) utilizando `[(ngModel)]`, que permite que los cambios en el componente se reflejen en la vista y viceversa. 
- las **referencias locales** que permiten manipular valores directamente desde el template, sin necesidad de vincularlos a propiedades del componente.
- el acceso desde el componente a las referencias locales, utilizando una **signal query**, `viewChild()`, para obtener una signal del `ElementRef`, que da acceso al `nativeElement` del input
- el uso de los **efectos de las signals**, `effect()`, que se ejecutara cuando cambie el `ElementRef`, ara permitirnos mostrarlo por consola
- un uso más realista de la **signal query**, `viewChild()`, para poder monipular el DOM, por ejemplo para darle el foco a un elemento cuando se hace click en un botón, utilizando el `nativeElement` del `ElementRef` para acceder al input y llamar a su método `focus()`.
- de nuevo el uso de **svg** como parte de un template, con atributos vinculados a propiedades del componente
- **widgets** basados en css puro, como el toggle, que no necesitan JS para parte de su funcionalidad, pero que se encapsulan en un componente Angular para poder reutilizarlos y personalizarlos desde el componente padre.
- el uso de **signal** para definir propiedades reactivas que se vinculan al svg o al html del template, permitiendo que los cambios en estas propiedades se reflejen automáticamente en la vista.

### 1. `alc-search`

Incorpora un input de búsqueda, aunque sin implementar esta funcionalidad, para demostrar el funcionamiento de la vinculación en dos direcciones (propiedades y eventos) en Angular. 

- El input se vincula a una propiedad signal utilizando `[(ngModel)]`.
- Junto a el se muestra el valor que se esta escribiendo, indicando que se esta usando en la búsqueda (que no existe)
- Un botón reset permite vaciar de valor la signal, lo que se reflejará automáticamente en el input y en el valor mostrado. 

Para el botón se utiliza un svg, como ya hemos hecho en otras ocasiones, con atributos vinculados a propiedades del componente para permitir su personalización desde el componente padre.

Por último, se crea una referencia local al input de búsqueda, `#searchInput`, y se utiliza una signal query, `viewChild()`, para obtener el `ElementRef` del input, lo que permite darle el foco cuando se hace click en el botón reset.

```ts search.ts
import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'alc-search',
  imports: [FormsModule],
  template: `
    <!-- <input type="text" placeholder="Search..."
    [value]="text()" (input)="text.set($event.target.value)"/> -->

    <input type="text" #searchInput placeholder="Search..." name="text" [(ngModel)]="text" />
    <span class="form-result">{{
      text() === '' ? 'Esperando' : 'Buscando ' + text()
    }}</span>
    <button (click)="resetSearch()" title="Reset" aria-label="Reset">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 640"
        [attr.width]="size()"
        [attr.height]="size()"
        fill="currentColor"
      >
        <path
          d="M320 128C263.2 128 212.1 152.7 176.9 192L224 192C241.7 192 256 206.3 256 224C256 241.7 241.7 256 224 256L96 256C78.3 256 64 241.7 64 224L64 96C64 78.3 78.3 64 96 64C113.7 64 128 78.3 128 96L128 150.7C174.9 97.6 243.5 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C233 576 156.1 532.6 109.9 466.3C99.8 451.8 103.3 431.9 117.8 421.7C132.3 411.5 152.2 415.1 162.4 429.6C197.2 479.4 254.8 511.9 320 511.9C426 511.9 512 425.9 512 319.9C512 213.9 426 128 320 128z"
        />
      </svg>
    </button>
  `,
  styles: `
    :host {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      height: 2rem;
    }
    .form-result {
      font-size: 0.8rem;
      color: var(--color-primary-hot);
      width: min-content;
    }
    button {
      color: var(--color-primary-hot);
      background-color: var(--color-background-primary);
      border: 1px solid var(--color-primary-hot);
      border: none;
    }
    input {
      color: var(--color-primary-hot);
      background-color: var(--color-background-primary);
      border: 1px solid var(--color-primary-hot);
      border-radius: 0.5rem;
      padding: 0.3rem;

      &:focus-visible {
        outline: var(--color-primary) auto 1px;
        background-color: var(--color-background);
      }
    }
  `,
})
export class Search {
  protected readonly searchInputElement = viewChild<ElementRef>('searchInput');
  protected readonly size = signal('1rem');
  protected readonly text = signal('');

  resetSearch() {
    console.log(this.searchInputElement());
    console.dir(this.searchInputElement()?.nativeElement);
    this.searchInputElement()?.nativeElement.focus();
    this.text.set('');
  }
}
```

El componente se debería incorporar en dos posiciones del `alc-header`, en la fila inferior, marcadas con classes que determinan su aparición en el modo mobile o desktop, para mostrar el input de búsqueda en ambas versiones en distintas ubicaciones.

En este caso, en la posición correspondiente al desktop, incorporamos una versión alternativa del componente, basada en referencias locales, que aparece a continuación

### 2. `alc-search-ref`

Versión alternativa del componente `alc-search`, que utiliza referencias locales para manejar el valor del input de búsqueda, en lugar de vincularlo a una propiedad signal.

- el input se marca como referencia local con `#searchInput`, lo que permite acceder a su valor directamente desde el template.
- el ngModel del input se vincula a la referencia local, lo que permite que el valor del input se refleje automáticamente en la vista.
- en respuesta al click del botón reset se modifica directamente el valor de la referencia local, asignándole un string vacío.

```ts search-ref.ts
import { Component, viewChild, ElementRef, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'alc-search-ref',
  imports: [FormsModule],
  template: `
    <input
      type="text"
      placeholder="Search..."
      id="searchInput"
      #searchInput
      [(ngModel)]="searchInput.value"
    />

    <p class="form-result">{{ searchInput.value === '' ? 'Esperando' : 'Buscando ' + searchInput.value }}</p>
    <button (click)="searchInput.value = ''; searchInput.focus()" title="Reset" aria-label="Reset">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 640"
        [attr.width]="'1rem'"
        [attr.height]="'1rem'"
        fill="currentColor"
      >
        <path
          d="M320 128C263.2 128 212.1 152.7 176.9 192L224 192C241.7 192 256 206.3 256 224C256 241.7 241.7 256 224 256L96 256C78.3 256 64 241.7 64 224L64 96C64 78.3 78.3 64 96 64C113.7 64 128 78.3 128 96L128 150.7C174.9 97.6 243.5 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C233 576 156.1 532.6 109.9 466.3C99.8 451.8 103.3 431.9 117.8 421.7C132.3 411.5 152.2 415.1 162.4 429.6C197.2 479.4 254.8 511.9 320 511.9C426 511.9 512 425.9 512 319.9C512 213.9 426 128 320 128z"
        />
      </svg>
    </button>
    <span>Ref</span>
  `,
  styles: `
    :host {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      height: 2rem;
    }
    .form-result {
      font-size: 0.8rem;
      color: var(--color-primary-hot);
      width: min-content;
    }
    button {
      color: var(--color-primary-hot);
      background-color: var(--color-background-primary);
      border: 1px solid var(--color-primary-hot);
      border: none;
    }
    input {
      color: var(--color-primary-hot);
      background-color: var(--color-background-primary);
      border: 1px solid var(--color-primary-hot);
      border-radius: 0.5rem;
      padding: 0.3rem;

      &:focus-visible {
        outline: var(--color-primary) auto 1px;
        background-color: var(--color-background);
      }
    }
  `,
})
export class SearchRef {
  protected readonly searchInputElement = viewChild<ElementRef>('searchInput');

  constructor() {
    console.log('Constructor');
    console.log(this.searchInputElement());

    effect(() => {
      console.log('Effect');
      console.log(this.searchInputElement());
      console.dir(this.searchInputElement()?.nativeElement);
    });
  }

  // ngOnInit() {
  //   console.log('OnInit');
  //   console.log(this.searchInputElement());
  //   console.dir(this.searchInputElement()?.nativeElement);
  // }
}
```

Para acceder a la referencia local desde el componente, se utiliza `viewChild` para obtener una referencia de tipo ElementRef, cuya propiedad `nativeElement` apunta al elemento del DOM correspondiente al input de búsqueda. Esto permite acceder a su valor directamente desde el componente y manejarlo según sea necesario.

Para mostrarlo, tradicionalmente usaría el hook `ngOnInit`,ya que si se hace en el constructor, la referencia local aún no está disponible. Se introduce así el concepto del **ciclo de vida** de los componentes en Angular, que permite ejecutar código en distintos momentos del ciclo de vida del componente, como la inicialización, la actualización o la destrucción. 

Una alternativa utilizar un `effect`, que se ejecuta automáticamente cuando cambian las propiedades reactivas del componente. Si en el effect se utiliza la propiedad searchInputElement, una signal correspondiente al ElementRef, el effect se ejecutará cada vez que cambie el valor de la referencia local, lo que permite reaccionar a los cambios en el input de búsqueda sin necesidad de utilizar un hook del ciclo de vida.


### 3. `alc-user`

Componente que muestra un icono de usuario, que se utilizará en el futuro para mostrar información sobre el inicio de sesión del usuario o para acceder a opciones relacionadas con la cuenta. 

Incorpora nuevamente un icon svg, obtenido igual que los anteriores. En este case se añade al template, dentro de una etiqueta \<a>, ya que en principio navegará a la página de gestión del usuario. Como en casos anteriores se vinculan atributos del svg con propiedades del componente para permitir su personalización desde el componente padre.

```ts user.ts
import { Component, signal } from '@angular/core';

@Component({
  selector: 'alc-user',
  imports: [],
  template: `
    <nav>
      <a href="#" id="menu-icon" (click)="toggleUser()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
          [attr.width]="size()"
          [attr.height]="size()"
          fill="currentColor"
        >
          <title>Login</title>
          <path
            d="M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z"
          />
        </svg>
      </a>
    </nav>
  `,
  styles: ``,
})
export class User {
  protected readonly size = signal('3rem');

  toggleUser() {
    console.log('User Login');
  }
}
```

El evento de click en el icono de usuario se maneja con un método que por ahora solo muestra un mensaje en la consola, pero que más adelante se utilizará para mostrar un modal con información sobre el usuario o para iniciar sesión.

El componente se incorpora en el `alc-header`, en el div con la clase `right-side`, para mostrar el icono de usuario a la derecha del header.

### 4. `alc-toggle`

Componente que muestra un toggle para cambiar entre el modo claro y oscuro de la aplicación, lo que permitirá a los usuarios personalizar la apariencia de la aplicación según sus preferencias.

Es un widget básicamente creado en CSS a partir de un input de tipo checkbox y encapsulado en un componente Angular.

Gracias a las modificaciones recientes de CSS no necesita JS para su funcionalidad. 
- El checkbox con `id` "theme-toggle" cambia su estado a chequeado o no 
  `<input type="checkbox" id="theme-toggle" [(ngModel)]="isChecked" />` 
- los estilos a nivel de HTML dependen de ese estado gracias a la función has()  
  ```css
  html:has(#theme-toggle:checked) {
    color-scheme: dark;
  }
  ```

El código en Angular añade la alternancia de la etiqueta izquierda o derecha, para que solo se vea el valor al que el toggle cambiara si se pulsa

- el valor de input de vincula a una propiedad signal con un ngModel, y esta propiedad se vincula al atributo [hidden] de las etiquetas span que muestran los valores izquierdo y derecho, para que solo se vea el valor contrario al estado actual del toggle.

```ts
import { Component, signal, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'alc-toggle',
  imports: [FormsModule],
  template: `
    <label for="theme-toggle" aria-label="Theme">
      <span [hidden]="!isChecked()">{{ leftLabel() }}</span>
      <input type="checkbox" id="theme-toggle" [(ngModel)]="isChecked" />
      <span [hidden]="isChecked()">{{ rightLabel() }}</span>
    </label>
  `,
  styles: `
    :host {
      /* Theming variables
        Text: --color-text
        Checked/UnChecked button background: --color-background
        Checked background --color-secondary
        Checked button border --color-primary:
      */
      
      /* UnChecked background */
      --color-accent:var(--gray-400);
      /* UnChecked button border */
      --color-tertiary: var(--gray-700);
      width: fit-content;
    }

    label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      width: fit-content;
      color: var(--color-primary);    
    }

    input[type='checkbox'] {
      position: relative;
      height: 1.5rem;
      width: 3rem;
      cursor: pointer;
      appearance: none;
      -webkit-appearance: none;
      border-radius: 9999px;
      background-color: var(--color-accent);
      transition: all 0.3s ease;

      &:checked {
        background-color: var(--color-accent);
      }

      &::before {
        position: absolute;
        content: '';
        left: calc(1.5rem - 1.6rem);
        top: calc(1.5rem - 1.6rem);
        display: block;
        height: 1.6rem;
        width: 1.6rem;
        cursor: pointer;
        border: 1px solid color-mix(in srgb, var(--color-tertiary) 52%, transparent);
        border-radius: 9999px;
        background-color: var(--color-background);
        box-shadow: 0 3px 10px color-mix(in srgb, var(--color-tertiary) 32%, transparent);
        transition: all 0.3s ease;
      }

      &:hover::before {
        box-shadow: 0 0 0px 8px color-mix(in srgb, var(--color-text) 15%, transparent);
      }

      &:checked:before {
        transform: translateX(100%);
        border-color: var(--color-primary);
      }

      &:checked:hover::before {
        box-shadow: 0 0 0px 8px color-mix(in srgb, var(--color-primary) 32%, transparent);
      }
    }
  `,
})
export class Toggle {
  protected readonly leftLabel = signal('Claro');
  protected readonly rightLabel = signal('Oscuro');
  protected readonly isChecked = signal(false);

}
```

El componente se incorpora en el `alc-header`, en el div con la clase `right-side`, para mostrar el toggle a la derecha del header, debajo de los iconos de usuario y del menu mobile (si se muestra).

### Resultados: Componentes de funcionalidad

![Modo claro en la versión Mobile](./assets/theme-ligth-mobile.png)
![Modo oscuro en la versión Mobile](./assets/theme-dark-mobile.png)

![Modo claro en la versión Desktop](./assets/theme-light-desktop.png)
![Modo oscuro en la versión Desktop](./assets/theme-dark-desktop.png)

## Core - versión final  

### Components en la versión final

- `alc-app`
  - `alc-header`
    - `alc-logo-angular`
    - `alc-logo-coders`
    - `alc-menu-mobile`
    - `alc-toggle`
    - `alc-user` 
    - `alc-menu`
    - `alc-separator`
  - `router-outlet` 
  - `alc-footer`
    - `alc-socials`
  - `alc-card`

### Elementos de Angular utilizados

- creación de componentes. Definición mediante el decorador `@Component` y la clase del componente.
- uso de signals para definir propiedades reactivas.
- vinculación de propiedades al template mediante la sintaxis de Angular: 
  - vinculación de expresiones con `{{expresión}}`
  - vinculación de atributos con `[attr.nombre]`
  - vinculación de propiedades con `[propiedad]` 
  - vinculación de clases con `[class.nombre]="expresión"`
  - vinculación de eventos con `(evento)="método()"`
  - vinculación en dos sentidos con `[(ngModel)]="propiedad"`
- referencias locales para acceder a elementos del DOM desde el template.
  - signal query para acceder a referencias locales desde el componente.
- uso de efectos para reaccionar a cambios en propiedades reactivas.
- proyección de contenido con `ng-content` para permitir que el contenido de un componente sea dinámico y se pueda personalizar desde el componente padre.
- uso de SVG como parte de un template, con atributos vinculados a propiedades del componente para permitir su personalización desde el componente padre.
- use de ficheros svg independientes como templates de componentes
- uso de CSS para crear widgets interactivos, como el toggle, que no necesitan JS para parte de su funcionalidad, pero que se encapsulan en un componente Angular para poder reutilizarlos y personalizarlos desde el componente padre.

## Pages

Para  preparar el uso de fistintas features, ligadas a la navegación entre páginas, se crean las páginas de ejemplo, `home`, `dashboard`  y `about`, que se incorporan una tras otra en app.

```shell
ng g c features/home/home-page --flat
ng g c features/dashboard/dashboard-page --flat
ng g c features/about/about-page --flat
```

### Páginas iniciales

En cada página:

- Se cambia el export a default y se actualiza el correspondiente import en el test
- se crea una propiedad de tipo signal, pageTitle para el título de la página, q
- se muestra en un heading <h2>

```ts home-page.ts
import { Component, signal } from '@angular/core';

@Component({
  selector: 'alc-home-page',
  imports: [],
  template: `
    <h2>{{ pageTitle() }}</h2>
  `,
  styleUrls: ['../pages.css'],
  styles: ``,
})
export default class HomePage {
  protected readonly pageTitle = signal('Home');
}
```

```ts dashboard-page.ts
import { Component, signal } from '@angular/core';

@Component({
  selector: 'alc-dashboard-page',
  template: `
    <h2>{{ pageTitle() }}</h2>
  `,
  styleUrls: ['../pages.css'],
  styles: `
    :host {
      display: block;
      width: 100%;
      padding: 1rem;
    }
  `,
})
export default class DashboardPage {
    protected readonly pageTitle = signal('Dashboard');
}
```

```ts about-page.ts
import { Component, signal } from '@angular/core';
@Component({
  selector: 'alc-about-page',
  imports: [],
  template: `
    <h2>{{ pageTitle() }}</h2>
  `,
  styleUrls: ['../pages.css'],
  styles: ``,
})
export default class AboutPage {
  protected readonly pageTitle = signal('About');
}
```

Todas las páginas comparten un archivo de estilos `pages.css` que define estilos comunes para todas ellas, como el color de los encabezados.

Por el momento, hasta disponer de un router, se incorporan las páginas en app, una tras otra, para mostrar el contenido de cada una de ellas, añadiéndoles un id y envolviendo cada una en un `alc-card`.

```ts app.ts
@Component({
  selector: 'alc-root',
  imports: [RouterOutlet, Header, Footer, Menu, Card, HomePage, DashboardPage, AboutPage],
  template: `
    <alc-header />
      <alc-menu />
    </alc-header>
    <main class="container">
      <router-outlet />
      <alc-card>
        <alc-home-page id="home" />
      </alc-card>
      <alc-card>
        <alc-dashboard-page id="dashboard" />
      </alc-card>
      <alc-card class="wide">
        <alc-about-page id="about" />
      </alc-card>
    </main>
    <alc-footer />
  `,
  styles: `...`
})
export class App {}
```


Se modifican las opciones de menú definidas en `app.routes.ts` para que correspondan a las tres páginas creadas

```ts
export const MENU_OPTIONS: MenuOption[] = [
  { label: 'Inicio', path: '#home' },
  { label: 'Dashboard', path: '#dashboard' },
  { label: 'Angular', path: '#about' },
];
```

### Página about (Angular)

Se incorporan los componentes creados a partir del proyecto ejemplo que se incluye en la instalación estándar de Angular (workspace + project):

- `alc-logo-ng` (ya incluido en el core)
- `alc-pills`
- `alc-separator-rwd`

Estos componentes incluyen

- un elemento gráfico que oscila entre horizontal y vertical, según cambia la disposición de los elementos en respuesta al tamaño de la pantalla

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'alc-separator-rwd',
  imports: [],
  template: ` <div role="separator" aria-label="Divider" class="divider"></div> `,
  styles: `
    .divider {
      width: 100%;
      height: 1.5px;
      background: var(--red-to-pink-to-purple-horizontal-gradient);
      margin-block: 1rem;
    }

    @media (width > 800px) {
      :host {
       align-self: stretch;
      }
      .divider {
        width: 1.5px;
        height: 90%;
        background: var(--red-to-pink-to-purple-vertical-gradient);
      }
    }
  `,
})
export class SeparatorRwd {}
```

- un elemento gráfico que muestra un conjunto de "pills" generados iterando un array, con distintos colores, definidos en css según el orden de los elementos, que se muestran en horizontal o vertical según el tamaño de la pantalla. 

  Todos los elementos incluyen un svg como icono y un enlace a páginas de la wew de Angular con más información sobre cada uno de ellos.

```ts
import { Component, signal } from '@angular/core';

const INFO_ITEMS = [
    { title: 'Explore the Docs', link: 'https://angular.dev' },
    { title: 'Learn with Tutorials', link: 'https://angular.dev/tutorials' },
    {
      title: 'Prompt and best practices for AI',
      link: 'https://angular.dev/ai/develop-with-ai',
    },
    { title: 'CLI Docs', link: 'https://angular.dev/tools/cli' },
    { title: 'Angular Language Service', link: 'https://angular.dev/tools/language-service' },
    { title: 'Angular DevTools', link: 'https://angular.dev/tools/devtools' },
  ];

@Component({
  selector: 'alc-pills',
  imports: [],
  template: `
    <div class="pill-group">
      @for (item of items(); track item.title) {
        <a class="pill" [href]="item.link" target="_blank" rel="noopener">
          <span>{{ item.title }}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="14"
            viewBox="0 -960 960 960"
            width="14"
            fill="currentColor"
          >
            <path
              d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"
            />
          </svg>
        </a>
      }
    </div>
  `,
  styles: `
    :host {
      --pill-accent-light: var(--bright-blue);
      --pill-accent-dark: var(--gray-100);
      --bg-color-light: color-mix(in srgb, var(--pill-accent-light) 5%, transparent);
      --bg-color-dark: color-mix(in srgb, var(--pill-accent-dark) 70%, transparent);
      --bg-color: light-dark(var(--bg-color-light), var(--bg-color-dark));

      --pill-hover-light: color-mix(in srgb, var(--pill-accent-light) 15%, transparent);
      --pill-hover-dark: color-mix(in srgb, var(--pill-accent-dark) 100%, transparent);
      --pill-hover: light-dark(var(--pill-hover-light), var(--pill-hover-dark));
    }

    .pill-group {
      display: flex;
      flex-direction: column;
      align-items: start;
      flex-wrap: wrap;
      gap: 1.25rem;
    }

    .pill {
      display: flex;
      align-items: center;

      background: var(--bg-color);
      color: var(--pill-accent);
      padding-inline: 0.75rem;
      padding-block: 0.375rem;
      border-radius: 2.75rem;
      border: 0;
      transition: background 0.3s ease;
      font-family: var(--inter-font);
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.4rem;
      letter-spacing: -0.00875rem;
      text-decoration: none;
      white-space: nowrap;
    }

    .pill:hover {
      background: var(--pill-hover);
    }

    .pill-group .pill:nth-child(6n + 1) {
      --pill-accent: var(--bright-blue);
    }
    .pill-group .pill:nth-child(6n + 2) {
      --pill-accent: var(--electric-violet);
    }
    .pill-group .pill:nth-child(6n + 3) {
      --pill-accent: var(--french-violet);
    }

    .pill-group .pill:nth-child(6n + 4),
    .pill-group .pill:nth-child(6n + 5),
    .pill-group .pill:nth-child(6n + 6) {
      --pill-accent: var(--hot-red);
    }

    .pill-group svg {
      margin-inline-start: 0.25rem;
    }
  `,
})
export class Pills {
  readonly items = signal(INFO_ITEMS);
}
```

### Resultados: Páginas iniciales (sin router)

![Páginas iniciales (sin router) versión mobile](./assets/pages-initial-mobile.png)
![Páginas iniciales (sin router) versión desktop](./assets/pages-initial-desktop.png)

## Comunicación entre componentes: inputs

Utilizando la capacidad de comunicación entre los componentes mediante inputSignals, se puede pasar información desde un componente padre a un componente hijo. 

Esto permite un mejor reparto de responsabilidades:

- el componente padre se encarga de gestionar la información y el estado de la aplicación
- el componente hijo se encarga de mostrar la información y manejar la interacción con el usuario.

En nuestro primer ejemplo, el componente app es responsable de los valores del estado de la aplicación: 

- título y subtítulo en app
- opciones de menu en app

Mediante inputs estos valores llegan al componente responsable de mostrar el header, que a su vez los pasa a los componentes hijos que se encargan de mostrar el logo, el menu y el título.

```ts app.ts
@Component({
  selector: 'alc-root',
  imports: [RouterOutlet, Header, Footer, Menu, Card, ...],
  template: `
    <alc-header [title]="title()" [subtitle]="subtitle()">
      <alc-menu [options]="menuOptions()" />
    </alc-header>
    <main class="container">
      <router-outlet />
      ...
    </main>
    <alc-footer />
  `,
  styles: `...`
})
export class App {
  protected readonly title = signal('Curso de Angular 22');
  protected readonly subtitle = signal('Aprende a desarrollar aplicaciones con Angular');
  protected readonly menuOptions = signal<MenuOption[]>(MENU_OPTIONS);
}
```

En los componentes hijo solo cambia la forma en que se recibe valor en los propiedades, mientras que su uso es completamente igual.

Al definir los inputs como required, se asegura que el componente hijo no pueda ser utilizado sin recibir los valores necesarios desde el componente padre, lo que ayuda a evitar errores y a mantener la consistencia de la aplicación.

```ts header.ts
@Component({
  selector: 'alc-header',
  imports: [MenuMobile, Separator, LogoNg, LogoCoders, User, Toggle, Search, SearchRef],
  template: `...`,
  styles: `...` 
  ],
})
export class Header {
  readonly title = input.required<string>();
  readonly subtitle = input.required<string>();
}
```

```ts menu.ts
@Component({
  selector: 'alc-menu',
  imports: [],
  template: `...`,
  styles: `...`,
})
export class Menu {
  readonly options = input.required<MenuOption[]>();
}
```
Esto también permite personalizar el comportamiento y la apariencia del componente hijo según las necesidades del componente padre, como veremos más adelante.

## Dashboard: counters

Creamos los componentes correspondientes a un contador de tres botones y una lista de contadores

```shell
  ng g c features/dashboard/components/counter
  ng g c features/dashboard/components/counters-list
```

- `alc-counters-list`
  - `alc-counter`
  - `alc-counter`
  - `alc-counter`

El componente `alc-counters-list` se incorpora a la página `dashboard-page`, para mostrar una lista de contadores, cada uno con su propio estado y funcionalidad. En el se incluyen tres contadores.

### 1. `alc-counter`: contador inicial

En el componente `alc-ounter` se implementa un contador con tres botones: incrementar, decrementar y resetear.

- En la clase de define el estado con propiedades de tipo signal: sus cambios se reflejan en la vista 
  
  ```ts
  protected readonly clicks = signal(0);
  protected readonly count = signal(0);
  ```

- En la vista podemos definir la respuesta a los eventos con el operador () 

```ts
<div>
  <button (click)="changeCount(1)" title="Increment">➕</button>
  <button (click)="changeCount(-1)" title="Decrement">➖</button>
  <button (click)="resetCount()" title="Reset">🟣</button>
  <button (click)="changeCountAsync()" title="Increment Async">➕ Async</button>
</div>
```

- En esa respuesta podemos hacer directamente cambios en el estado,
que automáticamente actualizaran la vista 

  ```ts
  changeCount(delta: number) {
    this.clicks.update((value) => value + 1);
    this.count.update((value) => value + delta);
  }

  resetCount() {
    this.clicks.set(0);
    this.count.set(0);
  }
  changeCountAsync() {
    setTimeout(() => {
      this.changeCount(1);
      console.log(`Clicks: ${this.clicks}`);
    }, 1000);
  }
  ```

El método asíncrono nos permite comprobar como las operaciones asíncronas se gestionan correctamente si usamos signal(). 

Si la variable no es reactiva en un proyecto ZoneLess y con la estrategia de detección del cambio OnPush, cuando su valor cambia desde un callback asíncrono, la vista no se actualiza automáticamente. 

### 2. `alc-counter`: contador mejorado

El atributo [class] se puede utilizar para aplicar una clase de css de forma condicional. Creamos una clase `.negative` que se aplica cuando el valor del contador es negativo, para cambiar el color del texto.

El atributo [class] se vincular con un objeto en el que

- los nombres de las propiedades corresponden a clases CSS
- su valor boolean determina si se aplican

```ts
<output [class]="{'negative': counter < 0}">{{counter()}}</output>
```
Alternativamente, se puede utilizar el atributo [class.nombre] con lo que el nombre de la clase se especifica directamente en el atributo y su valor boolean determina si se aplica.

```ts
<output [class.negative]="counter < 0">{{counter}}</output>
```

En versiones anteriores de Angular de usaban directivas de atributo como ngClass, que permitían aplicar clases de forma condicional, pero en la guía de estilo de Angular actual se recomienda **evitar** el uso de directivas de atributo como ngClass y ngStyle en favor del uso directo de los atributos del DOM con el operador [].

Si definimos como límites -5 y 5 almacenadolo en una propiedad del componente de tipo signal, podemos deshabilitar el botón que ya no es valido dando al atributo disable un valor booleano. Vemos de nuevo como el operador [] permite vincular un atributo a una expresión

```html
<div>
  <button (click)="changeCount(1)" [disabled]="count() >= limit()" title="Increment">
    ➕
  </button>
  <button (click)="changeCount(-1)" [disabled]="count() <= -limit()" title="Decrement">
    ➖
  </button>
  <button (click)="resetCount()" [disabled]="count() === 0" title="Reset">
    🟣
  </button>
  <button (click)="changeCountAsync()" [disabled]="count() >= limit()" title="Increment Async">
    ➕ Async
  </button>
</div>
```

Pero ademas, podemos añadir información al usuario que se renderizará condicionalmente
Para ello tenemos también un nuevo flow control, @if, que viene a sustituir a la directiva estructural ng-if

```html
@if (count() >= limit()) {
  <p class="limit-reached">Alcanzaste el límite de {{ limit() }}</p>
} @else if (count() <= -limit()) {
  <p class="limit-reached">Alcanzaste el límite de -{{ limit() }}</p>
} @else {
  <p class="limit-reached">&nbsp;</p>
}
```

La última condición reserva el espacio cuando no hay mensajes, para evitar un salto en la pantalla cuando aparece alguno de aquellos

### 2.  `alc-counters-list`: lista de contadores

El componente `alc-counters-list` se encarga de mostrar una lista de contadores, cada uno con su propio estado y funcionalidad.

- permitirá que cada contador se identifique con un id, que se pasa como input al componente `alc-counter`
- permitirá definir el valor inicial de cada uno de los contadores
- llevara la cuentas del número total de clicks y del valor total acumulado en todos los contadores

Para ello, se define un array de contadores, cada uno con su id y su valor inicial, que se itera en el template para crear un componente `alc-counter` por cada elemento del array.

```ts

interface CounterState {
  id: number;
  value: number;
}

const COUNTERS: CounterState[] = [
  { id: 1, value: 0 },
  { id: 2, value: 0 },
  { id: 3, value: 0 },
];
@Component({
  selector: 'alc-counters-list',
  imports: [Counter, Card],
  template: `
    <p>Total: {{ total() }}</p>
    <p>Total Clicks: {{ totalClicks() }}</p>
    <div>
      @for (item of counters(); track $index) {
        <alc-card>
          <alc-counter [id]="item.id" (clickEvent)="handleClicks($event)" />
        </alc-card>
      }
    </div>
  `,
  styles: `
    div {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(225px, 1fr));
      gap: 1rem;
    }
  `,
})
export class CountersList {
 protected readonly counters = signal<CounterState[]>(COUNTERS);
}
```

Para actualizar el estado de los totales se define el manejador del evento clickEvent que se emite desde cada contador, que actualiza el total de clicks y el total acumulado.

```ts
handleClicks(delta: number) {
  this.totalClicks.update((value) => value + 1);
  this.total.update((value) => value + delta);
}
```

De acuerdo con el modelo asíncrono de comunicación entre componentes que implementa Angular

- el componente padre define el estado y lo pasa a los componentes hijos mediante inputs
- los componentes hijos emiten eventos cuando su estado cambia, que son manejados por el componente padre para actualizar su propio estado y reflejar los cambios en la vista.

En el contador creamos una output-signal (`OutputEmitterRef<number>`) `clickEvent` que emite el valor del cambio en el contador

```ts
protected readonly clickEvent = output<number>();
```

En cada cambio de valor del contador, se emite el evento con el valor del cambio (delta) que se recibe en el manejador del evento en el componente padre.

```ts
this.clickEvent.emit(delta);
```

El resultado final del componente counter sería el siguiente

```ts  
import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'alc-counter',
  imports: [],
  template: `
    <h3>Counter {{ id() }}</h3>
    <p>
      Clicks: <output class="clicks">{{ clicks() }}</output>
    </p>
    <!-- <p>Value: <output [class]="count() < 0 ? 'negative' : ''" class="value">{{ count() }}</output></p> -->
    <!-- <p>Value: <output [class]="{negative: count() < 0}" class="value">{{ count() }}</output></p> -->
    <p>
      Value: <output [class.negative]="count() < 0" class="value">{{ count() }}</output>
    </p>

    @if (count() >= limit()) {
      <p class="limit-reached">Alcanzaste el límite de {{ limit() }}</p>
    } @else if (count() <= -limit()) {
      <p class="limit-reached">Alcanzaste el límite de -{{ limit() }}</p>
    } @else {
      <p class="limit-reached">&nbsp;</p>
    }

    <div>
      <button (click)="changeCount(1)" [disabled]="count() >= limit()" title="Increment">➕</button>
      <button (click)="changeCount(-1)" [disabled]="count() <= -limit()" title="Decrement">
        ➖
      </button>
      <button (click)="resetCount()" [disabled]="count() === 0" title="Reset">🟣</button>
      <button (click)="changeCountAsync()" [disabled]="count() >= limit()" title="Increment Async">
        ➕ Async
      </button>
    </div>
  `,
  styles: `
    div {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }

    .limit-reached {
      color: var(--color-primary-hot);
    }

    .negative {
      color: var(--color-tertiary-hot);
    }
  `,
})
export class Counter {
  readonly id = input.required<number>();
  readonly initialValue = input<number>(0, { alias: 'value' });

  protected readonly clickEvent = output<number>();

  protected readonly limit = signal(5);
  protected readonly clicks = signal(0);
  protected readonly count = signal(0);

  // GETTER de la signal
  // this.clicks()
  // SETTERS de la signal
  // this.clicks.set()
  // this.clicks.update()

  changeCount(delta: number) {
    this.clicks.update((value) => value + 1);
    this.clickEvent.emit(delta);
    if (delta > 0 && this.count() >= this.limit()) {
      return;
    }
    if (delta < 0 && this.count() <= -this.limit()) {
      return;
    }
    this.count.update((value) => value + delta);
  }

  resetCount() {
    const delta = -this.count();
    this.clickEvent.emit(delta);
    this.clicks.set(0);
    this.count.set(0);
  }
  changeCountAsync() {
    setTimeout(() => {
      this.changeCount(1);
      console.log(`Clicks: ${this.clicks}`);
    }, 1000);
  }
}
```

### Resultados: Páginas dashboard con contadores

![Página de Dashboard en la versión Mobile](./assets/pages-dashboard-mobile.png)
![Página de Dashboard en la versión Desktop](./assets/pages-dashboard-desktop.png)
 
## Core - Componentes modal y menu mobile

Creamos el componente modal

```shell
ng g c core/components/modal --project demo-01
```

- `alc-modal`
  
### El componente modal 

Es un wrapper de la etiqueta nativa de html \<dialog> cuya función es permitir la creación de cuadros de  dialog y modales en la web.

Un cuadro de dialogo no bloquea las interacciones con la página, mientras que un modal si lo hace, obligando al usuario a interactuar con el modal antes de poder volver a la página.

Su comportamiento va a depender de las relaciones entre tres componentes

- el componente padre, `alc-header`, 
- el componente hijo, `alc-modal`, que incluye el icono de cierre
- el componente hijo `alc-menu-mobile`, que incluye el icono burger que abre el modal 

![Esquema de los componentes implicados en el modal del menu mobile](./assets/menu-mobile.svg)

- mediante la **signal query** `viewChild()` acedemos al DOM para poder manipular el elemento <dialog> que proporciona com nativas las funciones showModal(), show() y close() 

- creamos una **inputSignal** `isOpen` que permite al componente padre controlar el estado del modal (abierto o cerrado) y un **outputSignal** `closeEvent` que permite al componente hijo notificar al componente padre cuando el modal se cierra.

- el manejador del evento de click del icono de cierre del modal, `emitCLose()` emite el evento que notifica al componente padre que el modal se ha cerrado, para que este pueda actualizar su estado y reflejar el cambio en la vista.

- finalmente el modal incluye un effect en resuelta a cambios en la propiedad input `isOpen`, para abrir o cerrar el modal según el valor de la propiedad.

### El header

1. Definimos una señal que refleje el estado del modal (abierto o cerrado)

```ts
protected readonly isModalOpen = signal(false);
```

Sera el valor de esta señal la que pasará como input al modal

2. Definimos el método para alternar el estado del modal

```ts
toggleModal(isOpen: boolean) {
  this.isModalOpen.set(isOpen);
}
```

3. Añadimos al final de alc-header el componente modal, pasando la señal como input y el método toggleModal como manejador del evento closeEvent

```ts
alc-modal [isOpen]="isModalOpen()" (closeEvent)="toggleModal(false)">
```

### En alc-menu-mobile: el icono burger del menú

1. Completamos el manejador del click del icono

```ts
protected readonly openEvent = output<void>();

toggleMenu(event: Event) {
  console.log('Abriendo menú mobile');
    event.preventDefault();
    this.openEvent.emit();
}
```

2. En el header, añadimos enlace entre el evento del icono burger y el método toggleModal del header, para que al hacer click en el icono se abra el modal.

```ts
<alc-menu-mobile (openEvent)="toggleModal(true)" />
```

### Incorporación del menú vertical en el modal

En Angular hay un problema para proyectar un mismo contenido varias veces en lel compnente destino. La solución mas sofisticada pasa por convertir el elemnto a proyectar en un template y manejarlo con `ngTemplateOutlet` y `ngTemplateOutletContext`. Pero en nuestro caso, como el contenido a proyectar es un menú, podemos duplicar los elementos declarados en el componente origen, en este caso app.

```ts app.ts
<alc-header [title]="title()" [subtitle]="subtitle()">
  <alc-menu [options]="menuOptions()" />
  <alc-menu [options]="menuOptions()" [isVertical]="true" />
</alc-header>
``` 

En el menu añadiremos una inputsignal `isVertical` que permitirá al componente menu mostrar el menú en horizontal o vertical según el valor de la propiedad.

```ts menu.ts
import { Component, input, signal } from '@angular/core';
import { MenuOption } from '../../types/menu.option';

@Component({
  selector: 'alc-menu',
  imports: [],
  template: `
    <nav>
      <ul [class.vertical]="isVertical()">
        @for (option of options(); track option.path) {
          <li>
            <a href="{{ option.path }}">
              {{ option.label }}
            </a>
          </li>
        }
      </ul>
    </nav>
  `,
  styles: `
    nav {
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        gap: 1rem;
      }

      .vertical {
        flex-direction: column;
        a {
          font-size: 1.8rem;
        }
      }

      a {
        color: inherit;
        text-decoration: none;
        font-weight: bold;
      }
    }
  `,
})
export class Menu {
  readonly options = input.required<MenuOption[]>();
  readonly isVertical = input(false);
}
```

El mismo atributo `[isVertical]` servirá como selector para diferenciar los dos componentes y proyectarlos en distintos puntos del componente `alc-header`.

```ts header.ts
template: `
  <header class="container">
    ...
    <div class="bottom-row">
      <p>{{ subtitle() }}</p>
      <alc-search class="mobile-only" />
      <div class="desktop-only">
        <ng-content></ng-content>
        <alc-search-ref />
      </div>
    </div>
  </header>
  <alc-separator />
    <alc-modal [isOpen]="isModalOpen()" (closeEvent)="toggleModal(false)">
    <ng-content select="[isVertical]"></ng-content>
  </alc-modal>
`
```
 
### Resultados: Despliegue del menu mobile

![Menu mobile desplegado](./assets/open-mobile-menu.png)
