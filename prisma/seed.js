import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

async function main() {
  // Crear roles iniciales
  await prisma.role.createMany({
    data: [
      {
        nombre: "master",
        descripcion:
          "rol de máxima autoridad del sistema. Resuelve conflictos entre usuarios, supervisa la operación general y puede intervenir en cualquier módulo para restablecer el orden o corregir inconsistencias.",
      },
      {
        nombre: "administrador",
        descripcion:
          "encargado de la gestión académica y administrativa de la institución: crea y administra los cursos que se dictarán, y gestiona usuarios, departamentos, inscripciones y demás configuraciones del sistema.",
      },
      {
        nombre: "profesor",
        descripcion:
          "responsable de sus cursos: aprueba a los alumnos que asistirán, dicta las clases, sube las notas y gestiona las encuestas y actividades de su cátedra.",
      },
      {
        nombre: "alumno",
        descripcion:
          "usuario con acceso a las funciones académicas: se inscribe en cursos disponibles, responde encuestas y consulta sus notas y el estado de sus inscripciones.",
      },
    ],
    skipDuplicates: true,
  });

  // Crear un usuario inicial conectado al rol Master
  await prisma.usuario.createMany({
    data: [
      {
        cedula: 21259230,
        nombre: "carlos",
        apellido: "peraza",
        genero: true,
        f_n: "1991-01-08T01:00:00.787Z",
        nacionalidad: true,
        telefono: "0414-488.78.97",
        correo: "carlosjperazab@gmail.com",
        token: "6w2r5ks4rb1gd4r1",
        clave: "$2a$05$qv5dKCZmInzicTS5D0BFu.ThM5g99ScAkKKDjqKfQzMraQjhRnqgS",
        id_rol: 1,
      },
      {
        cedula: 20960870,
        nombre: "jhorjan",
        apellido: "cordova",
        genero: true,
        f_n: "1991-01-08T01:00:00.787Z",
        nacionalidad: true,
        telefono: "0424-317.04.97",
        correo: "jhorjan2013@gmail.com",
        token: "cs9vot27ih0vm4tb",
        id_rol: 2,
        clave: "$2a$05$029a1Dus7qStop21IuIKCOgGtrge/F6LvDwGgb9pnxz5/uqEQ3MU.",
      },
    ],
  });
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
