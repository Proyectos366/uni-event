/**
 Normaliza una cadena de fecha a formato ISO "YYYY-MM-DD"
 para que new Date() la interprete correctamente en UTC.
 @param {string} cadenaFecha - Cadena recibida ("08-01-1991", "08/01/1991", "1991-01-08")
 @returns {string} Fecha normalizada en formato YYYY-MM-DD
*/
export function normalizarFormatoIso(cadenaFecha) {
  const limpia = cadenaFecha.trim();

  // Si ya empieza por 4 dígitos de año, reemplaza posibles barras por guiones
  if (/^\d{4}/.test(limpia)) {
    return limpia.replace(/\//g, "-");
  }

  // Si viene en formato DD-MM-YYYY o DD/MM/YYYY
  const partes = limpia.split(/[-/]/);
  if (partes.length === 3) {
    const [dia, mes, anio] = partes;
    return `${anio}-${mes}-${dia}`;
  }

  return limpia;
}
