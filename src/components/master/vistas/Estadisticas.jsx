"use client";

import PageHero from "@/components/ui/PageHero";
import LineChart from "../charts/LineChart";
import BarChart from "../charts/BarChart";
import PieChart from "../charts/PieChart";
import { Tarjeta, Kpi, Etiqueta } from "../ui/Tarjetas";
import { MESES, VENTAS_MENSUALES, INSCRITOS_MENSUALES, ASISTENTES_MENSUALES, ESTADOS } from "../datos/datosEjemplo";
import { calcular, ventasDe, moneda, entero, porcentaje } from "../datos/estadisticas";

// Estadísticas de cursos: ventas, participación, ocupación y distribución.
export default function Estadisticas({ cursos }) {
  const est = calcular(cursos);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <PageHero
        titulo="Estadísticas de cursos"
        subtitulo="Ventas, participación y ocupación calculadas con los cursos registrados. Se actualizan al crear o modificar un curso."
        chips={[{ valor: moneda(est.ventasTotales), etiqueta: "Ventas" }, { valor: est.total, etiqueta: "Cursos" }]}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <Kpi icono="dinero" etiqueta="Ventas totales" valor={moneda(est.ventasTotales)} color="oro" />
        <Kpi icono="dinero" etiqueta="Ticket promedio" valor={moneda(est.ticket)} detalle="Por inscripción de pago" color="cielo" />
        <Kpi icono="usuarios" etiqueta="Estudiantes inscritos" valor={entero(est.inscritos)} />
        <Kpi icono="curso" etiqueta="Cursos activos" valor={est.activos} detalle={`${est.total} en total`} color="cielo" />
        <Kpi icono="grafico" etiqueta="Ocupación de cupos" valor={porcentaje(est.ocupacion)} color="violeta" />
        <Kpi icono="medalla" etiqueta="Participación promedio" valor={porcentaje(est.asistencia)} detalle="Asistencia ponderada" color="violeta" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Tarjeta titulo="Ventas mensuales" subtitulo="Gráfico de líneas - ingresos 2026 (USD)" className="xl:col-span-2">
          <LineChart etiquetas={MESES} series={[{ nombre: "Ventas", datos: VENTAS_MENSUALES }]} formato={moneda} />
        </Tarjeta>
        <Tarjeta titulo="Cursos por estado" subtitulo="Gráfico circular">
          <PieChart datos={est.porEstado} etiquetaTotal="cursos" />
        </Tarjeta>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Tarjeta titulo="Inscritos frente a asistentes" subtitulo="Gráfico de líneas - participación mensual">
          <LineChart
            etiquetas={MESES}
            series={[
              { nombre: "Inscritos", datos: INSCRITOS_MENSUALES, color: "#14b8a6" },
              { nombre: "Asistentes", datos: ASISTENTES_MENSUALES, color: "#f5b82e" },
            ]}
            formato={entero}
          />
        </Tarjeta>
        <Tarjeta titulo="Ventas por categoría" subtitulo="Gráfico circular - participación en ingresos">
          <PieChart lateral datos={est.ventasPorCategoria} formato={moneda} etiquetaTotal="USD" />
        </Tarjeta>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Tarjeta titulo="Inscritos por categoría" subtitulo="Gráfico de barras">
          <BarChart datos={est.inscritosPorCategoria} formato={entero} />
        </Tarjeta>
        <Tarjeta titulo="Ventas por curso" subtitulo="Gráfico de barras - ranking de ingresos">
          <BarChart horizontal limite={6} datos={est.ventasPorCurso} formato={moneda} />
        </Tarjeta>
      </div>

      <Tarjeta titulo="Detalle por curso" subtitulo="Ocupación, participación y ventas de cada curso" className="overflow-hidden">
        <div className="overflow-x-auto -mx-6">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                <th className="px-6 pb-3">Curso</th>
                <th className="pb-3">Docente</th>
                <th className="pb-3">Ocupación</th>
                <th className="pb-3">Participación</th>
                <th className="pb-3">Ventas</th>
                <th className="px-6 pb-3">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {cursos.map((c) => {
                const ocupacion = c.cupos ? (c.inscritos / c.cupos) * 100 : 0;
                return (
                  <tr key={c.id} className="hover:bg-teal-50/40 transition-colors">
                    <td className="px-6 py-3.5 font-bold text-unievents-dark">{c.titulo}</td>
                    <td className="py-3.5 text-gray-500 font-medium">{c.docente.nombre}</td>
                    <td className="py-3.5">
                      <div className="flex items-center gap-3 min-w-[150px]">
                        <div className="h-2 flex-1 rounded-full bg-gray-100 overflow-hidden">
                          <div className="h-full rounded-full bg-gradient-to-r from-teal-400 to-unievents-teal" style={{ width: `${ocupacion}%` }} />
                        </div>
                        <span className="text-xs font-bold text-gray-500 w-20">{c.inscritos}/{c.cupos}</span>
                      </div>
                    </td>
                    <td className="py-3.5 font-semibold text-gray-600">{c.asistencia ? porcentaje(c.asistencia) : "-"}</td>
                    <td className="py-3.5 font-black text-unievents-teal">{moneda(ventasDe(c))}</td>
                    <td className="px-6 py-3.5"><Etiqueta tono={c.estado}>{ESTADOS[c.estado]}</Etiqueta></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Tarjeta>
    </div>
  );
}
