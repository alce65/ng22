# Demo 01

```shell
ng g app demo-01 --style css --ssr false -p alc -t -s 
```

Se asume el conocimiento de:

- componentes: selector, template, estilos
- content projection

No se experimenta con ellos pero también se dan por conocidos:

- view encapsulation
- change detection
- lifecycle hooks 

Nota: no se utilizan en este proyecto, inputs, outputs, 

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
- una paleta final valida para ambos temas, usando la función light-dark(()

Las variables CSS para tipografía definen las fuentes ba´sca y para los títulos.

Se instalan las fuentes necesarias para la aplicación, en este caso la fuente `Inter`, utilizando el comando:

```shell
npm install @fontsource/inter
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

## Core - Components (1)

```shell
ng g c core/components/alc-app
ng g c core/components/alc-header
ng g c core/components/alc-footer
```


- `alc-app`
  - `alc-header`
  - `router-outlet` 
  - `alc-footer`
  
  
- `alc-socials`
- `alc-card`



## Core - Components (2)

- `alc-app`
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
