# SPEC 04 — Modal "Agregar niño"

> **Status:** Implementado
> **Depends on:** SPEC 02
> **Date:** 2026-09-13
> **Objective:** Implementar `references/pantallas/agregar-nino.dc.html` como un modal que se abre al hacer click en "Agregar niño" en `/kids`, con validación de campos y alta en memoria.

## Scope

**In:**

- Modal centrado con header (Cancelar · "Agregar niño" · Guardar) y los campos Nombre completo, Fecha de nacimiento (dd/mm/aaaa), Sala (selector), Alergias (etiquetas) y Notas médicas.
- Apertura al hacer click en el botón "Agregar niño" de `/kids`; cierre por Cancelar, click fuera y tecla Esc.
- Campos obligatorios: nombre, fecha de nacimiento y sala. Opcionales: alergias y notas médicas.
- Validación con mensaje inline + borde rojo; botón Guardar siempre habilitado que valida al click.
- Al guardar, agrega una card nueva a la grilla de `/kids` en memoria (se pierde al recargar).
- El contador del header (`N niños`) se deriva de la cantidad de niños en la grilla.

**Out of scope (para specs futuros):**

- Persistencia (localStorage, DB, backend).
- Editar o eliminar el niño agregado.
- Input de tags/chips para alergias (va texto separado por comas).
- Manejo de colisiones de id por nombres repetidos.
- Agrupación de la grilla por sala: todos los niños se listan bajo el header fijo `SALA SOLES`, sin importar la sala elegida en el modal.



## Data model

```ts
// app/lib/children.ts — adiciones (reusa Child y ChildTag existentes)

export const rooms = ["Soles", "Lunas", "Estrellas"] as const;
export type Room = (typeof rooms)[number];

export const avatarPalette: { bg: string; fg: string }[] = [
  { bg: "#A9D9E8", fg: "#1F7A93" },
  { bg: "#F4B8CC", fg: "#C44A7A" },
  { bg: "#B9DEC4", fg: "#3E8B62" },
  { bg: "#F4DC8E", fg: "#9A7B1E" },
  { bg: "#C9B6E8", fg: "#7B5FC0" },
];

export function parseBirthDate(value: string): Date | null; // dd/mm/aaaa real, no futura; null si inválida
export function computeAge(birthDate: Date): number;        // años completos a hoy
export function allergiesToTags(allergies: string): ChildTag[]; // "Maní, Lactosa" → tags allergy (labels en mayúsculas)
export function slugifyName(name: string): string;          // "Martina López" → "martina-lopez"
```

```ts
// estado del formulario en AddChildModal
type FieldErrors = { name?: string; birthDate?: string; room?: string };
```



## Implementation plan

1. `app/globals.css`: agregar token `--color-error` (borde/mensaje rojo) reusando el rojo de alerta.
2. `app/lib/children.ts`: agregar `rooms`, `Room`, `avatarPalette` y los helpers `parseBirthDate`, `computeAge`, `allergiesToTags`, `slugifyName`.
3. `app/components/AddChildModal.tsx` (cliente): formulario + validación; deriva el `Child` (initial, avatar cíclico, edad, tags) y llama `onAdd`/`onClose`.
4. `app/(dashboard)/kids/page.tsx`: pasar a `"use client"`; estado `children` (seed de `app/lib/children.ts`) + `open`; el botón "Agregar niño" pasa de `Link` a `<button>`; renderiza el modal.
5. `app/(dashboard)/kids/page.tsx`: derivar el contador del header (`N niños`, con singular `1 niño`) de la longitud de la lista de niños.
6. Verificar: `npm run build`, `npm run lint` y comparación visual contra `references/pantallas/agregar-nino.dc.html` (no hay screenshot).



## Acceptance criteria

- [x] En `/kids`, click en "Agregar niño" abre el modal con header y los 5 campos, con estilo del template.
- [x] Sala es un selector con 3 opciones: Soles, Lunas y Estrellas (Soles por defecto).
- [x] Guardar con nombre vacío muestra "Ingresá el nombre completo" + borde rojo y no cierra.
- [x] Guardar con fecha vacía, mal formada (ej. "13/13/2025"), inexistente (ej. "31/02/2025") o futura muestra error inline y no cierra.
- [x] Guardar con fecha válida (dd/mm/aaaa real y no futura) se acepta.
- [x] Guardar con datos válidos agrega una card a la grilla con nombre, initial, edad derivada de la fecha, avatar y un tag allergy (el primero de Alergias).
- [x] Alergias y Notas médicas son opcionales; sin alergias la card no muestra tags.
- [x] La card nueva muestra "sin padres vinculados" (0 padres).
- [x] El contador del header muestra la cantidad de niños de la grilla y se actualiza al agregar (ej. `8 niños` → `9 niños`).
- [x] Cancelar, click fuera y Esc cierran el modal sin agregar.
- [x] `npm run build` y `npm run lint` pasan; sin errores de consola.



## Decisions

- **Sí:** modal como client component `AddChildModal` con estado local; lista en memoria dentro de `kids/page.tsx` (sin persistencia).
- **Sí:** auto-derivar initial, edad (desde la fecha), avatar (paleta cíclica) y tags (desde alergias).
- **Sí:** sala por defecto "Soles" (igual que el template), validada contra `rooms`.
- **Sí:** validación de fecha dd/mm/aaaa real y no futura; errores inline + borde rojo; Guardar siempre habilitado y valida al click.
- **Sí:** cierre por Cancelar, backdrop y Esc.
- **Sí:** el contador del header se deriva de la cantidad de niños (plural `N niños`, singular `1 niño`).
- **No:** persistencia (localStorage/DB/backend).
- **No:** editar/eliminar el niño agregado ni manejo de colisiones de id.
- **No:** input de tags/chips para alergias.



## Risks


| Risk                                                          | Mitigation                                                         |
| ------------------------------------------------------------- | ------------------------------------------------------------------ |
| `kids/page.tsx` pasa de server a client component             | Mantener el render idéntico; solo agregar `"use client"` y estado. |
| Sin screenshot de `agregar-nino` en `references/screenshots/` | Comparar contra el `.dc.html`.                                     |
| Id duplicado si se agrega un nombre repetido                  | Aceptado; fuera de alcance.                                        |




## What is **not** in this spec

- Persistencia, editar/eliminar niño, tags/chips de alergias, backend.
- Agrupar la grilla por sala y mostrar más de un tag de alergia por card.
- Cada una, si llega, va en su propio spec.

