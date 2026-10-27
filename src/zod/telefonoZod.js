import { z } from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";

/**
 Esquema de Zod para la validación, sanitización y normalización de números telefónicos.
 Permite validar formatos de cualquier país del mundo y transforma la salida al estándar
 internacional E.164.
 Mensajes de error controlados:
 - Tipo o ausencia: "Campo teléfono vacio..."
 - Longitud cero (tras trim): "Campo teléfono vacio..."
 - Formato / País inválido: "Error, formato teléfono invalido..."
 @constant {z.ZodSchema<string>} validarTelefonoZod
*/
const validarTelefonoZod = z
  .string({
    required_error: "Campo teléfono vacio...",
    invalid_type_error: "Campo teléfono vacio...",
  })
  .trim()
  .min(1, { message: "Campo teléfono vacio..." })
  .refine(
    (val) => {
      // Analiza el número telefónico ingresado usando la librería internacional
      const phoneNumber = parsePhoneNumberFromString(val);
      // Valida si el número es estructuralmente correcto según las reglas del país detectado
      return phoneNumber ? phoneNumber.isValid() : false;
    },
    {
      message: "Error, formato teléfono invalido...",
    },
  )
  .transform((val) => {
    const phoneNumber = parsePhoneNumberFromString(val);
    // Retorna el teléfono en formato estándar internacional E.164 (ej: +584121234567)
    return phoneNumber ? phoneNumber.format("E.164") : val;
  });

export default validarTelefonoZod;
