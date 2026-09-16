/* =========================================
   Consulta Médica Renacer — Entry point
   Script clásico (no ES module) para funcionar tanto abriendo
   el archivo directamente (file://) como desde un servidor.
   Depende de que los módulos en /js/modules se hayan cargado antes
   (ver el orden de <script defer> en index.html).
   ========================================= */

(function () {
  'use strict';

  var app = window.RenacerApp || {};

  if (app.initNav) app.initNav();
  if (app.initSmoothScroll) app.initSmoothScroll();
  if (app.initFooterYear) app.initFooterYear();
  if (app.initReveal) app.initReveal();
})();
