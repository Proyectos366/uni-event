"use client";

import { useEffect } from "react";
import Ico from "@/components/register/Ico";

// Ventana modal con cabecera en degradado (mismo lenguaje visual que las portadas).
export default function Modal({ titulo, subtitulo, onCerrar, children, pie, ancho = "max-w-2xl" }) {
  useEffect(() => {
    const alTeclear = (e) => e.key === "Escape" && onCerrar();
    document.addEventListener("keydown", alTeclear);
    return () => document.removeEventListener("keydown", alTeclear);
  }, [onCerrar]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200" onMouseDown={(e) => e.target === e.currentTarget && onCerrar()}>
      <div role="dialog" aria-modal="true" aria-label={titulo} className={`w-full ${ancho} max-h-[calc(100dvh-2rem)] flex flex-col rounded-3xl bg-white shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200`}>
        <header className="relative shrink-0 overflow-hidden bg-gradient-to-br from-unievents-dark via-teal-800 to-unievents-teal px-6 py-4 sm:py-5 text-white">
          <div className="pointer-events-none absolute -top-10 -right-8 w-40 h-40 rounded-full bg-unievents-gold/20 blur-3xl" />
          <div className="relative flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-black tracking-tight">{titulo}</h3>
              {subtitulo && <p className="text-sm text-teal-50/90">{subtitulo}</p>}
            </div>
            <button type="button" onClick={onCerrar} aria-label="Cerrar" className="grid place-items-center w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 transition cursor-pointer">
              <Ico nombre="x" className="w-5 h-5" />
            </button>
          </div>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto p-6">{children}</div>

        {pie && <footer className="shrink-0 border-t border-gray-100 bg-gray-50/70 px-6 py-4 flex flex-wrap items-center justify-end gap-3">{pie}</footer>}
      </div>
    </div>
  );
}
