# SPEC 04 — Correcciones requeridas

> Verificación de `specs/04-add-child-modal.md` (Acceptance criteria).
> Fecha: 2026-09-14
> Resultado: **11/11 criterios aprobados — 0 fallos.**

## Correcciones requeridas

Ninguna. Todos los criterios de aceptación se cumplen. No hay acciones pendientes para este spec.

## Evidencia de la verificación

Verificación hecha contra el código y la app corriendo (`npm run dev`, http://localhost:3000).

- **Criterio 1** — El modal abre al click en "Agregar niño" con header (Cancelar · "Agregar niño" · Guardar) y los 5 campos. Captura `.playwright-mcp/04-modal-open.png` comparada con el render de `references/pantallas/agregar-nino.dc.html` (`.playwright-mcp/04-reference-dc-render.png`): tipografías, colores, bordes, radios y layout coinciden. No existe screenshot de referencia para `agregar-nino` en `references/screenshots/` (confirmado), por lo que la comparación fue contra el `.dc.html`.
- **Criterio 2** — `#child-room` expone exactamente `["Soles", "Lunas", "Estrellas"]` y el valor por defecto es `Soles`.
- **Criterio 3** — Guardar con nombre vacío muestra "Ingresá el nombre completo", el borde de `#child-name` es `rgb(197, 65, 58)` (`--color-error`) y el diálogo sigue abierto.
- **Criterio 4** — Fecha vacía → "Ingresá la fecha de nacimiento"; `13/13/2025`, `31/02/2025` y `01/01/2030` (futura) → "Ingresá una fecha válida (dd/mm/aaaa)"; el diálogo permanece abierto en todos los casos.
- **Criterio 5** — Fecha válida `10/05/2021` se acepta y cierra el modal.
- **Criterio 6** — Card nueva `Niña Prueba`: nombre, initial `N`, edad `5` (derivada de `10/05/2021` a hoy), avatar de la paleta cíclica (`#F4DC8E`/`#9A7B1E`) y tag `MANÍ` (el primero de "Maní, Lactosa").
- **Criterio 7** — Con nombre `Sin Alergias` y sin alergias/notas, la card se crea y no muestra tags (0 `span` de tag).
- **Criterio 8** — La card nueva muestra "sin padres vinculados".
- **Criterio 9** — El contador pasó de `8 niños` a `10 niños` tras agregar dos niños.
- **Criterio 10** — Cancelar, click fuera y `Escape` cierran el modal; el niño no guardado no aparece en la grilla.
- **Criterio 11** — `npm run build` (Next 16.3.3, Turbopack) y `npm run lint` terminan sin errores. La prueba de interacción no registró errores de consola (`consoleErrors: []`).

## Notas de entorno

- No hay MCP de Context7 ni de Playwright configurado en este entorno (`opencode.json` no define MCPs). La verificación de Next 16 se hizo contra la documentación incluida en `node_modules/next/dist/docs/` (`13-fonts.md`, `05-server-and-client-components.md`, `use-client.md`), confirmando el uso correcto de App Router, `next/font/google` con `subsets` y componentes cliente con `"use client"`. La verificación de UI se hizo con `playwright-core` + Chromium del sistema, con capturas en `.playwright-mcp/`.
- Se observó una advertencia de hidratación transitoria en el log del dev server (`caret-color: transparent` en el input de búsqueda de `/kids`) durante la primera carga; no fue reproducible en cargas posteriores ni en la prueba de interacción, y no hay `caret-color` en el código, por lo que se atribuye a un HMR concurrente durante la instalación de dependencias. No afecta la aceptación.
