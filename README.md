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

`npm run dev` selecciona SQLite local y genera el cliente Prisma del esquema
SQLite antes de iniciar Next.js. Para probar localmente con Neon, configura sus
variables de conexión en `.env` y ejecuta `npm run dev:neon`; este comando
selecciona PostgreSQL y genera el cliente correspondiente sin cambiar archivos
ni modificar la base de datos.

Los comandos de base de datos para Neon usan explícitamente su esquema:

```powershell
npm run db:seed:postgres
npm run db:migrate:postgres -- --name nombre
npm run db:migrate:deploy:postgres
npm run db:studio:postgres
```

`npx prisma db seed` usa SQLite por defecto. Para sembrar Neon, usa
`npm run db:seed:postgres`. Ejecuta migraciones y seeds contra una rama de
desarrollo de Neon, no contra producción.

## Desarrollo local y Vercel

Vercel ejecuta la aplicación en funciones cuyo disco local no es persistente.
El desarrollo local usa SQLite por defecto y puede cambiar a Neon con
`npm run dev:neon`; Vercel usa PostgreSQL. Prisma necesita un
esquema y un historial de migraciones distintos para cada proveedor.

Localmente, `DATABASE_URL` puede apuntar a un archivo `file:...`; si no apunta a
un archivo SQLite, la aplicación usa `prisma/dev.db`. También puedes definir
`SQLITE_DATABASE_URL` para elegir el archivo. `npm run dev:neon` usa las
variables PostgreSQL disponibles, como `POSTGRES_PRISMA_URL` o `POSTGRES_URL`.

Para producción, agrega una integración PostgreSQL desde **Vercel Marketplace**
(por ejemplo, Neon; Vercel no proporciona una base de datos PostgreSQL propia
por defecto). Configura las variables de conexión de la integración en Vercel:

- `POSTGRES_URL` o `POSTGRES_PRISMA_URL`: URL PostgreSQL para la aplicación.
- `POSTGRES_URL_NON_POOLING` o `DIRECT_URL`: conexión directa para aplicar
  migraciones. Si el proveedor no define una URL directa, se usa la URL de la
  aplicación.

Aplica las migraciones PostgreSQL desde el directorio `prisma/migrations-postgresql`:

```powershell
npm run db:migrate:postgres -- --name nombre
```

En Vercel, `npm run build` genera el cliente PostgreSQL, aplica las migraciones
pendientes con `prisma migrate deploy` y luego compila Next.js. Define las
variables PostgreSQL también para Preview si vas a desplegar ese entorno.
Configura además los secretos de aplicación de `.env.example` en Vercel; no
subas `.env` al repositorio.

El esquema local SQLite es `prisma/schema.prisma` y sus migraciones están en
`prisma/migrations`. El esquema PostgreSQL está en
`prisma/schema.postgresql.prisma`, con migraciones en
`prisma/migrations-postgresql`. Mantén ambos esquemas al día cuando cambien los
modelos y crea las migraciones para cada proveedor por separado. Prisma genera
el cliente correspondiente al entorno en cada build.

En Vercel se omite el modo `standalone`, reservado aquí para el despliegue
Docker, que sigue usando SQLite persistente en un volumen.

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
