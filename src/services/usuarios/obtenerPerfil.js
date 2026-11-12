import obtenerDatosUsuarioToken from "@/services/usuarios/obtenerDatosUsuarioToken";
import { cap } from "@/utils/capitalizar";

// Datos personales del usuario con sesión, listos para mostrar en los perfiles (solo servidor).
export default async function obtenerPerfil() {
  const d = await obtenerDatosUsuarioToken();
  return {
    nombre: cap(d.nombre),
    nombreDos: cap(d.nombreDos),
    apellido: cap(d.apellido),
    apellidoDos: cap(d.apellidoDos),
    cedula: d.cedula ?? "",
    correo: d.correo ?? "",
    telefono: d.telefono ?? "",
    nacionalidad: d.nacionalidad ?? true, // true = venezolano (V), false = extranjero (E)
  };
}
