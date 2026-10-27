import { normalizarFormatoIso } from "#utils/normalizarFormatoIso";
import { fechaFlexibleRegex } from "#utils/regex/fechaFlexibleRegex";
import { z } from "zod";

const fechaMinima = new Date("1900-01-01T00:00:00.000Z");

/**
 Esquema de Zod para la validación, normalización y conversión de fechas a objetos Date UTC.
 Mensajes de error controlados:
 - Tipo o ausencia: "Campo fecha vacio..."
 - Formato no reconocido: "Error formato de fecha invalido..."
 - Ininterpretable / Inexistente (ej: 31 de Feb): "Error no se puede interpretar la fecha..."
 - Fecha futura: "Error fecha no puede pasar el dia actual..."
 - Fecha antigua: "Error fecha muy antigua..."
 @constant {z.ZodSchema<Date>} validarFechaIsoFlexibleZod
*/
const validarFechaIsoFlexibleZod = z
  .string({
    required_error: "Campo fecha vacio...",
    invalid_type_error: "Campo fecha vacio...",
  })
  .trim()
  .min(1, { message: "Campo fecha vacio..." })
  .refine((val) => fechaFlexibleRegex.test(val), {
    message: "Error formato de fecha invalido...",
  })
  .transform((val) => {
    const normalizada = normalizarFormatoIso(val);
    return new Date(normalizada);
  })
  .refine((date) => !isNaN(date.getTime()), {
    message: "Error no se puede interpretar la fecha...",
  })
  .refine((date) => date <= new Date(), {
    message: "Error fecha no puede pasar el dia actual...",
  })
  .refine((date) => date >= fechaMinima, {
    message: "Error fecha muy antigua...",
  });

export default validarFechaIsoFlexibleZod;
