/**
  @fileoverview Controlador de API para cerrar sesión de un usuario. Este archivo maneja la lógica
  para cerrar la sesión de un usuario a través de una solicitud GET. Utiliza Prisma para la
  interacción con la base de datos, un sistema de registro de eventos para auditoría y validación
  de tokens para asegurar la autenticidad de la sesión.@module
*/

import { cookies } from "next/headers"; // Módulo para gestionar cookies en las solicitudes.
import { respuestasAlFront } from "@/libs/respuestasAlFront"; // Utilidad para estandarizar las respuestas de la API.
import nombreToken from "@/constants/nombreToken"; // Utilidad para obtener el nombre del token de autenticación.

export async function GET() {
  try {
    // 1. Recupera las cookies y el token de autenticación
    const cookieStore = await cookies(); // Esperar la llamada a cookies()

    // 7. Elimina el token de las cookies
    cookieStore.delete(nombreToken);

    return respuestasAlFront(
      "ok",
      "Cerrando sesion",
      {
        redirect: "/",
      },
      201,
    );
  } catch (error) {
    // 8. Manejo de errores inesperados
    console.error("Error interno cerrando sesión:", error);

    // Retorna una respuesta de error con un código de estado 500 (Internal Server Error)
    return respuestasAlFront("error", "Error interno cerrando sesión", {}, 500);
  }
}
