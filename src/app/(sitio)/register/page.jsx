"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/botones/Button";
import ImagoTipo from "@/components/login/ImagoTipo";
import PanelMarca from "@/components/login/PanelMarca";
import StepIndicator from "@/components/register/StepIndicator";
import StepDatos from "@/components/register/StepDatos";
import StepPerfil from "@/components/register/StepPerfil";
import StepConfirmacion from "@/components/register/StepConfirmacion";
import { armarTelefono, validarPaso } from "@/components/register/validaciones";

const VACIO = {
  correo: "", claveUno: "", claveDos: "",
  cedula: "", nombre: "", nombreDos: "", apellido: "", apellidoDos: "",
  genero: "", nacionalidad: "1", f_n: "", prefijo: "+58", telefono: "",
};
const PASOS = [StepDatos, StepPerfil, StepConfirmacion];

export default function RegisterPage() {
  const router = useRouter();
  const [paso, setPaso] = useState(0);
  const [formData, setFormData] = useState(VACIO);
  const [error, setError] = useState("");
  const [errores, setErrores] = useState({}); // errores por campo del paso actual
  const [cargando, setCargando] = useState(false);

  const updateFormData = (nuevo) => {
    setFormData((prev) => ({ ...prev, ...nuevo }));
    // al editar un campo se limpia su error
    setErrores((prev) => Object.fromEntries(Object.entries(prev).filter(([k]) => !(k in nuevo))));
  };
  const Paso = PASOS[paso];
  const ultimo = paso === PASOS.length - 1;

  async function enviar(e) {
    e.preventDefault();
    const nuevos = validarPaso(paso, formData);
    setErrores(nuevos);
    if (Object.keys(nuevos).length) return;
    if (!ultimo) return setPaso(paso + 1);

    setError("");
    setCargando(true);
    try {
      // Contrato del back (vCamposCrearUsuario): mismos nombres de campo; teléfono en E.164.
      const { prefijo, ...resto } = formData;
      const res = await fetch("/api/usuarios/crear-usuario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...resto, telefono: armarTelefono(prefijo, formData.telefono) }),
      });
      const json = await res.json();
      if (json.status !== "ok") return setError(json.message);
      router.push("/login");
    } catch {
      setError("No se pudo completar el registro");
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="grid lg:grid-cols-2 min-h-[calc(100vh-55px)]">
      <PanelMarca
        titulo="Únete a la comunidad UniEvent"
        texto="Crea tu cuenta y empieza a inscribirte en cursos y eventos académicos."
        puntos={["Registro rápido en 3 pasos", "Cursos y eventos de tu universidad", "Certificados digitales al finalizar"]}
      />

      <main className="flex items-center justify-center px-6 py-12 bg-unievents-bg">
        <form onSubmit={enviar} noValidate className="w-full max-w-md bg-white rounded-3xl border border-gray-100 shadow-xl p-8 sm:p-10">
          <ImagoTipo />
          <div className="text-center mb-2">
            <h1 className="text-3xl font-black text-unievents-dark">Crear cuenta</h1>
            <p className="text-gray-500 mt-1">Paso {paso + 1} de {PASOS.length}</p>
          </div>

          <StepIndicator currentStep={paso + 1} totalSteps={PASOS.length} />

          <div className="mb-8">
            <Paso formData={formData} updateFormData={updateFormData} errors={errores} error={error} />
          </div>

          <div className="flex gap-4">
            {paso > 0 && (
              <Button variant="back" onClick={() => { setErrores({}); setError(""); setPaso(paso - 1); }} className="flex-1">Atrás</Button>
            )}
            <Button type="submit" disabled={cargando} className="flex-[2] !py-3 shadow-lg shadow-teal-200">
              {ultimo ? (cargando ? "Registrando..." : "Finalizar registro") : "Siguiente"}
            </Button>
          </div>

          {paso === 0 && (
            <p className="text-center mt-6 text-sm text-gray-500">
              ¿Ya tienes cuenta?{" "}
              <Link href="/login" className="text-unievents-teal font-bold hover:underline">Inicia sesión</Link>
            </p>
          )}
        </form>
      </main>
    </div>
  );
}
