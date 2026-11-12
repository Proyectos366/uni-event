import { useId } from "react";
import { COLORES } from "../datos/estadisticas";

// Eje Y "bonito": el menor múltiplo cómodo que contiene al máximo.
function maximoBonito(v) {
  if (v <= 0) return 1;
  const p = 10 ** Math.floor(Math.log10(v));
  const n = v / p;
  const paso = [1, 1.2, 1.6, 2, 2.4, 3, 4, 5, 6, 8, 10].find((x) => x >= n) ?? 10;
  return paso * p;
}

// Gráfico de líneas con área, cuadrícula y puntos con tooltip nativo (<title>).
// series: [{ nombre, datos: number[], color? }]
export default function LineChart({ etiquetas, series, formato = (v) => v, alto = 260 }) {
  const uid = useId().replace(/:/g, "");
  const W = 560;
  const m = { l: 56, r: 16, t: 14, b: 30 };
  const iw = W - m.l - m.r;
  const ih = alto - m.t - m.b;
  const max = maximoBonito(Math.max(...series.flatMap((s) => s.datos), 1));
  const x = (i) => m.l + (etiquetas.length === 1 ? iw / 2 : (iw * i) / (etiquetas.length - 1));
  const y = (v) => m.t + ih - (v / max) * ih;
  const ticks = [0, 1, 2, 3, 4].map((k) => (max * k) / 4);

  const trazo = (datos) =>
    datos
      .map((v, i) => {
        if (i === 0) return `M${x(0)},${y(v)}`;
        const cx = (x(i - 1) + x(i)) / 2;
        return `C${cx},${y(datos[i - 1])} ${cx},${y(v)} ${x(i)},${y(v)}`;
      })
      .join(" ");

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${alto}`} className="w-full h-auto" role="img" aria-label="Gráfico de líneas">
        <defs>
          {series.map((s, i) => (
            <linearGradient key={i} id={`${uid}-a${i}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={s.color || COLORES[i]} stopOpacity="0.28" />
              <stop offset="100%" stopColor={s.color || COLORES[i]} stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>

        {ticks.map((t) => (
          <g key={t}>
            <line x1={m.l} x2={W - m.r} y1={y(t)} y2={y(t)} style={{ stroke: "var(--chart-grid)" }} strokeDasharray="4 4" />
            <text x={m.l - 8} y={y(t) + 4} textAnchor="end" fontSize="13" style={{ fill: "var(--chart-text)" }}>{formato(t)}</text>
          </g>
        ))}

        {etiquetas.map((e, i) => (
          <text key={e} x={x(i)} y={alto - 8} textAnchor="middle" fontSize="13" style={{ fill: "var(--chart-text)" }}>{e}</text>
        ))}

        {series.map((s, si) => {
          const color = s.color || COLORES[si];
          return (
            <g key={s.nombre}>
              {si === 0 && (
                <path d={`${trazo(s.datos)} L${x(s.datos.length - 1)},${m.t + ih} L${x(0)},${m.t + ih} Z`} fill={`url(#${uid}-a0)`} />
              )}
              <path d={trazo(s.datos)} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
              {s.datos.map((v, i) => (
                <circle key={i} cx={x(i)} cy={y(v)} r="4.5" style={{ fill: "var(--chart-surface)" }} stroke={color} strokeWidth="2.5">
                  <title>{`${s.nombre} - ${etiquetas[i]}: ${formato(v)}`}</title>
                </circle>
              ))}
            </g>
          );
        })}
      </svg>

      {series.length > 1 && (
        <ul className="mt-2 flex flex-wrap gap-4 text-sm font-semibold text-gray-500">
          {series.map((s, i) => (
            <li key={s.nombre} className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ background: s.color || COLORES[i] }} />
              {s.nombre}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
