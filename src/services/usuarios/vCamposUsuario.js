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

export default function validarCamposRegistro(datos) {
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
    rolId,
    estatus,
  } = datos;

  try {
    // 1. Validaciones individuales
    const validarCorreo = ValidarCampos.validarCampoCorreo(correo);
    const validarCedula = ValidarCampos.validarCampoCedula(cedula);
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
    const validarClave = ValidarCampos.validarCampoClave(claveUno, claveDos);
    const validarIdRol = ValidarCampos.validarCampoId(rolId);
    const validareStatus = ValidarCampos.validarCampoNumeroPasarBoolean(
      estatus,
      "estatus",
    );
    const validareNacionalidad = ValidarCampos.validarCampoNumeroPasarBoolean(
      nacionalidad,
      "nacionalidad",
    );

    // 2. Retorna el primer error encontrado
    if (validarCedula.status === "error") return validarCedula;
    if (validarNombre.status === "error") return validarNombre;
    if (validarNombreDos.status === "error") return validarNombreDos;
    if (validarApellido.status === "error") return validarApellido;
    if (validarApellidoDos.status === "error") return validarApellidoDos;
    if (validarGenero.status === "error") return validarGenero;
    if (validarCorreo.status === "error") return validarCorreo;
    if (validarClave.status === "error") return validarClave;
    if (validarIdRol.status === "error") return validarIdRol;
    if (validareStatus.status === "error") return validareStatus;
    if (validareNacionalidad.status === "error") return validareNacionalidad;

    // 3. Retorna respuesta exitosa con todos los datos validados
    return respuestasAlBack("ok", "Campos validados...", {
      cedula: validarCedula.cedula,
      nombre: validarNombre.nombre,
      apellido: validarApellido.apellido,
      correo: validarCorreo.correo,
      claveUno: validarClave.claveUno,
      claveDos: validarClave.claveDos,
      rolId: validarIdRol.id,
      estatus: validareStatus.boolean,
    });
  } catch (error) {
    // 4. Manejo de errores inesperados
    console.log(`Error interno, campos registro usuario:`, error);

    // Retorna una respuesta del error inesperado
    return respuestasAlBack("error", "Error, interno campos resgistro usuario");
  }
}
