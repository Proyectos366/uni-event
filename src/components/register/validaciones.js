import { parsePhoneNumberFromString } from "libphonenumber-js";
import { emailRegex } from "@/utils/regex/correoRegex";
import { cedulaRegex } from "@/utils/regex/cedulaRegex";
import { claveRegex } from "@/utils/regex/claveRegex";
import { textRegex } from "@/utils/regex/textRegex";

// Mismas reglas que valida el back (ValidarCampos / vCamposCrearUsuario), para avisar antes de enviar.

export const PREFIJOS = [
  { valor: "+58", etiqueta: "🇻🇪 +58" },
  { valor: "+57", etiqueta: "🇨🇴 +57" },
  { valor: "+1", etiqueta: "🇺🇸 +1" },
  { valor: "+34", etiqueta: "🇪🇸 +34" },
  { valor: "+51", etiqueta: "🇵🇪 +51" },
  { valor: "+54", etiqueta: "🇦🇷 +54" },
];

export const requisitosClave = [
  { texto: "8 a 16 caracteres", ok: (c) => c.length >= 8 && c.length <= 16 },
  { texto: "Una minúscula", ok: (c) => /[a-z]/.test(c) },
  { texto: "Una mayúscula", ok: (c) => /[A-Z]/.test(c) },
  { texto: "Un número", ok: (c) => /\d/.test(c) },
  { texto: "Un símbolo (!@#$%...)", ok: (c) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(c) },
];

export const soloLetras = (v) => v.replace(/[^a-zA-ZñÑáéíóúÁÉÍÓÚ\s]/g, "");
export const soloNumeros = (v) => v.replace(/\D/g, "");

// El back espera E.164 (+584121234567): se quita el 0 inicial local (0412... -> 412...).
export const armarTelefono = (prefijo, numero) => prefijo + soloNumeros(numero).replace(/^0+/, "");

const hoy = () => new Date().toISOString().slice(0, 10);
export const FECHA_MIN = "1900-01-01";
export const fechaMax = hoy;

export function validarPaso(paso, f) {
  const e = {};

  if (paso === 0) {
    if (!f.correo) e.correo = "Ingresa tu correo";
    else if (!emailRegex.test(f.correo)) e.correo = "Formato de correo inválido";

    if (!f.claveUno) e.claveUno = "Ingresa una contraseña";
    else if (!claveRegex.test(f.claveUno)) e.claveUno = "La contraseña no cumple los requisitos";

    if (!f.claveDos) e.claveDos = "Confirma tu contraseña";
    else if (f.claveUno !== f.claveDos) e.claveDos = "Las contraseñas no coinciden";
  }

  if (paso === 1) {
    if (!cedulaRegex.test(f.cedula)) e.cedula = "Cédula de 7 u 8 dígitos, sin cero inicial";

    if (!f.nombre) e.nombre = "Ingresa tu nombre";
    else if (!textRegex.test(f.nombre)) e.nombre = "Solo letras";
    if (f.nombreDos && !textRegex.test(f.nombreDos)) e.nombreDos = "Solo letras";

    if (!f.apellido) e.apellido = "Ingresa tu apellido";
    else if (!textRegex.test(f.apellido)) e.apellido = "Solo letras";
    if (f.apellidoDos && !textRegex.test(f.apellidoDos)) e.apellidoDos = "Solo letras";

    if (!["1", "2"].includes(f.genero)) e.genero = "Selecciona una opción";

    if (!f.f_n) e.f_n = "Ingresa tu fecha de nacimiento";
    else if (f.f_n < FECHA_MIN) e.f_n = "Fecha demasiado antigua";
    else if (f.f_n > hoy()) e.f_n = "La fecha no puede ser futura";

    const tel = parsePhoneNumberFromString(armarTelefono(f.prefijo, f.telefono));
    if (!tel?.isValid()) e.telefono = "Número de teléfono inválido para ese país";
  }

  return e;
}
