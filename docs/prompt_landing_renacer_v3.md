# Prompt v3 — Reposicionamiento: atención exclusivamente a domicilio
### Landing Consulta Médica Renacer

> Pega el bloque completo en Claude. Antes, descomprime `assets_renacer_v3.zip` sobre la raíz del proyecto
> y copia las 4 imágenes del carrusel en `assets/img/carrusel/` con los nombres indicados en la sección 3.

---

## PROMPT

Actúa como desarrollador front-end senior y redactor de contenido para el sector salud. Necesito una **tercera iteración** de la landing de Consulta Médica Renacer. El cambio de fondo es de **modelo de negocio**: el centro **ya no atiende de forma presencial**. Ahora entrega **exclusivamente atención a domicilio en toda la Región Metropolitana**. Todo el sitio debe reflejar ese posicionamiento sin contradicciones.

Mantén la arquitectura actual del proyecto (HTML + CSS modular en `css/base`, `css/components`, `css/layout`, `css/pages` + módulos JS en `js/modules/`), sin frameworks ni dependencias externas. Todos los valores de diseño van en `css/base/variables.css`. Componentes nuevos en archivos nuevos. Nomenclatura BEM.

### 1. Reglas globales (aplican a todo el sitio)

**1.1 Número oficial único: `+56 9 3088 2291`**
- Elimina cualquier referencia a `+56 9 8232 8997` y `+56 9 5809 6320`.
- Todos los enlaces de WhatsApp apuntan a `https://wa.me/56930882291` (con `?text=` precargado según el contexto).
- Actualiza JSON-LD (`telephone`), footer, sección de contacto y botón flotante.

**1.2 Sin dirección física**
- Elimina la sección "Dónde encontrarnos" completa, incluido el `<iframe>` de Google Maps.
- Elimina toda mención a "Pedro Aguirre Cerda 9299", "San Ramón", horarios de atención presencial y cualquier texto como "visítanos", "consulta presencial", "en nuestro centro", "en consulta".
- En el JSON-LD quita `address` y `geo`. Reemplázalos por `areaServed` con `"@type": "AdministrativeArea", "name": "Región Metropolitana de Santiago"`. Cambia el tipo a `MedicalBusiness` con `"medicalSpecialty"` y `availableService` acordes.
- Actualiza `meta description`, `title` y Open Graph: el foco SEO pasa de "consulta médica San Ramón" a **"atención médica a domicilio Región Metropolitana"** / "médico a domicilio Santiago".

**1.3 Cobertura: toda la Región Metropolitana**
- Cualquier texto que hable de San Ramón, "zona sur" o comunas cercanas se reemplaza por **toda la Región Metropolitana**, siempre con énfasis en que la atención es **solo a domicilio**.

**1.4 Eliminar la sección "Nuestro equipo"**
- Los profesionales rotan. Elimina la sección completa, sus tarjetas, sus enlaces de WhatsApp personalizados, el array `employee` del JSON-LD y el CSS asociado (`team.css` y su `<link>`).
- No menciones nombres de profesionales en ninguna parte del sitio.

### 2. Header

- **Agranda el logo** `assets/img/logo/logo-renacer.png`: de su tamaño actual a **64px en escritorio y 52px en móvil** (alto), manteniendo proporción. Ajusta el alto del header para que respire.
- **Menú, en este orden exacto:** `Servicios | Contacto | Misión | Visión | Convenios`
- Cada ítem hace scroll suave a su sección (`#servicios`, `#contacto`, `#mision`, `#vision`, `#convenios`).
- El botón CTA del header se mantiene: "Agendar por WhatsApp".
- El menú hamburguesa en móvil debe contener los mismos 5 ítems.

### 3. Hero con carrusel

Reemplaza la foto del doctor por un **carrusel responsivo de 4 imágenes**, construido en JS nativo dentro de `js/modules/carousel.js` y con estilos en `css/components/carousel.css`.

Rutas:
```
assets/img/carrusel/hero-01.jpg
assets/img/carrusel/hero-02.jpg
assets/img/carrusel/hero-03.jpg
assets/img/carrusel/hero-04.jpg
```

Comportamiento:
- Avance automático cada 5 segundos, con transición de fundido (`opacity`), no deslizamiento.
- **Pausa** al pasar el mouse, al recibir foco por teclado y cuando la pestaña no está visible (`visibilitychange`).
- Controles anterior/siguiente (`<button>` con `aria-label`) e indicadores de punto clicables.
- Navegación con flechas del teclado cuando el carrusel tiene foco.
- Soporte de **swipe táctil** en móvil (`pointerdown` / `pointerup`, umbral de 50px).
- Si `prefers-reduced-motion: reduce` está activo, **sin autoplay**: solo navegación manual.
- Accesibilidad: contenedor con `role="region"`, `aria-roledescription="carrusel"` y `aria-label`; cada slide con `role="group"`, `aria-roledescription="diapositiva"` y `aria-label="1 de 4"`; región `aria-live="polite"` solo cuando el usuario navega manualmente (en autoplay usa `off`).
- Todas las imágenes con `object-fit: cover`, proporción **16:10** fija con `aspect-ratio` para evitar saltos de layout. La primera con `fetchpriority="high"` y `loading="eager"`; las otras tres `loading="lazy"`.
- `alt` descriptivos en español; marca cada uno con `<!-- EDITAR: revisar alt -->`.

Layout del hero:
- Escritorio: dos columnas, texto a la izquierda y carrusel a la derecha con esquinas redondeadas y el acento turquesa del `blob-hero.svg` detrás.
- Móvil: carrusel arriba, texto abajo.

Texto del hero:
- Subtítulo — **reemplaza exactamente**:
  - Antes: "Atención integral para ti y tu familia en San Ramón, con consulta presencial y a domicilio."
  - Después: **"Atención integral para ti y tu familia en toda la Región Metropolitana, con consulta a domicilio."**
- El eyebrow "Mi Bienestar — Consultorios de Chile" se elimina del hero; Mi Bienestar pasa a ser un convenio (sección 7).

### 4. Servicios

Deja **únicamente** estos 10 servicios, en este orden, en una sola grilla bajo el título "Nuestros servicios a domicilio":

1. Medicina General
2. Enfermería
3. Kinesiología
4. Psicología
5. Exámenes de Laboratorio
6. Control de Enfermedades Crónicas
7. Podología
8. Terapia Ocupacional
9. Fonoaudiología
10. Nutricionista

Elimina todo lo demás: Matrona, Control Sano, Control de peso, Curaciones, Atención pediátrica, Hipertensión y Diabetes como tarjetas separadas, Electrocardiogramas, Holter de presión, Cuidado de adulto mayor, y la sección "Cuidados especializados" completa (manejo de dolor, cuidados paliativos, fin de vida, certificado de defunción).

Cada tarjeta: ícono SVG del sprite, nombre y una línea descriptiva de máximo 12 palabras **redactada en clave domiciliaria** ("en tu hogar", "sin salir de casa"). Crea íconos nuevos en el sprite inline para **Terapia Ocupacional** y **Control de Enfermedades Crónicas**.

Elimina la sección separada "Atención a domicilio": ahora todo el sitio es domicilio, por lo que esa sección es redundante. Su mensaje se absorbe en el hero y en el título de servicios.

### 5. Exámenes y procedimientos

Subsección (o bloque destacado) a continuación de la grilla de servicios, con estas dos tarjetas:

- **Exámenes de Laboratorio** — Toma de muestras en tu domicilio.
- **Evaluación Kinésica** — Evaluación y programa personalizado.

### 6. Quiénes somos, Misión, Visión y Valores

Crea cuatro bloques con `id` propio, en este orden: `#quienes-somos`, `#mision`, `#vision`, `#valores`. Estilos en `css/components/about.css`.

> **Importante:** el texto original del cliente menciona "atención presencial y a domicilio" en dos párrafos. Se ajustó abajo para que sea coherente con el modelo exclusivamente domiciliario. Usa **el texto tal como está aquí**, sin reescribirlo.

**Quiénes somos**

Consulta Médica Renacer es un centro de atención en salud orientado a entregar una atención profesional, cercana, oportuna y de calidad, poniendo siempre a las personas y sus necesidades en el centro de nuestro trabajo.

Nuestro propósito es facilitar el acceso a la atención de salud, llevando nuestros servicios directamente al domicilio de nuestros pacientes, adaptándonos a las necesidades de ellos, sus familias y organizaciones.

Contamos con un equipo de profesionales y técnicos comprometidos con brindar una atención responsable, humana y personalizada, procurando que cada paciente reciba una orientación adecuada y un servicio basado en el respeto, la empatía y la confianza.

En Consulta Médica Renacer creemos que cuidar la salud no significa solamente atender una enfermedad, sino también prevenir, orientar, acompañar y promover una mejor calidad de vida.

> Cierre destacado como cita, en tipografía mayor: **"Renacer es cuidar, acompañar y estar cuando más nos necesitas."**

**Nuestra Misión**

Brindar servicios de salud integrales, oportunos, accesibles y de calidad, entregando una atención centrada en las personas, con un equipo comprometido con el bienestar de nuestros pacientes y sus familias.

Buscamos facilitar el acceso a la atención de salud mediante servicios domiciliarios, entregando una atención basada en la empatía, respeto, seguridad, profesionalismo y compromiso, contribuyendo a la prevención, recuperación y mejor calidad de vida de nuestra comunidad.

**Nuestra Visión**

Ser una institución de salud reconocida y valorada por la comunidad, destacándonos por la calidad de nuestros servicios, la atención humana y personalizada y nuestro compromiso permanente con nuestros pacientes.

Aspiramos a crecer de manera responsable, incorporando nuevos servicios y soluciones de atención que permitan acercar la salud a las personas, sus hogares, lugares de trabajo y organizaciones.

Queremos que Consulta Médica Renacer sea sinónimo de confianza, cercanía, calidad y compromiso con la salud.

Diseño sugerido: Misión y Visión lado a lado en escritorio (dos tarjetas), apiladas en móvil.

**Nuestros Valores**

Grilla de 8 tarjetas (4 columnas escritorio, 2 tablet, 1 móvil). **Reemplaza los emojis por íconos SVG** del sprite en turquesa, para mantener coherencia visual y render consistente entre sistemas operativos.

| Valor | Descripción |
|---|---|
| Humanización | Tratamos a cada persona con respeto, empatía y sensibilidad, comprendiendo que detrás de cada paciente existe una historia y una necesidad particular. |
| Profesionalismo | Trabajamos con responsabilidad, compromiso y vocación de servicio, procurando entregar una atención segura y de calidad. |
| Respeto | Valoramos la dignidad, privacidad y derechos de cada paciente, independiente de su edad, condición o situación. |
| Oportunidad | Buscamos facilitar el acceso a la atención de salud en el momento en que nuestros pacientes la necesitan. |
| Confianza | Construimos relaciones basadas en la responsabilidad, transparencia y confidencialidad. |
| Prevención | Promovemos el cuidado de la salud y la prevención como herramientas fundamentales para mejorar la calidad de vida. |
| Compromiso con la comunidad | Trabajamos para acercar los servicios de salud a las personas, familias, empresas e instituciones. |
| Calidad | Buscamos mejorar continuamente nuestros procesos y servicios para entregar una experiencia de atención cada vez mejor. |

### 7. Convenios

Sección nueva `#convenios`, estilos en `css/components/convenios.css`.

- Título: "Convenios"
- Subtítulo: "Trabajamos con instituciones para acercar la salud a sus funcionarios y familias."
- Una tarjeta con el logo `assets/img/convenios/mi-bienestar-gendarmeria.png` (1200×414, fondo transparente; mostrar a máx. 320px de ancho) y el texto **"Mi Bienestar — Gendarmería de Chile"**.
- Estructura la grilla para que agregar convenios futuros sea solo duplicar una tarjeta.
- Bajo la tarjeta, un CTA secundario: "¿Tu institución quiere un convenio? Escríbenos" → WhatsApp con texto precargado "Hola, quisiera información sobre convenios institucionales".
- Agrega el convenio en JSON-LD como `memberOf` u `Organization` relacionada.

### 8. Preguntas frecuentes

Las preguntas deben tratar **solo sobre la atención en sí**, nunca sobre ubicación. Reemplaza las actuales por estas seis, con respuestas marcadas `<!-- EDITAR -->`:

1. ¿Cómo funciona la atención a domicilio?
2. ¿A qué comunas de la Región Metropolitana llegan?
3. ¿Con cuánta anticipación debo agendar?
4. ¿Atienden con Fonasa, Isapre o convenios?
5. ¿Qué debo tener preparado en casa para la visita?
6. ¿Cómo recibo los resultados de mis exámenes de laboratorio?

Actualiza el `FAQPage` del JSON-LD en consecuencia.

### 9. Orden final de secciones

```
Header
Hero (carrusel)
Franja de confianza
Servicios  (#servicios)
Exámenes y procedimientos
Cómo agendar
Quiénes somos  (#quienes-somos)
Misión  (#mision)
Visión  (#vision)
Valores  (#valores)
Convenios  (#convenios)
Preguntas frecuentes
Contacto  (#contacto)
Footer
```

**Franja de confianza** — reemplaza los textos actuales por: "Atención solo a domicilio" · "Toda la Región Metropolitana" · "Profesionales de la salud" · "Agenda por WhatsApp".

**Cómo agendar** — ajusta el paso 3 a: "Confirma tu hora — Recibes la confirmación con fecha, hora y dirección de la visita."

**Contacto** — una sola tarjeta con el WhatsApp oficial, sin mapa ni dirección.

**Footer** — logo blanco, frase de cobertura "Atención a domicilio en toda la Región Metropolitana", WhatsApp oficial, enlaces a las secciones del menú, aviso del 131 y año dinámico. Sin dirección.

### 10. Limpieza de assets y código

Elimina del HTML, CSS y JSON-LD toda referencia a:
- `assets/img/fotografias/hero-doctor.jpg`, `equipo-01.jpg`, `equipo-02.jpg`, `equipo-03.jpg`, `centro-sala-espera.jpg`, `domicilio.jpg`
- `assets/img/logo/logo-mi-bienestar.png` (reemplazado por el logo del convenio)
- `css/components/team.css`

Reemplaza `assets/img/og/og-renacer.jpg` (la versión nueva ya viene sin dirección). Actualiza `sitemap.xml` (`lastmod`).

### 11. Restricciones

- No inventes precios, comunas específicas, plazos de agenda, convenios adicionales ni testimonios: todo dato no confirmado va como `<!-- EDITAR -->`.
- Tono cercano, respetuoso y profesional, español de Chile, tratando de "tú".
- No hagas promesas de resultados clínicos. Conserva el aviso del 131 y la nota de sitio informativo.
- Revisa el sitio completo al terminar buscando las palabras "presencial", "San Ramón", "Pedro Aguirre", "consulta en", "visítanos", "8232", "5809" y "Meneses", "Canales", "Marroquín": **no debe quedar ninguna**.

### 12. Entrega

Archivos **completos** (nunca fragmentos), con su ruta exacta, en este orden:
1. `css/base/variables.css`
2. CSS nuevos: `carousel.css`, `about.css`, `convenios.css`
3. CSS modificados
4. `js/modules/carousel.js` y `js/main.js`
5. `index.html`
6. `sitemap.xml`

Cierra con: la lista de archivos que puedo borrar del proyecto, y el listado numerado de todos los `<!-- EDITAR -->` pendientes con su ubicación.
