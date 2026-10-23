/**
 @fileoverview Función utilitaria para obtener los datos completos del usuario activo
 a partir del token de autenticación, incluyendo su rol, institución y departamento.
 @module services/usuarios/obtenerDatosUsuarioToken
*/

import prisma from "@/libs/prisma"; // Cliente Prisma para interactuar con la base de datos
import respuestasAlBack from "@/libs/respuestasAlBack"; // Utilidad para generar respuestas estandarizadas
import obtenerCorreoToken from "@/services/usuarios/obtenerCorreoToken"; // Función para extraer el correo y rol del usuario desde el token

/**
 Obtiene los datos del usuario activo utilizando su correo extraído del token.
 Retorna información como ID, nombre, cédula, rol, institución y departamento.
 @async
 @function obtenerDatosUsuarioToken
 @returns {Promise<Object>} Respuesta estructurada con los datos del usuario o error.
*/
export default async function obtenerDatosUsuarioToken() {
  try {
    // 1. Extraer correo y rol del token de autenticación.
    const validaciones = await obtenerCorreoToken();

    // 2. Si el token es inválido o no contiene datos, retornar error.
    if (validaciones.status === "error") {
      return respuestasAlBack(validaciones.status, validaciones.message);
    }

    // 3. Consultar en la base de datos los datos del usuario por correo.
    const datosUsuario = await prisma.usuario.findFirst({
      where: { correo: validaciones.correo },
      select: {
        id: true,
        cedula: true,
        nombre: true,
      },
    });

    // 4. Si no se encuentra el usuario, retornar error.
    if (!datosUsuario) {
      return respuestasAlBack("error", "Error, usuario invalido");
    }

    // 5. Retornar los datos consolidados del usuario.
    return respuestasAlBack("ok", "Datos usuario obtenidos", {
      cedula: datosUsuario.cedula,
      nombre: datosUsuario.nombre,
      correo: validaciones.correo,
      id_usuario: datosUsuario.id,
      id_rol: validaciones.id_rol,
    });
  } catch (error) {
    // 6. Manejo de errores inesperados.
    console.log("Error interno obtener datos usuario: " + error);

    // Retorna una respuesta del error inesperado
    return respuestasAlBack("error", "Error interno obtener datos usuario");
  }
}
