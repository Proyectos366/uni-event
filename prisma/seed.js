import "dotenv/config";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.ts";
import {
  getDatabaseProvider,
  getDirectPostgresDatabaseUrl,
  getSqliteDatabaseUrl,
} from "../database.config.mjs";

const databaseProvider = getDatabaseProvider();
const postgresDatabaseUrl = getDirectPostgresDatabaseUrl();

if (databaseProvider === "postgresql" && !postgresDatabaseUrl) {
  throw new Error("Configura una URL de PostgreSQL antes de ejecutar el seed.");
}

const adapter =
  databaseProvider === "postgresql"
    ? new PrismaPg({ connectionString: postgresDatabaseUrl })
    : new PrismaLibSql(
        { url: getSqliteDatabaseUrl() },
        { timestampFormat: "unixepoch-ms" },
      );
const prisma = new PrismaClient({ adapter });

async function main() {
  const roles = [
    {
      nombre: "master",
      nivel: 1,
      descripcion:
        "rol de máxima autoridad del sistema. Resuelve conflictos entre usuarios, supervisa la operación general y puede intervenir en cualquier módulo para restablecer el orden o corregir inconsistencias.",
    },
    {
      nombre: "administrador",
      nivel: 2,
      descripcion:
        "encargado de la gestión académica y administrativa de la institución: crea y administra los cursos que se dictarán, y gestiona usuarios, departamentos, inscripciones y demás configuraciones del sistema.",
    },
    {
      nombre: "profesor",
      nivel: 3,
      descripcion:
        "responsable de sus cursos: aprueba a los alumnos que asistirán, dicta las clases, sube las notas y gestiona las encuestas y actividades de su cátedra.",
    },
    {
      nombre: "alumno",
      nivel: 4,
      descripcion:
        "usuario con acceso a las funciones académicas: se inscribe en cursos disponibles, responde encuestas y consulta sus notas y el estado de sus inscripciones.",
    },
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { nombre: role.nombre },
      create: role,
      update: { nivel: role.nivel, descripcion: role.descripcion },
    });
  }

  const [masterRole, administratorRole] = await Promise.all([
    prisma.role.findUnique({
      where: { nombre: "master" },
      select: { id: true },
    }),
    prisma.role.findUnique({
      where: { nombre: "administrador" },
      select: { id: true },
    }),
  ]);

  if (!masterRole || !administratorRole) {
    throw new Error("No se pudieron obtener los roles iniciales.");
  }

  // Crear usuarios iniciales con sus roles
  const users = [
    {
      cedula: 21259230,
      nombre: "carlos",
      apellido: "peraza",
      genero: true,
      f_n: new Date("1991-01-08T01:00:00.787Z"),
      nacionalidad: true,
      telefono: "0414-488.78.97",
      correo: "carlosjperazab@gmail.com",
      token: "6w2r5ks4rb1gd4r1",
      clave: "$2a$05$qv5dKCZmInzicTS5D0BFu.ThM5g99ScAkKKDjqKfQzMraQjhRnqgS",
      rolId: masterRole.id,
    },
    {
      cedula: 20960870,
      nombre: "jhorjan",
      apellido: "cordova",
      genero: true,
      f_n: new Date("1991-01-08T01:00:00.787Z"),
      nacionalidad: true,
      telefono: "0424-317.04.97",
      correo: "jhorjan2013@gmail.com",
      token: "cs9vot27ih0vm4tb",
      rolId: administratorRole.id,
      clave: "$2a$05$029a1Dus7qStop21IuIKCOgGtrge/F6LvDwGgb9pnxz5/uqEQ3MU.",
    },
  ];

  for (const user of users) {
    await prisma.usuario.upsert({
      where: { cedula: user.cedula },
      create: user,
      update: {},
    });
  }
}

main()
  .then(() => {
    console.log("Seed ejecutado correctamente");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
