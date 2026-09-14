# SPEC 03 — Fixes requeridos

> Status: verificado ✅ — 6/6 acceptance criteria aprobadas. No se requieren correcciones.

## Correcciones requeridas

_Ninguna. Todas las acceptance criteria de `specs/03-login-and-activate-account.md` pasan._

## Evidencia

- Build/Lint: `npm run build` ✅ (7 rutas generadas, incluidas `/login` y `/activar-cuenta`) · `npm run lint` ✅ · sin errores de consola en la app.
- `/login`: panel de marca (gradiente `--color-login-from` → `--color-avatar-orange` → `--color-login-to`, círculos decorativos, logo, copy, footer) + formulario (EMAIL con placeholder, CONTRASEÑA, "¿Olvidaste tu contraseña?", CTA "Iniciar sesión", link "Activá tu cuenta"). Sin toggle Personal/Familia y sin sidebar (fuera de `(dashboard)`).
- `/activar-cuenta`: tarjeta centrada con logo, bienvenida, card de invitación (M · Mateo · Sala Soles), código `7K4P9`, email prellenado, contraseña prellenada (borde `#F2A78E`), checkbox marcado, CTA "Activar mi cuenta" y link "Iniciar sesión". Sin sidebar.
- Navegación verificada en runtime: "Activá tu cuenta" → `/activar-cuenta`; "Iniciar sesión" (activar-cuenta) → `/login`; CTA "Iniciar sesión" (login) → `/`. Anclas: "¿Olvidaste tu contraseña?" → `/login#`, "Activar mi cuenta" → `/activar-cuenta#`, sin 404.
- Visual: capturas en `.playwright-mcp/spec03-login-app.png`, `spec03-login-ref.png`, `spec03-activar-cuenta-app.png`, `spec03-activar-cuenta-ref.png`. Coinciden en colores, fuentes (Fredoka/Nunito), espaciados y layout; las únicas diferencias son intencionales (toggle removido y email de login vacío con placeholder) y el badge de dev de Next.
- No hay captura en `references/screenshots/` para estas pantallas; la comparación se hizo renderizando `references/pantallas/login.dc.html` y `activar-cuenta.dc.html` (riesgo previsto y mitigado en el spec).
- Next 16: layout raíz server component con `next/font/google` (variables CSS) y tipos de ruta globales `LayoutProps<"/">`, conforme a las docs de Next 16.
