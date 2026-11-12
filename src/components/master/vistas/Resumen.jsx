"use client";

import PageHero from "@/components/ui/PageHero";
import LineChart from "../charts/LineChart";
import BarChart from "../charts/BarChart";
import PieChart from "../charts/PieChart";
import { Tarjeta, Kpi, Etiqueta } from "../ui/Tarjetas";
import { MESES, VENTAS_MENSUALES, ESTADOS } from "../datos/datosEjemplo";
import { calcular, moneda, entero, porcentaje, fechaCorta } from "../datos/estadisticas";

// Inicio del master: vista general de la gestión de cursos.
export default function Resumen({ cursos, irA, nombre }) {
  const est = calcular(cursos);
  const recientes = [...cursos].sort((a, b) => b.inicio.localeCompare(a.inicio)).slice(0, 4);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <PageHero
        titulo={`Hola, ${nombre}`}
        subtitulo="Resumen de la gestión académica: cursos, estudiantes y ventas en un solo lugar."
        chips={[
          { valor: est.activos, etiqueta: "Cursos activos" },
          { valor: entero(est.inscritos), etiqueta: "Inscritos" },
        ]}
      >
        <div className="mt-6 flex flex-wrap gap-3">
          <button onClick={() => irA("cursos")} className="rounded-full bg-unievents-gold px-6 py-2.5 font-bold text-unievents-dark shadow-lg hover:brightness-110 hover:-translate-y-0.5 transition cursor-pointer">
            Gestionar cursos
          </button>
          <button onClick={() => irA("usuarios")} className="rounded-full border border-white/40 px-6 py-2.5 font-bold hover:bg-white/10 transition cursor-pointer">
            Crear usuarios
          </button>
        </div>
      </PageHero>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <Kpi icono="dinero" etiqueta="Ventas totales" valor={moneda(est.ventasTotales)} detalle="Acumulado de todos los cursos" color="oro" />
        <Kpi icono="usuarios" etiqueta="Estudiantes inscritos" valor={entero(est.inscritos)} detalle={`${est.total} cursos`} />
        <Kpi icono="curso" etiqueta="Cursos activos" valor={est.activos} detalle={`${est.finalizados} finalizados`} color="cielo" />
        <Kpi icono="grafico" etiqueta="Ocupación de cupos" valor={porcentaje(est.ocupacion)} detalle={`${entero(est.inscritos)} de ${entero(est.cupos)} cupos`} color="violeta" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Tarjeta titulo="Ventas mensuales" subtitulo="Ingresos por inscripciones, 2026 (USD)" className="xl:col-span-2">
          <LineChart etiquetas={MESES} series={[{ nombre: "Ventas", datos: VENTAS_MENSUALES }]} formato={moneda} />
        </Tarjeta>
        <Tarjeta titulo="Cursos por estado" subtitulo="Distribución actual">
          <PieChart datos={est.porEstado} etiquetaTotal="cursos" />
        </Tarjeta>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Tarjeta titulo="Cursos con más inscritos" subtitulo="Los cinco más demandados">
          <BarChart horizontal limite={5} datos={est.inscritosPorCurso} formato={entero} />
        </Tarjeta>

        <Tarjeta titulo="Cursos recientes" subtitulo="Ordenados por fecha de inicio" acciones={<button onClick={() => irA("cursos")} className="text-sm font-bold text-unievents-teal hover:underline cursor-pointer">Ver todos</button>}>
          <ul className="divide-y divide-gray-100">
            {recientes.map((c) => (
              <li key={c.id} className="flex items-center justify-between gap-4 py-3.5">
                <div className="min-w-0">
                  <p className="font-bold text-unievents-dark truncate">{c.titulo}</p>
                  <p className="text-xs font-medium text-gray-400">{c.docente.nombre} - inicia {fechaCorta(c.inicio)}</p>
                </div>
                <Etiqueta tono={c.estado}>{ESTADOS[c.estado]}</Etiqueta>
              </li>
            ))}
          </ul>
        </Tarjeta>
      </div>
    </div>
  );
}
