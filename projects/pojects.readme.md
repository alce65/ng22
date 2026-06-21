# Projects

- demo-01. Contenido del curso de Angular Moderno. Primera parte. Versión 1
  ver \<demo-01.readme.md>

- proof-01. Pruebas y preparaciones.
  ver \<proof-01.readme.md>
  -  Versión inicial para la preparación de demo-01
  -  Pruebas de formularios basados en signals
  -  Implementación de los ejemplos del curso de Angular Moderno de DotTechES. 

## Consideraciones sobre demo-01

- usado en el curso <Angular-AF91550-26-06> para IconoTraining/Indra, en junio de 2026

- Estilos
- Scaffolding y reubicación de App
- Componente Sample (No citado en demo-01)
  - Uso de {{}}
  - Binding de propiedades []
  - Binding de eventos () -> botón que modifica el texto
  - Signals: uso de signal() y estado del componente
- Layout: 
  - 🧿Header
  - 🧿Footer
  - Ubicación en App junto con \<main>
- Proyección de contenido: 🧿Card: uso con 🧿Sample
- Core. @for, @switch
  - Navegación: 🧿Menu, 🧿Menu-mobile, 🧿Socials 
  - Gráficos: 🧿Separator, 🧿Logo-Coders, (Pospuesto Logo-Angular) 
- Core-funcionalidad: ref / viewChild / ciclo de vida
  - 🧿Search, 🧿Search-Ref 
  - 🧿User (icono), 🧿Toggle-theme
- Features Pages. Export default. CSS compartido
- Componentization: 🧿Logo-Angular...
- Comunicación de componentes: input()
- Dashboard: 🧿Counter ([class], @if); 🧿Counter-list (output())
- [RWD: Modal y menu-mobile] / no incluido en este punto

## Consideraciones sobre demo-01.v2

- Estilos
- Scaffolding y reubicación de App
- Componente Course-Item (Posteriormente en la feature course)
  - Uso de {{}}
  - Binding de propiedades, e.g. [src] y [alt]
  - Binding de eventos -> stats del curso (e.g. rating, difficulty, actualization)
- Layout: 
  - Header
  - Footer
  - Ubicación en App junto con \<main>
- Proyección de contenido: Card: uso con Course-Item
- Navegación: Menu, Socials (dejar Menu-mobile para RWD)

## Demo 02

Incorporar routing y navegación entre páginas

Probar inicialmente en proof-01: feature course

- Course-Item básico, como componente sample al inicio del curso
- Entity
- Data-mock json
- Patrón contenedor / presentadores
  - Course-List (contenedor)
  - Course-Item (presentador)
  - Course-Detail (presentador)
  - Course-Edit (presentador)

[Opción_A] Sin Navegación: como hasta ahora con ToDo list y similares

  - Course-List 
  - Course-Item input() / output(): delete / changeStats 
  - Course-Detail input()
  - Course-Add output()
  - Course-Edit input() / output(): ¿changeStats?


[Opción_B] Con navegación: usando routing y navegación entre páginas, con rutas hijas y rutas anidadas 

Páginas: Course-Page, Course-Detail, Course-Edit, Course-Add

Componentes: Course-List, Course-Item, Course-Form (add/edit)

  - Course-Page: contenedor de las páginas hijas
  - Course-List: listado de cursos
  - Course-Detail: detalle de un curso
  - Course-Edit: edición de un curso
  - Course-Add: añadir un nuevo curso


## Demo 03. Services