import { COLORES } from "../datos/estadisticas";

const RO = 90; // radio exterior
const RI = 56; // radio interior (donut)

const punto = (r, ang) => [100 + r * Math.cos(ang), 100 + r * Math.sin(ang)];

function arco(a0, a1) {
  const [x0, y0] = punto(RO, a0);
  const [x1, y1] = punto(RO, a1);
  const [x2, y2] = punto(RI, a1);
  const [x3, y3] = punto(RI, a0);
  const grande = a1 - a0 > Math.PI ? 1 : 0;
  return `M${x0},${y0} A${RO},${RO} 0 ${grande} 1 ${x1},${y1} L${x2},${y2} A${RI},${RI} 0 ${grande} 0 ${x3},${y3} Z`;
}

// Gráfico circular (tipo dona) con total al centro y leyenda con porcentajes.
// datos: [{ etiqueta, valor, color? }]
export default function PieChart({ datos, formato = (v) => v, etiquetaTotal = "Total", lateral = false }) {
  const lista = datos.filter((d) => d.valor > 0);
  const total = lista.reduce((s, d) => s + d.valor, 0);
  let acumulado = -Math.PI / 2;

  return (
    <div className={`flex flex-col items-center gap-6 ${lateral ? "sm:flex-row" : ""}`}>
      <svg viewBox="0 0 200 200" className="w-44 h-44 shrink-0" role="img" aria-label="Gráfico circular">
        {total === 0 && <circle cx="100" cy="100" r={(RO + RI) / 2} fill="none" style={{ stroke: "var(--chart-grid)" }} strokeWidth={RO - RI} />}
        {lista.length === 1 && (
          <circle cx="100" cy="100" r={(RO + RI) / 2} fill="none" stroke={lista[0].color || COLORES[0]} strokeWidth={RO - RI}>
            <title>{`${lista[0].etiqueta}: ${formato(lista[0].valor)}`}</title>
          </circle>
        )}
        {lista.length > 1 &&
          lista.map((d, i) => {
            const a0 = acumulado;
            const a1 = a0 + (d.valor / total) * Math.PI * 2;
            acumulado = a1;
            return (
              <path key={d.etiqueta} d={arco(a0, a1)} fill={d.color || COLORES[i % COLORES.length]} style={{ stroke: "var(--chart-surface)" }} strokeWidth="2">
                <title>{`${d.etiqueta}: ${formato(d.valor)} (${Math.round((d.valor / total) * 100)}%)`}</title>
              </path>
            );
          })}
        <text x="100" y="98" textAnchor="middle" fontSize="22" fontWeight="800" style={{ fill: "var(--chart-strong)" }}>{formato(total)}</text>
        <text x="100" y="116" textAnchor="middle" fontSize="10" style={{ fill: "var(--chart-text)" }}>{etiquetaTotal}</text>
      </svg>

      <ul className="w-full space-y-2.5">
        {datos.map((d, i) => (
          <li key={d.etiqueta} className="flex items-center justify-between gap-3 text-sm">
            <span className="flex items-center gap-2 min-w-0">
              <span className="w-3 h-3 rounded-full shrink-0" style={{ background: d.color || COLORES[i % COLORES.length] }} />
              <span className="font-semibold text-unievents-dark truncate">{d.etiqueta}</span>
            </span>
            <span className="shrink-0 font-bold text-gray-500">
              {formato(d.valor)}
              <span className="ml-2 text-xs font-semibold text-gray-400">{total ? Math.round((d.valor / total) * 100) : 0}%</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
