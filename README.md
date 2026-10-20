# Uni Event

Aplicación con Next.js App Router, Prisma 7, SQLite y una PWA. El alias `@/*`
apunta a `src/*` (por ejemplo, `@/lib/prisma`). La PWA mantiene su manifiesto
y service worker en `src/app/manifest.js` y `public/sw.js`.

## Requisitos

- Node.js 22 LTS y npm.
- Docker Engine con Docker Compose v2 para ejecutar el contenedor.

## Desarrollo local

```powershell
if (!(Test-Path .env)) { Copy-Item .env.example .env }
npm ci
npm run db:migrate:deploy
npm run dev
```

La aplicación queda disponible en <http://localhost:3000>. Para crear una
migración durante el desarrollo, usa `npm run db:migrate -- --name nombre`.
`db:push` queda disponible para prototipos, pero no sustituye las migraciones
versionadas del proyecto.

## Vercel y Turso

Vercel ejecuta la aplicación en funciones cuyo disco local no es persistente.
No uses el archivo SQLite local como base de datos desplegada. Para las pruebas
en línea, crea una base SQLite-compatible en Turso. Con Turso CLI autenticado:

```powershell
turso db create uni-event-production
turso db show uni-event-production --url
turso db tokens create uni-event-production
```

En Vercel, abre **Project Settings → Environment Variables** y agrega:

- `TURSO_DATABASE_URL`: URL `libsql://...` de la base.
- `TURSO_AUTH_TOKEN`: token de acceso de Turso.

Usa una base Turso vacía para el primer despliegue. Crea otra base para Preview
y asigna a cada entorno su propia URL y token; así, las pruebas no ejecutan
migraciones contra la base de producción.

Configura también en Vercel los secretos de la aplicación que aparecen en
`.env.example`; usa valores únicos y no subas el archivo `.env` al repositorio.
El build de Vercel ejecuta `scripts/migrate-turso.mjs` antes de compilar: crea
el registro de migraciones, aplica las pendientes y falla si las credenciales
faltan, una migración falló previamente o una migración aplicada fue modificada.

Para futuras modificaciones, crea y revisa la migración localmente con
`npm run db:migrate -- --name nombre`. Las migraciones de Turso se ejecutan en
el siguiente build de Vercel; también puedes probar el proceso con
`npm run db:migrate:turso` después de exportar `TURSO_DATABASE_URL` y
`TURSO_AUTH_TOKEN`. No uses `db:migrate:deploy` contra Turso.

El cliente generado se crea durante `npm run build`; no requiere archivos
TypeScript escritos a mano. La configuración de Prisma se encuentra en
`prisma.config.mjs`. En Vercel se omite el modo `standalone`, reservado aquí
para el despliegue Docker.

## Docker

El Compose de producción crea una imagen Next.js `standalone`, ejecuta las
migraciones en un servicio previo y arranca la aplicación como usuario no-root.
SQLite vive en el volumen persistente `sqlite-data`; no se publica un puerto de
base de datos.

```powershell
if (!(Test-Path .env)) { Copy-Item .env.example .env }
# Edita .env y establece secretos únicos antes de desplegar.
docker compose up --build
```

La aplicación queda disponible en <http://localhost:3000> y Compose comprueba su
estado de salud. Cambia `APP_PORT` en `.env` para elegir el puerto del host.
Para detenerla sin borrar los datos, ejecuta `docker compose down`. No uses
`docker compose down --volumes` salvo que quieras eliminar la base de datos.

Si ya tienes una base SQLite creada con `db:push`, haz una copia de seguridad y
comprueba que su esquema coincide con el de Prisma antes de marcar la migración
inicial como aplicada. De lo contrario, el servicio de migración intentará
crear tablas que ya existen:

```powershell
docker compose run --rm migrate npm run db:migrate:resolve -- --applied 20261016120000_initial
```

No escales varias réplicas con SQLite. Al desplegar PostgreSQL habrá que cambiar
el proveedor en `prisma/schema.prisma`, crear y revisar una historia de
migraciones específica de PostgreSQL, y migrar los datos de forma explícita.
Las migraciones SQLite no son SQL portable a PostgreSQL y cambiar únicamente
`DATABASE_URL` no cambia el proveedor de Prisma.

## Comprobaciones

```powershell
npm run lint
npm run build
```

El esquema está en `prisma/schema.prisma`; las migraciones nuevas se guardan en
`prisma/migrations`. Usa `npm run db:migrate:deploy` para SQLite local o Docker,
y `npm run db:studio` para abrir Prisma Studio localmente. Vercel aplica las
migraciones pendientes de Turso durante el build.
