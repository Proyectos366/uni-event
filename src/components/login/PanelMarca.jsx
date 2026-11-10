// Panel lateral de marca para login y registro (solo en pantallas grandes).
export default function PanelMarca({ titulo, texto, puntos }) {
  return (
    <aside className="hidden lg:flex relative overflow-hidden flex-col justify-center bg-gradient-to-br from-unievents-dark via-teal-800 to-unievents-teal text-white px-16 py-20">
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-unievents-gold/20 blur-3xl" />
      <div className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full bg-teal-300/20 blur-3xl" />
      <div className="relative max-w-md">
        <h2 className="text-4xl font-black leading-tight">{titulo}</h2>
        <p className="mt-4 text-lg text-teal-50/90 leading-relaxed">{texto}</p>
        <ul className="mt-10 space-y-4">
          {puntos.map((p) => (
            <li key={p} className="flex items-center gap-3">
              <span className="grid place-items-center w-8 h-8 rounded-full bg-unievents-gold text-unievents-dark shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="font-medium">{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
