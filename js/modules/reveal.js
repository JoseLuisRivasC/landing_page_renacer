/* Animación de aparición al hacer scroll mediante IntersectionObserver */
(function () {
  'use strict';

  function initReveal() {
    const revealElements = document.querySelectorAll('.reveal');

    if (!revealElements.length) {
      return;
    }

    if (!('IntersectionObserver' in window)) {
      revealElements.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealElements.forEach((el) => observer.observe(el));
  }

  window.RenacerApp = window.RenacerApp || {};
  window.RenacerApp.initReveal = initReveal;
})();
