"use client";

import { useState } from "react";
import Modal from "../ui/Modal";
import Button from "@/components/botones/Button";
import Segmentado from "@/components/register/Segmentado";
import StepDatos from "@/components/register/StepDatos";
import StepPerfil from "@/components/register/StepPerfil";
import { armarTelefono, validarPaso } from "@/components/register/validaciones";

// Roles que el master puede crear (ids del seed: 2 administrador, 3 profesor/docente, 4 alumno/estudiante).
export const ROLES_CREABLES = [
  { valor: "2", label: "Administrador" },
  { valor: "3", label: "Docente" },
  { valor: "4", label: "Estudiante" },
];

const VACIO = {
  correo: "", claveUno: "", claveDos: "",
  cedula: "", nombre: "", nombreDos: "", apellido: "", apellidoDos: "",
  genero: "", nacionalidad: "1", f_n: "", prefijo: "+58", telefono: "",
};

// Alta de usuarios: mismas reglas que el registro público (validaciones.js) + selección de rol.
// Envía POST /api/usuarios/crear-usuario con la sesión del master; el back exige rol 1 o 2.
export default function ModalUsuario({ onCreado, onCerrar }) {
  const [rol, setRol] = useState("3");
  const [formData, setFormData] = useState(VACIO);
  const [errores, setErrores] = useState({});
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const updateFormData = (nuevo) => {
    setFormData((p) => ({ ...p, ...nuevo }));
    setErrores((p) => Object.fromEntries(Object.entries(p).filter(([k]) => !(k in nuevo))));
  };

  async function enviar(e) {
    e.preventDefault();
    const er = { ...validarPaso(0, formData), ...validarPaso(1, formData) };
    setErrores(er);
    if (Object.keys(er).length) return setError("Revisa los campos marcados en rojo.");

    setError("");
    setCargando(true);
    try {
      const { prefijo, ...resto } = formData;
      const res = await fetch("/api/usuarios/crear-usuario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...resto, telefono: armarTelefono(prefijo, formData.telefono), rolId: Number(rol) }),
      });
      const json = await res.json();
      if (json.status !== "ok") return setError(json.message);
      onCreado(ROLES_CREABLES.find((r) => r.valor === rol).label);
    } catch {
      setError("No se pudo conectar con el servidor");
    } finally {
      setCargando(false);
    }
  }

  return (
    <Modal
      titulo="Crear usuario"
      subtitulo="Registra un administrador, un docente o un estudiante."
      onCerrar={onCerrar}
      ancho="max-w-3xl"
      pie={
        <>
          <Button variant="back" onClick={onCerrar}>Cancelar</Button>
          <Button type="submit" onClick={enviar} disabled={cargando} className="shadow-lg shadow-teal-200">
            {cargando ? "Creando..." : "Crear usuario"}
          </Button>
        </>
      }
    >
      <form onSubmit={enviar} noValidate className="space-y-8">
        <Segmentado label="Tipo de usuario" name="rol" value={rol} onChange={(e) => setRol(e.target.value)} opciones={ROLES_CREABLES} columnas={3} />
        <StepDatos formData={formData} updateFormData={updateFormData} errors={errores} />
        <StepPerfil formData={formData} updateFormData={updateFormData} errors={errores} />
        {error && <p role="alert" className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}
      </form>
    </Modal>
  );
}
