<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## MCPs

- Playwright screenshots y cualquier cosa relacionada a Playwright tienen que estar en la carpeta de .playwright-mcp.
- Context7 usaremos este mcp para traer la documentacion actualizada del framework.

## Proyecto

OpenDayCare — app de guardería (personal + familias). UI en español rioplatense con voseo ("Publicá", "Ingresá", "gestioná"). Se construye portando pantallas de referencia a componentes Next reales.

## Stack

- Next.js 16.3.3 (App Router) + React 19. Turbopack por defecto en `next dev`. NO es el Next.js conocido — ver nota arriba.
- Tailwind v4, config CSS-first en `app/globals.css` (`@import "tailwindcss"` + `@theme`). No hay `tailwind.config`.
- Path alias `@/*` → raíz del repo (`tsconfig.json`).
- ESLint flat config (`eslint.config.mjs`) con `eslint-config-next`.

## Referencias de diseño (no son código fuente)

- `references/pantallas/*.dc.html`: pantallas de referencia en un formato custom "dc" (templating con `<x-dc>`, `{{ expr }}`, clases `DCLogic`). Portá cada una a componentes React reales en `app/`.
- `references/pantallas/support.js`: GENERADO desde `dc-runtime/src/*.ts` — no editar.
- `references/screenshots/`: capturas de las pantallas de referencia.

## Comandos

- `npm run dev` — dev server (http://localhost:3000).
- `npm run lint` — ESLint.
- `npm run build` — build + typecheck.
- No hay script de test ni de typecheck dedicado. Typecheck manual: `npx tsc --noEmit`.

## Convenciones

- Next 16 tipa las rutas: usá los tipos globales de props (`LayoutProps<"/">` en `app/layout.tsx`) en vez de `{ children: React.ReactNode }`.

## Spec Driven Development - Skills

- /spec usaremos esta habilidad para crear las especificaciones
- /spec-impl usaremos esta skill para hacer las implementaciones

## Agentes

- `spec-verify` (definido en `.opencode/agent/spec-verify.md`): verifica y marca los checks de "Acceptance criteria" de un spec. Usa Context7 para confirmar recomendaciones de Next 16 y Playwright + visión para comparar pantallas contra `references/screenshots/`. Escribe `specs/<spec>-fixes.md` con las correcciones requeridas.

## Reglas de codigo

- Usar codigo limpio, nombres, funciones, variables, etc en ingles