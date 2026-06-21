# Ng22

Demo probando las características de Angular 22.

Estructura del proyecto:

- `core`: Componentes y servicios compartidos por toda la aplicación, como el layout, el menú o el header.
  - `components`: Componentes reutilizables que forman la base de la interfaz de usuario, como el layout, el menú o el header.
  - `services`: Servicios compartidos que proporcionan funcionalidades comunes, como la gestión de tareas o la autenticación.
  - `types`: Tipos o interfaces y modelos de datos utilizados en toda la aplicación, como el modelo de tarea.
- `features`: Funcionalidades específicas de la aplicación, como la gestión de tareas o la página de Angular.


## Core - Components

- `alc-app`
  - `alc-layout`
  - `alc-header`
    - `alc-logo-angular`
    - `alc-logo-coders`
    - `alc-menu-mobile`
    - `alc-toggle`
    - `alc-user` 
    - `alc-menu`
    - `alc-modal`
    - `alc-separator`
  - `router-outlet` 
  - `alc-footer`
    - `alc-socials`
  - `alc-card`

1. `alc-app`: incluye en su template el `alc-layout` y el `router-outlet`
  el `alc-layout` contiene el `menu`, proyectado como ng-template 

2. `alc-layout`: incluye en su template los componentes `alc-header` y `alc-footer`, junto con la etiqueta <main> en la que proyecta el contenido del `router-outlet`.

  Accede a el template del `alc-menu` mediante contentChild y se lo pasa a `alc-header` como atributo para que pueda proyectar en diversas ubicaciones 

3. `alc-header`: contiene el logo de Angular, el logo de Coders, el menú móvil, el toggle para cambiar el tema, el usuario y el menú desplegable. El menú desplegable incluye opciones como "Perfil", "Configuración" y "Cerrar sesión".

## Creación del proyecto

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.0.0.

### Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

### Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

### Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

### Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

### Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

### Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
