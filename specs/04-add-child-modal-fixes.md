# SPEC 04 — Correcciones requeridas

> Verificación: 2026-09-13 · Spec: `specs/04-add-child-modal.md` · Branch: `spec-04-add-child-modal`

## Resultado

- Total de criterios: 11
- Aprobados: 11
- Fallidos: 0

## Correcciones requeridas

Ninguna. Todos los criterios de aceptación pasan.

## Evidencia de verificación

- `npm run build`: pasa (Next.js 16.3.3, TypeScript OK, 7 rutas generadas).
- `npm run lint`: pasa sin warnings ni errores.
- Consola del navegador: 0 errores, 0 warnings.
- Pruebas funcionales con Playwright en `http://localhost:3000/kids`:
  - Apertura del modal con header (Cancelar · Agregar niño · Guardar) y 5 campos.
  - Selector Sala con Soles/Lunas/Estrellas y Soles por defecto.
  - Validación de nombre vacío: "Ingresá el nombre completo" + borde rojo (`#c5413a`), modal abierto.
  - Validación de fecha: vacía, mal formada `13/13/2025`, inexistente `31/02/2025` y futura `01/01/2030` → error inline, modal abierto.
  - Alta válida `Martina López` / `12/03/2022` / alergias `Maní, Lactosa` → card con initial `M`, edad `4 años`, avatar, tag `MANÍ`, "sin padres vinculados".
  - Alta sin alergias `Juan Pérez` / `05/07/2021` → card sin tags, avatar cíclico (paleta), edad `5 años`.
  - Contador: `8 niños` → `9 niños` → `10 niños`.
  - Cierre por Cancelar, click en backdrop y tecla Esc sin agregar.
- Comparación visual contra `references/pantallas/agregar-nino.dc.html` (no existe screenshot en `references/screenshots/`): header, layout de campos, colores y tipografías coinciden. Captura: `.playwright-mcp/spec04-modal-open.png`.

## Notas menores (no bloqueantes)

- El borde de los inputs del template usa `#EADFD0`; la implementación usa `border-line` (`#ECE0D0`). Diferencia imperceptible, no afecta el criterio.
- `allergiesToTags` genera todos los tags, pero `ChildCard` solo renderiza el primero (`tags[0]`), consistente con el criterio y el alcance del spec.
