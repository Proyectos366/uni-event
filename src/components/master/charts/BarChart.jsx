import { useId } from "react";
import { COLORES } from "../datos/estadisticas";

function maximoBonito(v) {
  if (v <= 0) return 1;
  const p = 10 ** Math.floor(Math.log10(v));
  const n = v / p;
  const paso = [1, 1.2, 1.6, 2, 2.4, 3, 4, 5, 6, 8, 10].find((x) => x >= n) ?? 10;
  return paso * p;
}

// Gráfico de barras.
// - vertical (por defecto): SVG con eje Y, para pocas categorías con etiquetas cortas.
// - horizontal: barras HTML con la etiqueta encima, para nombres largos (cursos).
// datos: [{ etiqueta, valor, color? }]
export default function BarChart({ datos, formato = (v) => v, horizontal = false, alto = 260, limite }) {
  const uid = useId().replace(/:/g, "");
  const lista = limite ? datos.slice(0, limite) : datos;

  if (horizontal) {
    const max = Math.max(...lista.map((d) => d.valor), 1);
    return (
      <ul className="space-y-4">
        {lista.map((d, i) => (
          <li key={d.etiqueta}>
            <div className="flex items-baseline justify-between gap-3 text-sm">
              <span className="font-semibold text-unievents-dark truncate">{d.etiqueta}</span>
              <span className="font-black text-unievents-teal shrink-0">{formato(d.valor)}</span>
            </div>
            <div className="mt-1.5 h-2.5 rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${(d.valor / max) * 100}%`, background: d.color || `linear-gradient(90deg, ${COLORES[i % COLORES.length]}, #14b8a6)` }}
              />
            </div>
          </li>
        ))}
      </ul>
    );
  }

  const W = 560;
  const m = { l: 56, r: 16, t: 24, b: 34 };
  const iw = W - m.l - m.r;
  const ih = alto - m.t - m.b;
  const max = maximoBonito(Math.max(...lista.map((d) => d.valor), 1));
  const paso = iw / lista.length;
  const ancho = Math.min(56, paso * 0.58);
  const y = (v) => m.t + ih - (v / max) * ih;
  const ticks = [0, 1, 2, 3, 4].map((k) => (max * k) / 4);

  return (
    <svg viewBox={`0 0 ${W} ${alto}`} className="w-full h-auto" role="img" aria-label="Gráfico de barras">
      <defs>
        {lista.map((d, i) => (
          <linearGradient key={i} id={`${uid}-b${i}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={d.color || COLORES[i % COLORES.length]} />
            <stop offset="100%" stopColor={d.color || COLORES[i % COLORES.length]} stopOpacity="0.55" />
          </linearGradient>
        ))}
      </defs>

      {ticks.map((t) => (
        <g key={t}>
          <line x1={m.l} x2={W - m.r} y1={y(t)} y2={y(t)} style={{ stroke: "var(--chart-grid)" }} strokeDasharray="4 4" />
          <text x={m.l - 8} y={y(t) + 4} textAnchor="end" fontSize="13" style={{ fill: "var(--chart-text)" }}>{formato(t)}</text>
        </g>
      ))}

      {lista.map((d, i) => {
        const cx = m.l + paso * i + paso / 2;
        const h = (d.valor / max) * ih;
        return (
          <g key={d.etiqueta}>
            <rect x={cx - ancho / 2} y={y(d.valor)} width={ancho} height={Math.max(h, 0)} rx="8" fill={`url(#${uid}-b${i})`}>
              <title>{`${d.etiqueta}: ${formato(d.valor)}`}</title>
            </rect>
            <text x={cx} y={y(d.valor) - 6} textAnchor="middle" fontSize="13" fontWeight="700" style={{ fill: "var(--chart-strong)" }}>{formato(d.valor)}</text>
            <text x={cx} y={alto - 10} textAnchor="middle" fontSize="13" style={{ fill: "var(--chart-label)" }}>{d.etiqueta}</text>
          </g>
        );
      })}
    </svg>
  );
}
