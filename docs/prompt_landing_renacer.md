# Prompt para generar la landing page — Consulta Médica Renacer

> Copia todo el bloque siguiente y pégalo en Claude. Adjunta el banner en el mismo mensaje si quieres que respete la identidad visual con más precisión.

---

## PROMPT

Actúa como desarrollador front-end senior con criterio de diseño. Necesito que construyas una **landing page de una sola página, responsive y lista para producción** para un centro médico chileno. Entrega el resultado como archivos separados: `index.html`, `styles.css` y `script.js` (sin frameworks, sin dependencias de build; puedes usar Google Fonts y SVG inline).

### 1. Información del negocio (usar textualmente, no inventar datos)

- **Nombre comercial:** Consulta Médica Renacer
- **Respaldo institucional:** Mi Bienestar — Consultorios de Chile
- **Eslogan principal:** "Tu salud, nuestra prioridad"
- **Propuesta de valor:** "Atención integral para ti y tu familia"
- **Dirección:** Pedro Aguirre Cerda 9299, San Ramón, Región Metropolitana, Chile
- **WhatsApp 1:** +56 9 3088 2291
- **WhatsApp 2:** +56 9 8232 8997

### 2. Servicios (agrupar en tres categorías, tal como aparecen)

**Atención clínica presencial**
Medicina General · Psicología · Nutrición · Matrona · Fonoaudiología · Podología · Control Sano · Kinesiología

**Atención a domicilio**
Médico a domicilio · Enfermería a domicilio · Exámenes a domicilio · Cuidado de adulto mayor a domicilio

**Exámenes y procedimientos**
Exámenes de laboratorio · Electrocardiogramas · Holter de presión

**Cuidados especializados**
Manejo de dolor y cuidados paliativos · Cuidados de fin de vida · Certificado de defunción

### 3. Estructura de secciones

1. **Header fijo** con logo textual, navegación ancla (Servicios, Domicilio, Nosotros, Contacto) y botón CTA "Agendar por WhatsApp". Menú hamburguesa bajo 768 px.
2. **Hero** con titular, eslogan, subtítulo de propuesta de valor y dos botones: "Agendar hora" (WhatsApp) y "Ver servicios" (scroll suave).
3. **Franja de confianza:** 3–4 indicadores breves (atención domiciliaria, profesionales acreditados, cobertura familiar, agendamiento inmediato).
4. **Servicios:** grilla de tarjetas con ícono SVG, nombre y una línea descriptiva de máximo 12 palabras que tú redactes.
5. **Atención a domicilio:** sección destacada con fondo diferenciado, explicando el diferencial y CTA propio.
6. **Cuidados especializados:** tratar con tono sobrio y empático, sin lenguaje comercial.
7. **Cómo agendar:** 3 pasos numerados (elige el servicio → escribe por WhatsApp → confirma tu hora).
8. **Ubicación:** dirección, `<iframe>` de Google Maps embebido apuntando a la dirección, y horario referencial marcado como placeholder editable.
9. **Contacto:** ambos números como enlaces `https://wa.me/56930882291` y `https://wa.me/56982328997` con mensaje pre-cargado vía parámetro `?text=`.
10. **Footer** con datos de contacto, nota de Mi Bienestar y año dinámico por JS.
11. **Botón flotante de WhatsApp** en esquina inferior derecha, visible en todo el scroll.

### 4. Identidad visual

- **Paleta:** azul marino profundo `#173F6B` (primario), turquesa `#2E9CA8` (secundario), verde agua claro `#E8F4F4` (fondos suaves), blanco y gris texto `#4A4A4A`.
- **Tipografía:** una sans-serif legible y cálida (Poppins, Nunito o similar); títulos en semibold, cuerpo en regular.
- **Estilo:** limpio y sanitario, esquinas redondeadas (8–16 px), sombras suaves, generoso espacio en blanco, ondas o curvas sutiles como separadores de sección (SVG), coherente con un banner que combina azul marino y turquesa.
- **Iconografía:** SVG inline monocromáticos en turquesa dentro de círculos con fondo claro.

### 5. Requisitos técnicos

- HTML5 semántico (`header`, `nav`, `main`, `section`, `footer`), jerarquía correcta de encabezados, un solo `h1`.
- CSS con variables en `:root`, layout con Flexbox/Grid, **mobile-first**, breakpoints en 480 / 768 / 1024 px.
- Accesibilidad: contraste AA, `alt` descriptivos, `aria-label` en enlaces de ícono, foco visible en navegación por teclado.
- SEO: `<title>` y `meta description` orientados a "consulta médica San Ramón", Open Graph básico, y **JSON-LD con schema `MedicalClinic`** incluyendo nombre, dirección y teléfonos.
- Rendimiento: sin librerías externas pesadas, imágenes con `loading="lazy"`, CSS y JS propios.
- Idioma: **español de Chile** (`lang="es-CL"`), tono cercano, respetuoso y profesional. Trata al visitante de "tú".
- JS mínimo: menú móvil, scroll suave, año dinámico y animación de aparición al hacer scroll con `IntersectionObserver`.

### 6. Restricciones de contenido

- No inventes precios, horarios, nombres de profesionales, convenios con isapres/Fonasa ni testimonios. Donde falte información, usa un placeholder claramente marcado con el comentario `<!-- EDITAR -->`.
- No hagas promesas clínicas ni afirmaciones de resultados de salud.
- Incluye un aviso discreto en el footer: la web es informativa y no reemplaza una consulta médica; ante una urgencia, llamar al 131.

### 7. Entrega

Devuelve los tres archivos completos y funcionales, y al final una lista breve de los puntos marcados como `<!-- EDITAR -->` para que yo los complete.
