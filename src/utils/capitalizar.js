// El back guarda nombres en minúsculas: se muestran con inicial mayúscula en cada palabra.
export const cap = (t = "") => String(t ?? "").trim().replace(/\b\p{L}/gu, (l) => l.toUpperCase());

// "Gabriel", "Elias", "Bolivar", "Lopez" -> "Gabriel Elias Bolivar Lopez" (omite los vacíos)
export const nombreCompleto = (p) => [p.nombre, p.nombreDos, p.apellido, p.apellidoDos].filter(Boolean).join(" ");
