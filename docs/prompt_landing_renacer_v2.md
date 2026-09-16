# Prompt v2 — Iteración de diseño, confianza y conversión
### Landing Consulta Médica Renacer · alineado a la estructura de directorios real

> Copia el bloque completo y pégalo en Claude. Adjunta en el mismo mensaje: las capturas de la
> landing actual, los flyers del centro y, si ya los tienes, los archivos de imagen definitivos.
> Descomprime antes el paquete `assets_renacer_v2.zip` sobre la raíz del proyecto.

---

## PROMPT

Actúa como director de arte y desarrollador front-end senior especializado en sitios del sector salud. Tengo una landing page funcional para un centro médico chileno que necesita una **segunda iteración centrada en diseño, confianza y conversión**. Te adjunto capturas del estado actual y flyers del centro con información que aún no está incorporada.

### 0. Estructura del proyecto (respétala estrictamente)

```
landing_page_renacer/
├── index.html
├── robots.txt
├── sitemap.xml
├── assets/
│   ├── fonts/nunito/nunito-variable-latin.woff2
│   ├── icons/
│   │   ├── favicon.svg
│   │   ├── icon-maskable.svg
│   │   └── sprite.svg              (referencia; el sprite va inline en index.html)
│   └── img/
│       ├── decor/                  (ondas, blob, línea divisoria, patrón — ya provistos)
│       ├── fotografias/
│       ├── logo/
│       └── og/
├── css/
│   ├── base/        reset.css · typography.css · variables.css
│   ├── components/  buttons.css · cards.css · nav.css · whatsapp-float.css
│   ├── layout/      footer.css · header.css · sections.css
│   └── pages/       home.css
├── js/
│   ├── main.js
│   └── modules/     footer-year.js · nav.js · reveal.js · smooth-scroll.js
├── docs/
└── pages/servicios/
```

**Reglas de arquitectura, no negociables:**
- Sin frameworks, sin build, sin dependencias externas. Solo HTML, CSS y JS nativo.
- **Todo color, espaciado, radio, sombra y tipografía debe declararse en `css/base/variables.css`** y consumirse con `var()`. Cero valores mágicos repartidos por los archivos.
- Los componentes nuevos van en archivos nuevos dentro de `css/components/` — **no** engordes `home.css`. Crea: `team.css`, `faq.css`, `hero.css`, `trust.css`.
- Cada módulo JS nuevo va en `js/modules/` y se registra en `index.html` con `defer`. Crea `faq.js` solo si el acordeón lo requiere.
- Mantén el orden de cascada de las hojas de estilo ya establecido en el `<head>`: base → components → layout → pages.
- Mantén la nomenclatura BEM existente (`bloque__elemento--modificador`).
- El sprite SVG sigue inline en `index.html` por la restricción de `file://`. Agrega ahí los símbolos nuevos que necesites.

### 1. Información de negocio a incorporar

**Equipo profesional — crear sección nueva "Nuestro equipo":**

| Profesional | Especialidad | Horario | Servicios |
|---|---|---|---|
| Dr. Deivis Marroquín | Médico Cirujano | *(confirmar)* | Consulta y domicilio, atención adulto y pediátrica, control de peso, hipertensión, diabetes, enfermedades crónicas |
| Francisca Meneses | Psicóloga infanto-juvenil | Sábados 09:00–14:00 | Terapia individual, autoestima y habilidades sociales, manejo de ansiedad y estrés |
| Marta Canales | Nutricionista | Jueves y viernes 10:00–17:00 · Sábados 10:00–14:00 | Planes alimenticios individuales, pérdida de peso, condiciones específicas |

Cada tarjeta: foto circular, nombre, especialidad, horario, 2–3 líneas de servicios y botón "Agendar con [nombre]" hacia WhatsApp con mensaje precargado específico por profesional.

**Servicios a sumar a la grilla existente:** control de peso, curaciones, atención pediátrica, hipertensión arterial, diabetes, seguimiento de enfermedades crónicas.

**Posicionamiento de marca:** incorpora el mensaje central "Cuidamos de ti, estés donde estés" y los tres valores del centro: profesionalismo, confianza y calidez.

**Contacto:** los dos WhatsApp actuales se mantienen. Existe un tercer número, +56 9 5809 6320, que aparece en los flyers de especialistas — inclúyelo **solo** dentro de las tarjetas de Francisca Meneses y Marta Canales, marcado con `<!-- EDITAR: confirmar si es número de agenda pública -->`.

### 2. Assets disponibles

Estos archivos ya existen en el proyecto. Referéncialos por ruta; no generes SVG inline para ellos:

```
assets/img/logo/logo-renacer.png              512x512   logo circular
assets/img/logo/logo-renacer-blanco.png       512x512   versión blanca para footer
assets/img/logo/logo-mi-bienestar.png         600x260
assets/img/fotografias/hero-doctor.jpg        900x1100  vertical
assets/img/fotografias/equipo-01.jpg          600x600
assets/img/fotografias/equipo-02.jpg          600x600
assets/img/fotografias/equipo-03.jpg          600x600
assets/img/fotografias/centro-sala-espera.jpg 1600x1000
assets/img/fotografias/domicilio.jpg          1200x800
assets/img/og/og-renacer.jpg                  1200x630
assets/img/decor/wave-top.svg                 usa currentColor
assets/img/decor/wave-bottom.svg              usa currentColor
assets/img/decor/blob-hero.svg                máscara orgánica del hero
assets/img/decor/divider-line.svg             60x4, línea bajo títulos
assets/img/decor/pattern-dots.svg             24x24, patrón repetible
assets/icons/favicon.svg                      reemplaza el actual
assets/icons/icon-maskable.svg                512x512
```

Todas las `<img>` con `loading="lazy"` (salvo la del hero, que va `eager` con `fetchpriority="high"`), `width`, `height` explícitos y `alt` descriptivo en español.

### 3. Rediseño del hero

Hoy ocupa media pantalla en blanco. Conviértelo a **dos columnas**:
- Izquierda: `logo-renacer.png` (~72px), eyebrow "Mi Bienestar — Consultorios de Chile", `h1`, eslogan, subtítulo, dos CTAs y una línea de refuerzo bajo los botones: "Respondemos por WhatsApp en minutos".
- Derecha: `hero-doctor.jpg` recortada con la máscara de `blob-hero.svg` y acento turquesa de fondo.
- En móvil apila con la imagen arriba, reducida en altura.
- Sustituye el logotipo de texto del header por `logo-renacer.png` acompañado del nombre.

Estilos en `css/components/hero.css`.

### 4. Reordenar la arquitectura de secciones

```
Hero → Confianza → Atención a domicilio → Servicios → Nuestro equipo
→ Cómo agendar → Preguntas frecuentes → Cuidados especializados → Ubicación → Contacto
```

Corrige el enlace "Nosotros": hoy apunta a `#nosotros`, que es la sección de cuidados de fin de vida y certificado de defunción — un visitante que quiere conocer el centro aterriza en trámites de defunción. Debe apuntar al equipo. Menú final: **Servicios · Domicilio · Equipo · Contacto**.

### 5. Sección de preguntas frecuentes

Acordeón accesible con `<details>`/`<summary>` estilizados (sin JS si es posible; si agregas animación, ponla en `js/modules/faq.js`). Seis preguntas: cobertura Fonasa/Isapre, valor de la consulta, comunas de cobertura domiciliaria, necesidad de orden médica para exámenes, atención pediátrica y tiempo de entrega de resultados de laboratorio. Respuestas como texto de ejemplo claramente marcado con `<!-- EDITAR -->`.

Estilos en `css/components/faq.css`. Añade el `FAQPage` correspondiente al JSON-LD.

### 6. Ajustes visuales concretos

- **Íconos:** sube `stroke-width` de 1.8 a 2, contenedores de 44px a 56px, ícono en azul marino sobre fondo turquesa suave. Rediseña los de kinesiología (hoy parece un enlace) y fonoaudiología (hoy es una onda genérica).
- **Franja de confianza:** los íconos actuales en círculo gris sobre azul marino casi desaparecen. Pásalos a turquesa. Y cambia las etiquetas genéricas por datos concretos — "Atención a domicilio en toda la zona sur" en vez de "Atención domiciliaria disponible". Marca cada dato con `<!-- EDITAR -->`.
- **Tarjetas:** alturas desiguales rompen la grilla (se ve en "Cuidado de adulto mayor a domicilio"). Aplica `align-items: stretch` y `min-height` uniforme por fila.
- **Alineación:** hoy los títulos de sección van centrados y los de grupo a la izquierda. Unifica todo centrado, con `divider-line.svg` debajo.
- **Ritmo de fondos:** blanco → verde agua → **azul marino para "Atención a domicilio"** (tarjetas blancas sobre el azul, es tu diferencial y debe destacar) → blanco → verde agua. Usa las ondas de `decor/` como transición entre bloques de distinto color.
- **Espaciado:** reduce el padding vertical de secciones de 120px a 80px en escritorio y 56px en móvil. Hoy sobra aire, sobre todo antes de "Cómo agendar".
- **Prueba social:** franja con `centro-sala-espera.jpg` y un texto breve al costado que muestre un centro en operación.

### 7. Correcciones técnicas

- Elimina el texto visible "(horario a confirmar)" en Ubicación. Reemplázalo por los horarios reales por profesional.
- Completa el JSON-LD de `MedicalClinic`: `openingHoursSpecification`, `geo` con latitud y longitud de Pedro Aguirre Cerda 9299 San Ramón, `medicalSpecialty`, `priceRange`, `image`, `url` y `sameAs`.
- Agrega un array `employee` con un `Person` por cada profesional.
- Añade `og:image` apuntando a `assets/img/og/og-renacer.jpg` con `og:image:width` 1200 y `og:image:height` 630, más `og:url`, `twitter:card` y `<link rel="canonical">`. Hoy el link compartido por WhatsApp aparece sin previsualización, justo en el canal principal del centro.
- Actualiza `sitemap.xml` con la fecha de modificación y confirma que `robots.txt` no bloquee nada relevante.
- Declara la fuente Nunito con `@font-face` en `typography.css` apuntando al `.woff2` local, con `font-display: swap`.
- Respeta `prefers-reduced-motion` en `reveal.js` y en toda animación CSS.

### 8. Restricciones de contenido

No inventes precios, convenios con Fonasa o Isapre, años de experiencia, número de pacientes atendidos, ni testimonios. Todo dato no confirmado va como `<!-- EDITAR -->`. Mantén tono cercano, respetuoso y profesional, en español de Chile, tratando de "tú". No hagas promesas de resultados clínicos. Conserva el aviso del 131 y la nota de que el sitio es informativo.

### 9. Entrega

Devuelve **archivos completos, nunca fragmentos**, indicando la ruta exacta de cada uno. Entrega en este orden:
1. `css/base/variables.css` actualizado
2. Los archivos nuevos de `css/components/`
3. El resto de CSS modificado
4. Los módulos JS nuevos o modificados
5. `index.html` completo
6. `sitemap.xml`

Cierra con un listado numerado de todos los `<!-- EDITAR -->` pendientes y su ubicación, para que yo los complete.
