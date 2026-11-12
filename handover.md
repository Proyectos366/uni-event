# UNI-EVENT — Handover y constitución del proyecto

> Documento de traspaso. Explica **qué es** el proyecto, **cómo está construido**, **qué ya está hecho** y **qué falta**.
> Pensado para quien retome el trabajo (una persona o una sesión de Claude) sin haber visto el historial.
> Última actualización: 11-nov-2026, rama `Gorito`. Si algo aquí contradice el código, manda el código: corrige este archivo.

---

## 1. Qué es el proyecto

**UNI-EVENT** es una plataforma web de gestión académica para la **UNERG** (Proyecto de Grado II). Permite que una universidad publique **cursos y eventos**, que los estudiantes se inscriban y paguen, y que la administración gestione usuarios, docentes, cursos y estadísticas.

### Roles (tabla `roles`, `nivel` 1-4)

| id | Rol | Para qué | Dashboard |
|---|---|---|---|
| 1 | master | Máxima autoridad: crea usuarios, cursos, ve estadísticas | `/dashboard/master` (hecho) |
| 2 | administrador | Gestión académica y administrativa | `/dashboard/administrador` (página mínima) |
| 3 | profesor (docente) | Dicta cursos, sube notas | `/dashboard/profesor` (página mínima) |
| 4 | alumno (estudiante) | Se inscribe, consulta notas y certificados | `/dashboard/alumno` (hecho, con datos de ejemplo) |

### Stack

- **Next.js 16.4** (App Router, Turbopack) + **React 19** + **JavaScript** (no TypeScript en el código).
- **Tailwind CSS 4** (`@tailwindcss/postcss`). Sin librerías de UI ni de gráficas: los gráficos son SVG propios.
- **Prisma 7** con adaptadores: **SQLite** (`@prisma/adapter-libsql`) en local/Docker y **PostgreSQL** (`@prisma/adapter-pg`, Neon) en Vercel.
- Auth propia: **JWT** (`jsonwebtoken`) en cookie `httpOnly` llamada `uni-event`; contraseñas con **bcryptjs**.
- Validación: clases propias (`ValidarCampos`) + `zod` (solo teléfono y fecha) + `libphonenumber-js`.
- `jspdf` para generar certificados en PDF. PWA básica (`public/sw.js`, `manifest.js`).
- Despliegue: **Docker** (Compose: servicios `sqlite-permissions` → `migrate` → `app`) o **Vercel**.

> **Aviso (AGENTS.md):** este Next.js tiene cambios incompatibles con versiones anteriores. Lee la guía correspondiente en `node_modules/next/dist/docs/` antes de usar APIs nuevas (en este checkout esa carpeta no existía; verifica contra el código y el build, no contra memoria).

---

## 2. Cómo correrlo

```powershell
npm ci
npm run db:migrate:deploy     # crea las tablas en prisma/dev.db (SQLite)
npm run prisma:seed           # roles + 2 usuarios iniciales
npm run dev                   # http://localhost:3000 (genera el cliente Prisma antes de arrancar)
```

- Postgres/Neon: `npm run dev:neon`, `db:migrate:postgres`, `db:seed:postgres`. Docker: `docker compose up --build`.
- Comprobar antes de entregar: `npm run lint` y `npx next build` (compilan sin errores; quedan avisos `<img>` aceptados).
- Si `next build` falla por `@/generated/prisma/client`, ejecuta `npx prisma generate`.
- Ejecutar `next build` mientras corre `next dev` comparte la carpeta `.next`; si el dev server se comporta raro, reinícialo.

### Variables de entorno (`.env`, ver `.env.example`)

`DATABASE_URL`, `DATABASE_PROVIDER`, `POSTGRES_PRISMA_URL`, `POSTGRES_URL`, `POSTGRES_URL_NON_POOLING`, `DIRECT_URL`, `TURSO_*`, `APP_PORT`, `JWT_SECRET`, `JWT_EXPIRATION`, `JWT_COOKIE_EXPIRES`, `CIFRADO_CLAVE`, `CIFRADO_ALGORITMO`, `CIFRADO_HASH`.
El proveedor es `postgresql` si existe `VERCEL` o `DATABASE_PROVIDER=postgresql`; si no, `sqlite` (`database.config.mjs`). **Nunca subas `.env`.**

### Usuarios y cómo probar

- El seed crea `carlosjperazab@gmail.com` (master) y `jhorjan2013@gmail.com` (administrador). El seed solo guarda hashes: **las contraseñas no están documentadas**.
- Para tener un alumno: usa `/register` (el auto-registro siempre crea rol 4).
- Para probar un dashboard sin conocer la contraseña, solo en local: firma un JWT con el `JWT_SECRET` del `.env` (`{ correo, rol }`) y ponlo en la cookie `uni-event`. Así se verificaron las vistas con Edge en modo headless.

---

## 3. Arquitectura

```
Navegador ──► src/app/**/page.jsx (vistas)         src/app/api/**/route.js (API REST)
                    │                                        │
                    └── components/**  ◄──fetch──────────────┤
                                                             ▼
                                            src/services/**   (validación + reglas)
                                                             ▼
                                   src/libs/** (JWT, bcrypt, respuestas, auditoría)
                                                             ▼
                                   src/config/prisma.js ──► SQLite | PostgreSQL
```

### Patrones que debes respetar

- **Controlador delgado → servicio → libs/Prisma.** El `route.js` lee el body, llama a un servicio y traduce a HTTP con `respuestasAlFront(status, message, data, codigoHttp)`.
- **Los servicios devuelven siempre** `respuestasAlBack("ok"|"error", mensaje, datos)`, un objeto `{ status, message, ...datos }`. No lanzan excepciones para el flujo normal.
- **Auditoría:** `registrarEventoSeguro(request, {...})` (`libs/trigget.js`) escribe en la tabla `eventos` (IP, antes/después).
- **Sesión:** JWT `{ correo, rol }` en cookie `uni-event` (httpOnly, `secure:false`, `sameSite:lax`). `services/usuarios/obtenerCorreoToken.js` lee la cookie y devuelve `{correo, id_rol}`; **sin cookie devuelve `status:"ok"` con `token:false`** (esto permite el auto-registro). Cualquier guard debe revisar `status === "error"` **y** `token === false`.
- **Guard de páginas:** `services/usuarios/exigirSesion.js` → `exigirSesion([ids de rol])` redirige a `/login`. Úsalo en cada `page.jsx` de dashboard (todas lo usan). No hay `middleware`/`proxy`.
- **Perfil real del usuario:** `services/usuarios/obtenerPerfil.js` (nombres, cédula, correo, teléfono, nacionalidad ya capitalizados) → se pasa como prop a los dashboards.
- **Base de datos dual:** dos esquemas Prisma (`schema.prisma` SQLite y `schema.postgresql.prisma`) con migraciones separadas (`prisma/migrations`, `prisma/migrations-postgresql`). **Al cambiar un modelo hay que cambiar ambos y crear ambas migraciones.**

### API actual

| Método y ruta | Quién | Qué hace |
|---|---|---|
| `POST /api/login/iniciar-sesion` `{correo, clave}` | público | Valida, pone la cookie, devuelve `redirect` según rol |
| `GET /api/login/cerrar-sesion` | cualquiera | Borra la cookie |
| `POST /api/usuarios/crear-usuario` | público o master/admin | Sin sesión: crea **alumno**. Con sesión master/admin: crea el `rolId` enviado |
| `GET /api/usuarios/todos-usuarios` | master/admin | Lista usuarios (excluye al propio y a un correo fijo, ver §6) |

### Mapa de archivos clave

```
src/app/(sitio)/        páginas públicas con Navbar+Footer: home, cursos, eventos, login, register
src/app/dashboard/      alumno | master | profesor | administrador (cada page.jsx usa exigirSesion)
src/components/
  ui/                   PageHero, ThemeToggle (compartidos)
  register/             Ico (iconos SVG), Step* del registro, validaciones.js, Segmentado, RequisitosClave
  student/              todo el panel del estudiante (Dashboard, Sidebar, Actividades, Certificados, ...)
  master/               panel del master: Dashboard/, SidebarMaster, vistas/, charts/, ui/, datos/
  dashboard/{alumno,master}/DashboardCliente.jsx   envoltorios cliente (logout) de cada panel
src/services/           usuarios/, login/, ValidarCampos.js (clase con validadores)
src/libs/               AuthTokens, CifrarDescifrarClaves, respuestasAlBack/Front, trigget
src/utils/              capitalizar.js (cap, nombreCompleto), regex/, etc.
prisma/                 esquemas, migraciones, seed.js
```

---

## 4. Qué está hecho

### Back
- Login con JWT/cookie, cierre de sesión, redirección por rol.
- Alta de usuarios con validaciones completas; auto-registro seguro (siempre alumno).
- Listado de usuarios para master/admin; auditoría de eventos en SQLite.
- Doble proveedor de BD, migraciones, seed, Docker y build para Vercel.

### Front público
- Home (hero, "cómo funciona", cursos destacados), catálogos `/cursos` y `/eventos` con buscador.
- **Login** y **registro de 3 pasos**: validaciones idénticas al back (cédula `V-`/`E-` integrada, clave con checklist en vivo, teléfono internacional por país, fecha 1900-hoy).
- Navbar de 55 px con logo `icon_imagotipo.svg` pegado a los bordes (6 px), Footer, **tema claro/oscuro**.

### Panel del estudiante (`/dashboard/alumno`)
Inicio con estadísticas y calendario, Actividades (filtros, detalle y modal de pago simulado), Mis actividades, Certificados (vista previa y PDF con el **nombre real**), Mis datos (datos reales de la sesión).

### Panel del master (`/dashboard/master`)
- **Inicio** (KPI + gráficas), **Estadísticas** (gráficos de líneas, barras y circular + tabla), **Cursos** (crear con imagen, asignar/cambiar docente, iniciar/finalizar), **Estudiantes por curso** (búsqueda y CSV), **Usuarios** (listado real y alta de administrador/docente/estudiante), **Mi perfil**.

### Transversal
- Tema oscuro centralizado en `globals.css` (clase `dark` en `<html>`, preferencia en `localStorage["tema"]`, **claro por defecto**).
- Sin emojis en la interfaz; iconos SVG de línea (`Ico`).

---

## 5. Qué es real y qué es de ejemplo

| Área | Estado |
|---|---|
| Login, sesión, roles, registro, creación y listado de usuarios | **Real** (base de datos) |
| Nombre, correo, cédula, teléfono del perfil y saludo del dashboard | **Real** (sesión) |
| Cursos, docentes de ejemplo, estudiantes por curso, ventas mensuales, estadísticas | **Ejemplo** (`components/master/datos/`); lo creado se pierde al recargar |
| Cursos/eventos del catálogo y del panel del estudiante, actividades, "mis actividades", certificados obtenidos, calendario, estadísticas de participación | **Ejemplo** (arrays dentro de cada componente) |
| Guardar cambios de perfil y cambiar contraseña (estudiante y master) | **Simulado** (no llama al servidor; hay una nota visible en el master) |
| Pago de inscripción | **Simulado** |

El back **no tiene** modelos de curso, inscripción, pago, actividad ni certificado.

---

## 6. Qué falta por hacer

### Prioridad alta (sin esto el producto no es funcional)
1. **Modelar el dominio en Prisma** (ambos esquemas + 2 migraciones): `curso`, `inscripcion`, `pago`, `actividad/evento`, `certificado`, `asistencia/nota`; relación curso-docente.
2. **Endpoints** de cursos (CRUD, asignar docente), inscripción/cancelación, pagos, estadísticas agregadas y estudiantes por curso; y **conectar** los componentes que hoy usan arrays de ejemplo (la forma de los objetos de `datosEjemplo.js` ya es la esperada).
3. **Perfil y contraseña:** endpoints para actualizar datos y cambiar clave, y quitar la nota "pendiente en el back" de `master/vistas/Perfil.jsx`; hacer lo mismo en `student/PerfilDatos`.
4. **Subida real de imágenes de curso** (hoy se guarda un data URL en memoria): subir al servidor/almacenamiento y guardar la URL.
5. **Dashboards de administrador y profesor** (hoy son una página mínima): gestión académica y carga de notas/asistencia.

### Seguridad y consistencia del back
- `crear-usuario/route.js`: la auditoría usa campos de otro proyecto (`usuarioCompleto?.familia`, `comuna`); corregir `id_objeto` y la descripción.
- `todos-usuarios/route.js` excluye un correo **fijo** (`carlosjperazab@gmail.com`); reemplazar por una regla (p. ej. ocultar solo al propio usuario).
- El modelo `eventos` **solo existe en `schema.prisma` (SQLite)**; falta en `schema.postgresql.prisma` y su migración. En Vercel la auditoría fallará en silencio.
- Los nombres **no se recortan** al guardar (llegó `"bolivar "` con espacio): aplicar `trim` en `ValidarCampos`.
- `AuthTokens.tokenValidarUsuario` usa `Math.random()`; usar `crypto.randomBytes`/`randomUUID`.
- Cookie con `secure:false` fijo: dependiente de `NODE_ENV` en producción. La tabla `sesiones` existe pero no se usa (no hay revocación de tokens).
- El login distingue "usuario no existe" de "clave incorrecta" (permite enumerar correos).
- Sin `middleware`/`proxy`: la protección es solo `exigirSesion` página por página; añadir `exigirSesion` a toda página nueva.
- `ValidarCampos.js` conserva ~9 validadores de otro proyecto (país, estado, municipio, comuna, circuito, consejo comunal...) sin uso: podarlos.

### Front
- Página de **recuperar contraseña** (existe `components/recoverPassword/RecoverPasswordView.jsx` sin ruta ni endpoint).
- Página de detalle público de curso (el botón "Ver más" del catálogo lleva a `/login`).
- Revisar responsive y accesibilidad de las vistas del master en tablets; pruebas con lectores de pantalla.
- Cargar las imágenes de marca definitivas si se desea (`IsoTipo.png` recortado); el SVG del imagotipo tiene un 10% de margen interno, compensado con `-ml-[14px]` en el Navbar (depende del tamaño `h-35`).

### Infra y calidad
- **No hay pruebas automáticas ni CI.** Añadir al menos pruebas de los servicios de validación y de las rutas de auth.
- `README.md` está desactualizado (menciona Turso y `@/lib/prisma`; el alias real es `@/config/prisma`). `comandos.txt` es una nota suelta.
- `public/sw.js` usa el nombre de caché `rengifo-next-v1` (de otro proyecto): renombrar.
- Hay un `git stash` con la eliminación local de `.env.example`; decidir si se descarta o se commitea.
- Confirmar que las migraciones regeneradas por Carlos (`20261110…`) están alineadas en SQLite y PostgreSQL antes de desplegar.

---

## 7. Constitución del proyecto (reglas de trabajo)

1. **Idioma:** código, comentarios y textos de interfaz en **español**. Nombres de dominio en español (`usuario`, `curso`, `cedula`).
2. **Sin emojis** en ninguna parte de la interfaz. Para decorar: iconos SVG (`components/register/Ico.jsx`), texto o códigos (`VE +58`).
3. **El front se adapta al back**, no al revés, salvo arreglos mínimos y justificados. Los cambios de back que hagas déjalos explicados.
4. **Respeta el patrón** controlador → servicio → libs y el objeto `{status, message, ...}`.
5. **Toda página protegida usa `exigirSesion`** con los roles permitidos. Nunca confíes en `rolId` que llegue del cliente para decidir permisos.
6. **Cambios de esquema:** ambos `schema*.prisma` + ambas migraciones. No ejecutes migraciones ni `db push` contra datos reales sin confirmar. No crees bases de datos nuevas.
7. **Mínimas dependencias:** antes de instalar algo, comprueba si Tailwind, SVG o lo ya instalado lo resuelve (los gráficos son SVG propios a propósito).
8. **Diseño:** paleta `unievents-teal #14b8a6`, `unievents-dark #134e4a`, `unievents-bg #fefce8`, `unievents-gold #f5b82e`; tarjetas `rounded-3xl`, portadas con degradado oscuro y luces doradas (`PageHero`). Reutiliza `PageHero`, `Tarjeta`, `Kpi`, `Etiqueta`, `Modal`.
9. **Tema oscuro:** en componentes nuevos usa las clases existentes (`bg-white`, `text-gray-500`, `text-unievents-dark`, `border-gray-100`); el tema las remapea solo. Para SVG usa `var(--chart-*)`. Evita colores fijos oscuros como `#134e4a` sobre tarjetas.
10. **Datos de ejemplo:** si no hay endpoint, ponlos en un módulo aparte con la forma final de los objetos y márcalos como ejemplo; no los mezcles con lógica.
11. **Antes de dar algo por terminado:** `npm run lint` (0 errores), `npx next build` (compila) y mira la pantalla (el tema claro **y** el oscuro, ancho de escritorio y móvil).
12. **Textos honestos:** si algo es simulado, que la interfaz lo diga (como la nota del perfil del master).
13. **Ajustes manuales del equipo:** el usuario edita la interfaz a mano (navbar, logo, tamaños). **Lee el archivo antes de editarlo** y no pises esos cambios; verifica que cada reemplazo automático realmente aplicó.
14. **Fin de línea:** el repo mezcla LF y CRLF. Si automatizas ediciones, tolera ambos.

---

## 8. Decisiones de diseño ya tomadas

- Logos: `icon_imagotipo.svg` en navbar y sidebar abierto; `icon.svg` junto a la hamburguesa y en login/registro.
- Navbar de **55 px** con el logo desbordando la barra a propósito; logo y botones a **6 px** de los bordes laterales, sin contenedor de ancho máximo.
- Nacionalidad en el registro = selector `V-`/`E-` dentro del campo de cédula (se envía 1/2).
- El registro público **no** permite elegir rol (siempre alumno).
- Género se envía como 1 (hombre) / 2 (mujer); el back lo convierte a booleano.
- El tema claro es el predeterminado; el oscuro es opcional y se recuerda.

---

## 9. Primeros pasos recomendados para quien retome

1. Correr el proyecto (§2) y entrar como alumno y como master para ver el estado real.
2. Cerrar la deuda de seguridad barata de §6 (auditoría, correo fijo, `trim`, `eventos` en Postgres).
3. Diseñar el modelo de cursos/inscripciones (§6.1) con el equipo; es el cuello de botella de todo lo demás.
4. Conectar primero **Cursos del master** y **catálogo público** a la API; después estudiante (inscripción y pago) y por último estadísticas.
