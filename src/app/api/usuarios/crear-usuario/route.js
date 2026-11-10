/**
 @fileoverview Controlador de API para crear un nuevo usuario en el sistema. Este endpoint valida
 los datos recibidos, genera un token de activación, registra al usuario en la base de datos,
 registra eventos de auditoría y retorna el perfil del usuario creado. Utiliza Prisma como ORM
 y servicios personalizados para validación y respuesta estandarizada.
 @module api/usuarios/crearUsuario
*/

// Cliente Prisma para interactuar con la base de datos
import { prisma } from "@/config/prisma";
import { respuestasAlFront } from "@/libs/respuestasAlFront"; // Utilidad para generar respuestas HTTP estandarizadas
import registrarEventoSeguro from "@/libs/trigget"; // Servicio para registrar eventos de auditoría
import vCrearUsuario from "@/services/usuarios/vCrearUsuario"; // Servicio para validar los datos del nuevo usuario

/**
 Maneja las solicitudes HTTP POST para crear un nuevo usuario.
 Valida los datos recibidos, genera un token de activación,
 registra al usuario en la base de datos y retorna su perfil.
 @async
 @function POST
 @param {Request} request - Solicitud HTTP con los datos del nuevo usuario.
 @returns {Promise<Response>} Respuesta HTTP con el usuario creado o mensaje de error.
*/

export async function POST(request) {
  try {
    // 1. Extrae los datos del cuerpo de la solicitud adaptados al schema comunitario
    const datos = await request.json();

    // 2. Ejecuta la validación de los datos recibidos
    const validaciones = await vCrearUsuario(datos);

    // 3. Si la validación falla, registra el intento fallido y retorna error 400
    if (validaciones.status === "error") {
      await registrarEventoSeguro(request, {
        tabla: "usuario",
        accion: "INTENTO_FALLIDO",
        id_objeto: 0,
        id_usuario: 0,
        descripcion: "Validacion fallida al intentar crear usuario",
        datosAntes: null,
        datosDespues: validaciones,
      });

      return respuestasAlFront(
        validaciones.status,
        validaciones.message,
        {},
        400,
      );
    }

    // 4. Ejecuta transacción: crea el usuario y consulta su perfil con sus relaciones comunitarias
    const [nuevoUsuario, usuarioCompleto] = await prisma.$transaction([
      prisma.usuario.create({
        data: {
          cedula: validaciones.cedula,
          nombre: validaciones.nombre,
          nombreDos: validaciones.nombreDos,
          apellido: validaciones.apellido,
          apellidoDos: validaciones.apellidoDos,
          f_n: validaciones.f_n,
          genero: true,
          nacionalidad: validaciones.nacionalidad,
          telefono: validaciones.telefono,
          correo: validaciones.correo,
          token: validaciones.token,
          clave: validaciones.claveEncriptada,
          roles: { connect: { id: validaciones.rolId } },
        },
      }),

      prisma.usuario.findFirst({
        where: {
          cedula: validaciones.cedula,
        },
        select: {
          id: true,
          cedula: true,
          nombre: true,
          nombreDos: true,
          apellido: true,
          apellidoDos: true,
          f_n: true,
          genero: true,
          telefono: true,
          correo: true,
          borrado: true,
          estatus: true,
          createdAt: true,
          roles: {
            select: { id: true, nombre: true },
          },
        },
      }),
    ]);

    // 5. Si no se crea el usuario, registra el error y retorna error 400
    if (!nuevoUsuario) {
      await registrarEventoSeguro(request, {
        tabla: "usuario",
        accion: "ERROR_CREAR_USUARIO",
        id_objeto: 0,
        id_usuario: 0,
        descripcion: "No se pudo crear el usuario",
        datosAntes: null,
        datosDespues: nuevoUsuario,
      });

      return respuestasAlFront(
        "error",
        "Error, no se creo el usuario",
        {},
        400,
      );
    }

    // 6. Registro exitoso del evento y retorno del usuario creado
    await registrarEventoSeguro(request, {
      tabla: "usuario",
      accion: "CREAR_USUARIO",
      id_objeto: usuarioCompleto?.familia?.id ?? 0,
      id_usuario: nuevoUsuario.id,
      descripcion: `Usuario creado y asignado a la comuna ${
        usuarioCompleto?.comuna?.nombre ?? "sin comuna"
      }`,
      datosAntes: null,
      datosDespues: nuevoUsuario,
    });

    return respuestasAlFront(
      "ok",
      "Usuario creado con exito",
      { usuarios: usuarioCompleto },
      201,
    );
  } catch (error) {
    // 7. Manejo de errores inesperados
    console.log(`Error interno crear usuario:`, error);

    await registrarEventoSeguro(request, {
      tabla: "usuario",
      accion: "ERROR_INTERNO",
      id_objeto: 0,
      id_usuario: 0,
      descripcion: "Error inesperado al crear usuario",
      datosAntes: null,
      datosDespues: error.message,
    });

    // Retorna una respuesta de error con un código de estado 500 (Internal Server Error)
    return respuestasAlFront("error", "Error interno crear usuario", {}, 500);
  }
}
