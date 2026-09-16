/* Menú móvil: abre/cierra el nav y sincroniza el botón hamburguesa */
(function () {
  'use strict';

  function initNav() {
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');

    if (!hamburger || !nav) {
      return;
    }

    hamburger.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
      hamburger.setAttribute(
        'aria-label',
        isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'
      );
    });

    nav.querySelectorAll('.nav__link').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Abrir menú de navegación');
      });
    });
  }

  window.RenacerApp = window.RenacerApp || {};
  window.RenacerApp.initNav = initNav;
})();
