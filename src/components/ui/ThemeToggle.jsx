"use client";

import { useSyncExternalStore } from "react";
import Ico from "@/components/register/Ico";

// El tema vive en la clase `dark` de <html> (la pone el script de layout.js antes de pintar).
const suscribir = (aviso) => {
  const observador = new MutationObserver(aviso);
  observador.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observador.disconnect();
};
const esOscuro = () => document.documentElement.classList.contains("dark");

// Interruptor claro/oscuro. El tema claro es el predeterminado; la elección se guarda en localStorage.
export default function ThemeToggle({ className = "" }) {
  const oscuro = useSyncExternalStore(suscribir, esOscuro, () => false);

  function alternar() {
    const nuevo = !esOscuro();
    document.documentElement.classList.toggle("dark", nuevo);
    try {
      localStorage.setItem("tema", nuevo ? "oscuro" : "claro");
    } catch {
      // sin almacenamiento (modo privado): el tema solo dura la sesión de la página
    }
  }

  const etiqueta = oscuro ? "Cambiar a tema claro" : "Cambiar a tema oscuro";
  return (
    <button
      type="button"
      role="switch"
      aria-checked={oscuro}
      aria-label={etiqueta}
      title={etiqueta}
      onClick={alternar}
      className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gray-200 bg-white text-unievents-teal shadow-sm transition hover:bg-teal-50 hover:shadow-md cursor-pointer ${className}`}
    >
      <Ico nombre={oscuro ? "sol" : "luna"} className="w-5 h-5" />
    </button>
  );
}
