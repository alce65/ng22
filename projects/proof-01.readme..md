# Proof 01

Proyecto de Angular 22

Primera prueba de la versión del 22.

Core de la aplicación:

- app
  - layout
  - header
    - logo-angular
    - logo-coders
    - menu
    - menu-mobile
    - modal
    - separator
    - socials
    - user
  - footer
  - card

Un core muy similar se utiliza en demo-01, base del curso de Angular, pero eliminando el layout para simplificar la proyección de contenido

- para la gestión de rutas se utiliza el router de Angular, con lazy loading 

Features: 

- home 
  - componente signal-form, primera prueba de formularios con señales
  - componentes check-model and use-check-model, pruebas de signal model ()
- about (componentes del ejemplo de Angular)
- notes: ejemplos de diversas arquitecturas en la lista de notas:
  - repo local (local storage + promises)
  - repo local rx (local storage + observable rxjs) 
  - api repo (http + observable rxjs)
  - api resource repo (httpResource) - nuevo en la v. 22

- heroes desarrollo del ejemplo del curso de Angular Moderno de DotTechES (Carlos Caballero González)
  - hero-item
  - hero-list
  - hero-form

  - para la comunicación  entre form y list se usa el router de angular, pasando el nuevo héroe desde el form y recuperándolo en la lista escuchando los eventos del router

- super-hero:  versión avanzada del anterior ejemplo de héroes, con un formulario reactivo y un servicio "repositorio" para la gestión de héroes:

  - servicio "state" para la gestión de héroes, con un array de héroes y métodos para obtener la lista de héroes, añadir nuevos héroes y actualizar héroes existentes. 
  
  Inyectamos este servicio en los componentes HeroList y HeroForm para gestionar la lista de héroes de manera centralizada.

- super-hero-api: versión avanzada del ejemplo de super-héroes, con un  servicio "repositorio" para la gestión de héroes, pero en este caso utilizando una API REST para la gestión de héroes:

  - servicio "repositorio" para la gestión de héroes, ligado a un API y métodos para obtener la lista de héroes, añadir nuevos héroes y actualizar héroes existentes. 
  
  Inyectamos este servicio en los componentes HeroList y HeroForm para gestionar la lista de héroes de manera centralizada.

  Mas información en [DotTechES Angular Moderno](C:\Desarrollo\Teaching_Courses\Frontent\Angular\Angular.Modern\learning\dot-tech-es\modern.md)