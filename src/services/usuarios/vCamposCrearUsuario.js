import respuestasAlBack from "@/libs/respuestasAlBack";
import ValidarCampos from "@/services/ValidarCampos";

/**
   Valida todos los campos necesarios para registrar un nuevo usuario. Aplica validaciones
   individuales para cada campo y retorna una respuesta consolidada.
   @function validarCamposRegistro
   @param {string|number} cedula - Cédula del usuario.
   @param {string} nombre - Nombre del usuario.
   @param {string} apellido - Apellido del usuario.
   @param {string} correo - Correo electrónico del usuario.
   @param {string} claveUno - Contraseña principal.
   @param {string} claveDos - Confirmación de la contraseña.
   @param {string|number} rolId - ID del rol asignado al usuario.
   @param {string|number} estatus - Valor que indica si el usuario está autorizado.
   @returns {Object} Objeto con estado, mensaje y datos validados o error.
  */

export default async function vCamposCrearUsuario(campos) {
  try {
    const {
      cedula,
      nombre,
      nombreDos,
      apellido,
      apellidoDos,
      genero,
      f_n,
      nacionalidad,
      telefono,
      correo,
      claveUno,
      claveDos,
      rolId = rolId ?? 4,
    } = campos;

    // 1. Validaciones individuales usando la clase
    const validarCedula = ValidarCampos.validarCampoCedula(cedula);
    const validarCorreo = ValidarCampos.validarCampoCorreo(correo);
    const validarNombre = ValidarCampos.validarCampoNombre(nombre);
    const validarNombreDos = ValidarCampos.validarCampoNombreApellidoDos(
      nombreDos,
      "nombre",
    );
    const validarApellido = ValidarCampos.validarCampoApellido(apellido);
    const validarApellidoDos = ValidarCampos.validarCampoNombreApellidoDos(
      apellidoDos,
      "apellido",
    );
    const validarGenero = ValidarCampos.validarCampoGenero(genero);
    const validarFechaNacimiento =
      ValidarCampos.validarCampoFechaIsoFlexible(f_n);
    const validarNacionalidad =
      ValidarCampos.validarCampoNacionalidad(nacionalidad);
    const validarTelefono = ValidarCampos.validarCampoTelefono(telefono);
    const validarClave = ValidarCampos.validarCampoClave(claveUno, claveDos);
    const validarRolId = ValidarCampos.validarCampoId(rolId, "rol", true);

    // 2. Retorna el primer error encontrado
    if (validarCedula.status === "error") return validarCedula;
    if (validarCorreo.status === "error") return validarCorreo;
    if (validarNombre.status === "error") return validarNombre;
    if (validarNombreDos.status === "error") return validarNombreDos;
    if (validarApellido.status === "error") return validarApellido;
    if (validarApellidoDos.status === "error") return validarApellidoDos;
    if (validarGenero.status === "error") return validarGenero;
    if (validarFechaNacimiento.status === "error")
      return validarFechaNacimiento;
    if (validarNacionalidad.status === "error") return validarNacionalidad;
    if (validarTelefono.status === "error") return validarTelefono;
    if (validarClave.status === "error") return validarClave;
    if (validarRolId.status === "error") return validarRolId;

    const claveCifrada = await CifrarDescifrarClaves.cifrarClave(claveUno);

    if (claveCifrada.status === "error") {
      return respuestasAlBack(claveCifrada.status, claveCifrada.message);
    }

    // 3. Retorna respuesta exitosa con todos los datos validados
    return respuestasAlBack("ok", "Campos validados...", {
      cedula: validarCedula.cedula,
      nombre: validarNombre.nombre,
      nombreDos: validarNombreDos.nombreDos,
      apellido: validarApellido.apellido,
      apellidoDos: validarApellidoDos.apellidoDos,
      genero: validarGenero.genero,
      f_n: validarFechaNacimiento.fecha,
      nacionalidad: validarNacionalidad.nacionalidad,
      telefono: validarTelefono.telefono,
      correo: validarCorreo.correo,
      claveEncriptada: claveCifrada.claveEncriptada,
      rolId: validarRolId.id,
    });
  } catch (error) {
    console.log("Error interno, campos registro usuario:", error);

    return respuestasAlBack("error", "Error interno en validación de usuario");
  }
}
