# SPEC 01 — Home/Feed según plantilla

> **Status:** Draft
> **Depends on:** —
> **Date:** 2026-08-27
> **Objective:** Implementar la plantilla `references/pantallas/feed.dc.html` como la página de inicio `/` con estilo visual idéntico.

## Scope

**In:**

- Página `/` (home) con el feed completo: sidebar, saludo, composer, divisor "PUBLICADO HOY" y 3 posts (logro, actividad con foto, anuncio).
- Fuentes Fredoka + Nunito vía `next/font/google`.
- Paleta de colores exacta del template como tokens Tailwind v4.
- Responsive: layout usable en pantallas chicas (sidebar colapsa, contenido a ancho completo), manteniendo el desktop fiel al template.

**Out of scope (para specs futuros):**

- Autenticación / login.
- Base de datos o persistencia.
- Páginas destino: crear-publicación, niños, avisos, mi-cuenta, detalle-publicación, foto.
- Interactividad real (crear post, likes, comentarios, editar).

## Data model

```ts
// app/lib/posts.ts
export type PostType = "achievement" | "activity" | "announcement";

export interface Post {
  id: string;
  type: PostType;
  author: string;         // nombre mostrado
  initial: string;        // letra del avatar
  avatarBg: string;       // color de fondo del avatar
  time: string;           // "14:20"
  audience: string;       // "familia de Mateo" | "toda la sala"
  body: string;
  photo?: { title: string };  // solo posts con foto
  likes: number;
  comments: number;
}

export const posts: Post[] = [ /* los 3 posts del template */ ];
```

No hay datos nuevos de dominio: es una constante tipada estática.

Convención: los identificadores y valores internos van en inglés (`achievement`, `activity`, `announcement`); el texto visible al usuario se muestra en español (badges "LOGRO" / "ACTIVIDAD" / "ANUNCIO"). El mapeo inglés → español vive en un diccionario del componente de render.

## Implementation plan

1. `app/globals.css`: reemplazar setup Geist/dark por `@theme` con tokens (fuentes + colores de marca) y estilos base (`background:#F6ECDF`, `color:#3F362E`, `font-family:Nunito`). Eliminar el bloque `prefers-color-scheme: dark`.
2. `app/layout.tsx`: cambiar `Geist` por `next/font/google` Fredoka + Nunito con variables `--font-fredoka` / `--font-nunito`; `lang="es"`; metadata `title: "OpenDayCare"`.
3. `app/lib/posts.ts`: definir `Post` + `posts` (los 3 posts del template, valores exactos).
4. `app/components/Sidebar.tsx`: aside con logo, CTA "Nueva publicación", nav (Feed activo), footer de usuario. Enlaces internos como `#`.
5. `app/components/PostCard.tsx`: render de un post (header avatar/nombre/hora, badge por tipo, "Para:", texto, foto opcional, footer likes/comentarios/Editar). Íconos SVG inline.
6. `app/page.tsx`: componer el feed (saludo, composer, divisor, `posts.map → PostCard`) junto con `Sidebar` en layout flex.
7. Responsive: sidebar oculto bajo `lg`, contenido full-width con padding reducido.
8. Verificar: `npm run build` y `npm run lint`; comparación visual contra `references/screenshots/`.

## Acceptance criteria

- [ ] `/` renderiza sidebar + saludo + composer + divisor + 3 posts.
- [ ] Los 3 posts muestran su badge correcto (LOGRO / ACTIVIDAD / ANUNCIO) y el post de actividad muestra su foto.
- [ ] Colores, fuentes y espaciados coinciden con la plantilla (comparación con screenshot).
- [ ] Fuentes Fredoka y Nunito cargadas (no fallback).
- [ ] Todos los enlaces internos son anclas sin navegación (ningún 404).
- [ ] Sin errores de consola; `npm run build` y `npm run lint` pasan.
- [ ] En ancho mobile el layout no se rompe (sin scroll horizontal, sidebar colapsado).

## Decisions

- **Sí:** Tailwind v4 + tokens `@theme` para portar los estilos (idiomático con el stack, fidelidad visual).
- **Sí:** `next/font/google` para Fredoka/Nunito (mejor que `<link>`: optimizado por Next).
- **Sí:** anclas `#` para páginas inexistentes (sin 404, sin páginas placeholder).
- **Sí:** responsive en alcance (el template no tiene versión mobile; se infiere colapso de sidebar).
- **Sí:** componentes separados `Sidebar` y `PostCard` + constante tipada `posts`.
- **No:** dark mode (se fuerza tema claro, coherente con el template).
- **No:** auth, DB, o navegación real.

## What is **not** in this spec

- Login/autenticación, base de datos, crear/publicar, niños, avisos, mi-cuenta, detalle de publicación, foto.
- Cada una, si llega, va en su propio spec.
