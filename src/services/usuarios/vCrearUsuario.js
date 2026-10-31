import { prisma } from "@/config/prisma";
import respuestasAlBack from "@/libs/respuestasAlBack";
import obtenerDatosUsuarioToken from "@/services/usuarios/obtenerDatosUsuarioToken";
import vCamposCrearUsuario from "@/services/usuarios/vCamposCrearUsuario";
import tokenCrearUsuario from "@/services/usuarios/tokenCrearUsuario";

export default async function vCrearUsuario(body, token) {
  try {
    const validaciones = await obtenerDatosUsuarioToken(token);

    if (validaciones.status === "error") {
      return respuestasAlBack(validaciones.status, validaciones.message);
    }

    const validarCampos = await vCamposCrearUsuario(body);

    if (validarCampos.status === "error") {
      return respuestasAlBack(validarCampos.status, validarCampos.message);
    }

    const crearToken = await tokenCrearUsuario();

    if (crearToken.status === "error") {
      return respuestasAlBack(crearToken.status, crearToken.message);
    }

    const usuarioExiste = await prisma.usuario.findFirst({
      where: {
        OR: [
          { cedula: validarCampos.cedula },
          { correo: validarCampos.correo },
          { telefono: validarCampos.telefono },
        ],
      },
      select: { id: true }, // solo traemos lo mínimo
    });

    if (usuarioExiste) {
      return respuestasAlBack("error", "Usuario ya existe", {
        codigo: 409,
      });
    }

    if (validaciones.token === false) {
      return respuestasAlBack("ok", "No hay token", {
        cedula: validarCampos.cedula,
        nombre: validarCampos.nombre,
        nombreDos: validarCampos.nombreDos,
        apellido: validarCampos.apellido,
        apellidoDos: validarCampos.apellidoDos,
        genero: validarCampos.genero,
        f_n: validarCampos.f_n,
        nacionalidad: validarCampos.nacionalidad,
        telefono: validarCampos.telefono,
        correo: validarCampos.correo,
        claveEncriptada: validarCampos.claveEncriptada,
        rolId: validarCampos.rolId,
        token: crearToken.token,
      });
    }

    if (validaciones.rolId !== 1 && validaciones.rolId !== 2) {
      return respuestasAlBack("error", "Usuario sin permisos", {
        codigo: 403,
      });
    }

    return respuestasAlBack("ok", "Validacion crear usuario correcta", {
      cedula: validarCampos.cedula,
      nombre: validarCampos.nombre,
      nombreDos: validarCampos.nombreDos,
      apellido: validarCampos.apellido,
      apellidoDos: validarCampos.apellidoDos,
      genero: validarCampos.genero,
      f_n: validarCampos.f_n,
      nacionalidad: validarCampos.nacionalidad,
      telefono: validarCampos.telefono,
      correo: validarCampos.correo,
      claveEncriptada: validarCampos.claveEncriptada,
      token: crearToken.token,
      rolId: validarCampos.rolId,
    });
  } catch (error) {
    console.log("Error interno validar crear usuario:", error);

    return respuestasAlBack("error", "Error interno validar crear usuario");
  }
}
