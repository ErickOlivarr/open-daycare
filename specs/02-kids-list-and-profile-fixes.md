# SPEC 02 — Fixes requeridos

> Status: verificado ✅ — 10/10 acceptance criteria aprobadas. No se requieren correcciones.

## Correcciones requeridas

_Ninguna. Todas las acceptance criteria de `specs/02-kids-list-and-profile.md` pasan._

## Evidencia

- Build/Lint: `npm run build` ✅ · `npm run lint` ✅ · sin errores/warnings de consola.
- `/kids`: sidebar (item "Niños" activo) + header GESTIÓN/Niños + "Agregar niño" + buscador + divisor "SALA SOLES · 8 niños" + 8 cards (2 cols).
- Valores de cards fieles al template: tags MANÍ (Mateo), VINCULAR (Valentina), LACTOSA (Tomás); resto chevron. Edades/vinculados coinciden.
- Active state: "Niños" activo en `/kids` y `/kids/[id]`; inactivo en `/` (Feed activo).
- `/kids/mateo-fernandez`: alerta "Alergias y notas", filas nacimiento/sala/ingreso, padres Lucía Fernández (ACTIVA) + Diego Fernández (PENDIENTE), botones "Resumen del día" y "Editar", link "Vincular otro padre".
- `/kids/lucas-romero` (base): sin caja de alergias, "sin padres vinculados" + link "Vincular otro padre".
- Links no implementados = anclas `#` (sin 404). Navegación: "Volver a Niños" → `/kids`; cards → `/kids/<id>`.
- Hover cards: border-color `#F2A78E` + `translate: 0 -2px` (Tailwind v4 `translate` prop).
- Responsive: sidebar colapsa bajo `lg` (hamburguesa), grilla 1 columna, perfil apila columna derecha debajo.
- Next 16: `await params` + tipos de ruta `PageProps<"/kids/[id]">` / `LayoutProps<"/">` (params como Promise) — conforme a docs.
