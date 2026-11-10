"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/botones/Button";
import InputEmail from "@/components/input/types/InputEmail";
import InputPassword from "@/components/input/types/InputPassword";
import ImagoTipo from "@/components/login/ImagoTipo";
import PanelMarca from "@/components/login/PanelMarca";

export default function LoginPage() {
  const router = useRouter();
  const [datos, setDatos] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const cambiar = (e) => setDatos({ ...datos, [e.target.name]: e.target.value });

  async function enviar(e) {
    e.preventDefault();
    setError("");
    setCargando(true);
    try {
      // Contrato del back: POST /api/login { correo, clave } -> { status, message, redirect }
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo: datos.email, clave: datos.password }),
      });
      const json = await res.json();
      if (json.status !== "ok") return setError(json.message);
      router.push(json.redirect);
    } catch {
      setError("No se pudo conectar con el servidor");
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="grid lg:grid-cols-2 min-h-[calc(100vh-55px)]">
      <PanelMarca
        titulo="Bienvenido de vuelta"
        texto="Accede a tus cursos, eventos y certificados desde un solo lugar."
        puntos={["Consulta tus actividades inscritas", "Revisa tus notas y avances", "Descarga tus certificados"]}
      />

      <main className="flex items-center justify-center px-6 py-16 bg-unievents-bg">
        <div className="w-full max-w-md bg-white rounded-3xl border border-gray-100 shadow-xl p-8 sm:p-10">
          <ImagoTipo />
          <h1 className="text-3xl font-black text-unievents-dark text-center">Ingresa a tu cuenta</h1>
          <p className="text-gray-500 text-center mt-2 mb-8">Usa tu correo y contraseña</p>

          <form onSubmit={enviar} className="space-y-5">
            <InputEmail value={datos.email} onChange={cambiar} required />
            <InputPassword value={datos.password} onChange={cambiar} required />

            {error && (
              <p role="alert" className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">{error}</p>
            )}

            <Button type="submit" disabled={cargando} className="w-full !py-3.5 shadow-lg shadow-teal-200">
              {cargando ? "Ingresando..." : "Iniciar sesión"}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            ¿No tienes cuenta?{" "}
            <Link href="/register" className="text-unievents-teal font-bold hover:underline">Regístrate aquí</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
