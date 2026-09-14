# SPEC 03 — Login y activación de cuenta

> **Status:** Implementado
> **Depends on:** SPEC 01
> **Date:** 2026-09-13
> **Objective:** Portar las plantillas `login.dc.html` y `activar-cuenta.dc.html` como las rutas `/login` y `/activar-cuenta`, sin sidebar y sin el toggle Personal/Familia.

## Scope

**In:**

- Ruta `/login`: panel de marca (gradiente) + formulario (email, contraseña, "¿Olvidaste tu contraseña?", botón "Iniciar sesión", link "Activá tu cuenta"). Sin toggle Personal/Familia.
- Ruta `/activar-cuenta`: tarjeta centrada con logo, bienvenida, card de invitación (Mateo · Sala Soles), código, email, contraseña, checkbox de autorización, botón "Activar mi cuenta" y link "Iniciar sesión".
- Fuentes Fredoka + Nunito y tokens de color ya existentes (SPEC 01/02), más los tokens nuevos de gradiente que falten.
- Ambas pantallas sin sidebar, fuera del grupo `(dashboard)`.

**Out of scope (para specs futuros):**

- Autenticación real, validación de formularios, backend.
- Toggle Personal/Familia (removido a propósito).
- Pantalla `familia-feed` (destino original de "Activar mi cuenta").
- Página de recuperar contraseña.

## Data model

Esta feature no introduce estructuras de datos nuevas. Es markup estático sin constantes tipadas; los datos de la card de invitación ("Mateo · Sala Soles") van inline.

## Implementation plan

1. `app/globals.css`: agregar tokens `@theme` para el gradiente del panel de login que falten (`#F6A98E`, `#EC7E62`); reusar los tokens existentes para el resto (CTA, brand, placeholder, líneas).
2. `app/login/page.tsx`: server component con grid de 2 columnas (panel de marca + formulario). Sin toggle. Inputs email/contraseña vacíos con placeholder. Link "Activá tu cuenta" → `/activar-cuenta`; botón "Iniciar sesión" → `/`; "¿Olvidaste tu contraseña?" → ancla `#`.
3. `app/activar-cuenta/page.tsx`: tarjeta centrada con todos los elementos del template (inputs con sus valores prellenados y checkbox marcado, tal cual la referencia). Botón "Activar mi cuenta" → ancla `#`; link "Iniciar sesión" → `/login`.
4. Verificar: `npm run build`, `npm run lint` y comparación visual contra `references/pantallas/login.dc.html` y `references/pantallas/activar-cuenta.dc.html`.

## Acceptance criteria

- [x] `/login` renderiza panel de marca + formulario, sin toggle Personal/Familia y sin sidebar.
- [x] `/activar-cuenta` renderiza tarjeta centrada con todos los elementos del template, sin sidebar.
- [x] "Iniciar sesión" navega a `/`; "Activá tu cuenta" navega a `/activar-cuenta`; "¿Ya tenés cuenta? Iniciar sesión" navega a `/login`.
- [x] "¿Olvidaste tu contraseña?" y "Activar mi cuenta" son anclas `#` (sin 404).
- [x] Colores, fuentes y espaciados coinciden con las plantillas.
- [x] `npm run build` y `npm run lint` pasan; sin errores de consola.

## Decisions

- **Sí:** rutas `/login` y `/activar-cuenta` (convención: rutas en inglés, salvo activar-cuenta por claridad).
- **Sí:** sin sidebar; páginas fuera de `(dashboard)` (solo layout raíz con fuentes).
- **Sí:** "Iniciar sesión" → `/` (feed existente de SPEC 01).
- **Sí:** "Activar mi cuenta" → ancla `#` (familia-feed fuera de alcance).
- **Sí:** email del login vacío con placeholder (al quitar el toggle no hay rol que determine el prefill).
- **Sí:** en activar-cuenta se conservan los valores prellenados del template (código `7K4P9`, email, contraseña) y el checkbox marcado, por ser una pantalla de historia de invitación.
- **No:** toggle Personal/Familia (requerido por el usuario).
- **No:** auth real, validación o backend.

## Risks

| Risk | Mitigation |
| --- | --- |
| Referencias sin screenshot en `references/screenshots/` | Comparar contra los `.dc.html`; pedir captura si hace falta. |
| Colores de gradiente nuevos como hex sueltos | Sumarlos como tokens `@theme` y reusar los existentes. |

## What is **not** in this spec

- Autenticación/validación real, familia-feed, recuperar contraseña.
- Cada una, si llega, va en su propio spec.
