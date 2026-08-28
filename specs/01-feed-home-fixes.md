# Spec 01 — Home/Feed — Correcciones

**Resultado de la verificación:** TODOS los criterios de aceptación PASAN.

## Correcciones requeridas

Ninguna. Los 7 criterios de aceptación se cumplen y la implementación ya está lista.

## Evidencia (resumen)

- `npm run lint` → pasó sin errores.
- `npm run build` → compilación + typecheck OK (Next.js 16.3.3 / Turbopack).
- `/` renderiza sidebar + saludo + composer + divisor "PUBLICADO HOY" + 3 posts (snapshot Playwright).
- Badges correctos: LOGRO / ACTIVIDAD / ANUNCIO; el post de actividad muestra su foto ("Foto · pintando con témperas").
- Colores verificados: fondo `#F6ECDF` y texto `#3F362E` (computed styles); coinciden con `references/screenshots/feed.png`.
- Fuentes Fredoka y Nunito cargadas (no fallback): `document.fonts.check` = true, status `loaded`.
- Todos los enlaces internos son `href="#"`; al hacer click la URL queda en `/#` (sin 404).
- 0 errores de consola.
- Mobile (375px): sin overflow horizontal (scrollWidth = clientWidth = 375), sidebar colapsado, hamburguesa visible y abre drawer con backdrop; el drawer se cierra al navegar.
