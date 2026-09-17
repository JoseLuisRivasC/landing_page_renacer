/* Escribe el año actual en el elemento #year del footer */
(function () {
  'use strict';

  function initFooterYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) {
      yearEl.textContent = String(new Date().getFullYear());
    }
  }

  window.RenacerApp = window.RenacerApp || {};
  window.RenacerApp.initFooterYear = initFooterYear;
})();
