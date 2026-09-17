Carpeta reservada para futuras páginas de detalle de servicio
(ej. medicina-general.html, psicologia.html, etc.)

Convenciones sugeridas al agregar una página aquí:
- Un archivo HTML por servicio, slug en español y minúsculas
  (ej. pages/servicios/medicina-general.html).
- Reutilizar las hojas de estilo de /css y los módulos de /js
  con rutas relativas ajustadas (../../css/..., ../../js/...).
- Duplicar el header y footer de index.html en cada página nueva
  (no hay partials/includes porque el proyecto es 100% estático,
  sin build tools). Si el sitio crece a muchas páginas, evaluar
  introducir partials cargados vía fetch() + servidor de desarrollo.
