# SPEC 02 — Lista y perfil de niños

> **Status:** Implementado
> **Depends on:** SPEC 01
> **Date:** 2026-09-01
> **Objective:** Implementar las plantillas `references/pantallas/ninos.dc.html` y `perfil-nino.dc.html` como las rutas `/kids` y `/kids/[id]` con estilo visual idéntico.

## Scope

**In:**

- Ruta `/kids`: header "Niños" + botón "Agregar niño", buscador decorativo, divisor "SALA SOLES · 8 niños" y grilla de 8 cards.
- Ruta `/kids/[id]`: perfil de niño (header, alerta de alergias, datos, padres vinculados) con detalle para Mateo y fallback base para los demás.
- Layout compartido `app/(dashboard)/layout.tsx` que reutiliza `Sidebar` para `/`, `/kids` y `/kids/[id]`.
- Item "Niños" del sidebar activo en las rutas de kids.
- Hover de cards (border-color + translateY) como en el template.

**Out of scope (para specs futuros):**

- Filtrado del buscador (input decorativo).
- Páginas destino: agregar-niño, vincular-padre, resumen-día, avisos, mi-cuenta, crear-publicación.
- Autenticación, base de datos, persistencia, edición real.

## Data model

```ts
// app/lib/children.ts
export type TagVariant = "allergy" | "link";
export type ParentStatus = "active" | "pending";

export interface ChildTag {
  label: string;        // "MANÍ" | "VINCULAR" | "LACTOSA"
  variant: TagVariant;
}

export interface Child {
  id: string;           // "mateo-fernandez"
  name: string;         // "Mateo Fernández"
  initial: string;      // "M"
  avatarBg: string;     // "#A9D9E8"
  avatarFg: string;     // "#1F7A93"
  age: number;          // 3
  linkedParents: number;// 2  (0 => "sin padres vinculados")
  tags: ChildTag[];
}

export interface Parent {
  name: string;         // "Lucía Fernández"
  initial: string;      // "L"
  avatarBg: string;     // "#C9B6E8"
  role: string;         // "Mamá"
  status: ParentStatus;
}

export interface ChildDetail extends Child {
  birthDate: string;    // "12 mar 2022"
  room: string;         // "Soles"
  entryDate: string;    // "feb 2025"
  allergyNote: string;  // "Alergia al maní…"
  parents: Parent[];
}

export const children: Child[] = [/* 8, valores exactos del template */];
export const childDetails: Record<string, ChildDetail> = {
  "mateo-fernandez": { /* detalle completo */ },
};
export function getChildDetail(id: string): ChildDetail { /* detalle o fallback base */ }
```

Los 8 niños: Mateo Fernández (MANÍ), Sofía Méndez, Benjamín Ruiz, Valentina Soto (VINCULAR), Tomás Díaz (LACTOSA), Emma Castro, Lucas Romero, Olivia Vega. Solo `mateo-fernandez` tiene `ChildDetail`; `getChildDetail` devuelve el `Child` base (sin `allergyNote`, `parents: []`) para el resto.

## Implementation plan

1. `app/globals.css`: agregar tokens `@theme` nuevos (avatars pink/green/yellow/purple, parent-blue, tags allergy/link, parent status active/pending, alert) reusando `--color-ink` para el botón oscuro.
2. `app/lib/children.ts`: tipos + `children` (8) + `childDetails` + `getChildDetail(id)`.
3. `app/components/Sidebar.tsx`: aceptar `activeItem` (id interno `"feed" | "kids" | "avisos" | "cuenta"`), href de "Niños" → `/kids`, navegación interna con `next/link`.
4. `app/components/ChildCard.tsx`: card de grilla (avatar, nombre, edad·padres, tag o chevron, hover) enlazando a `/kids/[id]`.
5. `app/components/ChildProfile.tsx`: perfil completo dado un `ChildDetail` (header + Editar, alerta alergias, filas, columna Resumen del día + padres + vincular).
6. `app/(dashboard)/layout.tsx` (cliente): shell `Sidebar` + `main`; deriva `activeItem` con `usePathname` y lo pasa por prop.
7. Mover `app/page.tsx` → `app/(dashboard)/page.tsx` (contenido sin cambios).
8. `app/(dashboard)/kids/page.tsx`: header, buscador, divisor y grilla `children.map → ChildCard`.
9. `app/(dashboard)/kids/[id]/page.tsx`: back "Volver a Niños" + `ChildProfile` con `getChildDetail(await params.id)`.
10. Verificar `npm run build`, `npm run lint` y comparación visual contra `references/screenshots/`.

## Acceptance criteria

- [x] `/kids` renderiza sidebar + header + buscador + divisor + 8 cards.
- [x] Las 8 cards muestran los valores exactos del template; tags MANÍ/VINCULAR/LACTOSA solo en Mateo, Valentina y Tomás; el resto muestra chevron.
- [x] "Niños" queda activo en `/kids` y `/kids/[id]`, inactivo en `/`.
- [x] `/kids/mateo-fernandez` muestra perfil completo (alerta alergias, filas nacimiento/sala/ingreso, padres Lucía ACTIVA + Diego PENDIENTE, botones Resumen del día y Editar, link Vincular otro padre).
- [x] `/kids/<otro-id>` muestra perfil base sin caja de alergias y con "sin padres vinculados" + link Vincular otro padre.
- [x] "Volver a Niños" navega a `/kids`; cada card navega a su `/kids/[id]`.
- [x] Buscador, "Agregar niño", "Editar", "Resumen del día", "Vincular otro padre" y links no implementados son anclas `#` (sin 404).
- [x] Hover de cards aplica border-color y translateY.
- [x] `npm run build` y `npm run lint` pasan; sin errores de consola.
- [x] Responsive: sidebar colapsa bajo `lg`; grilla a 1 columna; perfil apila columna derecha.

## Decisions

- **Sí:** rutas `/kids` y `/kids/[id]` (rutas en inglés, UI visible en español).
- **Sí:** layout compartido `app/(dashboard)/layout.tsx` para no duplicar `Sidebar`.
- **Sí:** `Sidebar` recibe `activeItem` por prop (sin lógica de URL dentro del componente); el layout deriva el valor con `usePathname`.
- **Sí:** `app/lib/children.ts` con datos estáticos tipados (inglés en código, español en UI).
- **Sí:** fallback base en `/kids/[id]` para los 7 niños sin detalle.
- **Sí:** links destino inexistentes = anclas `#` (consistente con SPEC 01).
- **No:** filtrado del buscador (decorativo).
- **No:** auth, DB, crear/editar/vincular/resumen, avisos, mi-cuenta.

## Risks

| Risk | Mitigation |
| --- | --- |
| Next 16 tipa `params` como `Promise` en rutas dinámicas | Usar `await params` antes de leer `.id`. |
| Colores nuevos dispersos como hex sueltos | Sumarlos como tokens `@theme`, reusar `--color-ink` para el botón oscuro. |

## What is **not** in this spec

- Filtrado del buscador, agregar/editar niño, vincular padre, resumen del día.
- Avisos, mi-cuenta, crear-publicación, login/DB.
- Cada una, si llega, va en su propio spec.
