// Cálculo de estadísticas a partir de la lista de cursos (se recalcula al crear o editar cursos).

export const COLORES = ["#14b8a6", "#f5b82e", "#0ea5e9", "#f97316", "#64748b", "#10b981", "#8b5cf6", "#ef4444"];

export const moneda = (v) => "$" + String(Math.round(v)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
export const entero = (v) => String(Math.round(v)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
export const porcentaje = (v) => `${Math.round(v)}%`;

const MESES_LARGOS = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
// "2026-09-08" -> "08 Sep 2026" (sin toLocale para evitar diferencias servidor/navegador)
export const fechaCorta = (iso) => {
  if (!iso) return "-";
  const [a, m, d] = iso.split("-");
  return `${d} ${MESES_LARGOS[Number(m) - 1]} ${a}`;
};

export const ventasDe = (c) => c.precio * c.inscritos;

export function calcular(cursos) {
  const ventasTotales = cursos.reduce((s, c) => s + ventasDe(c), 0);
  const inscritos = cursos.reduce((s, c) => s + c.inscritos, 0);
  const cupos = cursos.reduce((s, c) => s + c.cupos, 0);
  const activos = cursos.filter((c) => c.estado === "activo").length;
  const conAsistencia = cursos.filter((c) => c.asistencia > 0);
  const asistencia = conAsistencia.length
    ? conAsistencia.reduce((s, c) => s + c.asistencia * c.inscritos, 0) / conAsistencia.reduce((s, c) => s + c.inscritos, 0)
    : 0;
  const pagantes = cursos.filter((c) => c.precio > 0).reduce((s, c) => s + c.inscritos, 0);

  const agrupar = (clave, valor) => {
    const mapa = new Map();
    cursos.forEach((c) => mapa.set(clave(c), (mapa.get(clave(c)) || 0) + valor(c)));
    return [...mapa].map(([etiqueta, v], i) => ({ etiqueta, valor: v, color: COLORES[i % COLORES.length] }));
  };

  const estados = [
    { clave: "activo", etiqueta: "Activos", color: "#14b8a6" },
    { clave: "pendiente", etiqueta: "Por iniciar", color: "#f5b82e" },
    { clave: "finalizado", etiqueta: "Finalizados", color: "#64748b" },
  ].map((e) => ({ etiqueta: e.etiqueta, color: e.color, valor: cursos.filter((c) => c.estado === e.clave).length }));

  return {
    ventasTotales,
    inscritos,
    cupos,
    activos,
    total: cursos.length,
    ocupacion: cupos ? (inscritos / cupos) * 100 : 0,
    asistencia,
    ticket: pagantes ? ventasTotales / pagantes : 0,
    finalizados: cursos.filter((c) => c.estado === "finalizado").length,
    porEstado: estados,
    inscritosPorCategoria: agrupar((c) => c.categoria, (c) => c.inscritos),
    ventasPorCategoria: agrupar((c) => c.categoria, ventasDe),
    ventasPorCurso: [...cursos].sort((a, b) => ventasDe(b) - ventasDe(a)).map((c) => ({ etiqueta: c.titulo, valor: ventasDe(c) })),
    inscritosPorCurso: [...cursos].sort((a, b) => b.inscritos - a.inscritos).map((c) => ({ etiqueta: c.titulo, valor: c.inscritos })),
  };
}
