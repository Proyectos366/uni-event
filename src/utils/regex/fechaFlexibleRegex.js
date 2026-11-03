/**
 Expresión regular para validar formatos de fecha flexibles, incluyendo:
 - ISO completo: 1991-01-08T00:00:00Z (o con milisegundos)
 - ISO corto: 1991-01-08 o 1991/01/08
 - Tradicional: 08-01-1991 o 08/01/1991
*/
export const fechaFlexibleRegex =
  /^(\d{4}[-/]\d{2}[-/]\d{2}(T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z)?|\d{2}[-/]\d{2}[-/]\d{4})$/;
