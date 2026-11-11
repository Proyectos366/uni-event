// Selector de 2 o más opciones tipo "pastilla" (reemplaza al <select> para valores cortos).
export default function Segmentado({ label, name, value, onChange, opciones, error }) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-unievents-teal mb-1">{label}</legend>
      <div className="grid grid-cols-2 gap-2">
        {opciones.map((o) => {
          const activo = value === o.valor;
          return (
            <label
              key={o.valor}
              className={`cursor-pointer text-center rounded-xl border px-3 py-3 text-sm font-semibold transition-all ${
                activo
                  ? "border-unievents-teal bg-teal-50 text-unievents-dark ring-4 ring-teal-100"
                  : "border-gray-200 bg-white text-gray-500 hover:border-teal-300"
              } ${error ? "border-red-400" : ""}`}
            >
              <input type="radio" name={name} value={o.valor} checked={activo} onChange={onChange} className="sr-only" />
              {o.label}
            </label>
          );
        })}
      </div>
      {error && <span className="block text-xs text-red-500 mt-1">{error}</span>}
    </fieldset>
  );
}
