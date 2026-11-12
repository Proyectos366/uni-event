"use client";

import { useState } from "react";
import Input from "@/components/input/Input";
import InputPassword from "@/components/input/types/InputPassword";
import Button from "@/components/botones/Button";
import Ico from "@/components/register/Ico";
import RequisitosClave from "@/components/register/RequisitosClave";
import { claveRegex } from "@/utils/regex/claveRegex";
import { textRegex } from "@/utils/regex/textRegex";
import { nombreCompleto } from "@/utils/capitalizar";
import { soloLetras } from "@/components/register/validaciones";

const BLOQUEADO = "bg-gray-100/80 border-gray-200 text-gray-400 cursor-not-allowed select-none";

// Mensaje de éxito (mismo estilo que el perfil del estudiante).
function Exito({ children }) {
  return (
    <div role="status" className="flex items-center gap-2.5 rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800 animate-in fade-in slide-in-from-top-3 duration-300">
      <Ico nombre="check" className="w-5 h-5 text-emerald-600 shrink-0" />
      {children}
    </div>
  );
}

function Panel({ titulo, subtitulo, children }) {
  return (
    <section className="flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-lg">
      <header className="border-b border-gray-100 bg-gradient-to-r from-teal-50 to-white p-5">
        <h4 className="text-lg font-black text-unievents-dark">{titulo}</h4>
        {subtitulo && <p className="text-sm font-medium text-gray-500">{subtitulo}</p>}
      </header>
      {children}
    </section>
  );
}

// Perfil del master. Nombre, cédula y correo vienen de la sesión (datos reales).
// El guardado y el cambio de contraseña son una simulación: el back aún no tiene endpoints de perfil.
export default function Perfil({ perfil }) {
  const [datos, setDatos] = useState({ nombre: perfil.nombre, nombreDos: perfil.nombreDos, apellido: perfil.apellido, apellidoDos: perfil.apellidoDos, telefono: perfil.telefono });
  const [nombreMostrado, setNombreMostrado] = useState(nombreCompleto(perfil));
  const [errDatos, setErrDatos] = useState({});
  const [okDatos, setOkDatos] = useState(false);

  const [claves, setClaves] = useState({ actual: "", nueva: "", confirmar: "" });
  const [errClave, setErrClave] = useState({});
  const [okClave, setOkClave] = useState(false);

  const cambiarDatos = (e) => {
    const { name, value } = e.target;
    setDatos((p) => ({ ...p, [name]: name === "telefono" ? value : soloLetras(value) }));
    setErrDatos((p) => ({ ...p, [name]: undefined }));
  };
  const cambiarClave = (e) => {
    setClaves((p) => ({ ...p, [e.target.name]: e.target.value.trim() }));
    setErrClave((p) => ({ ...p, [e.target.name]: undefined }));
  };

  function guardarDatos(e) {
    e.preventDefault();
    const er = {};
    if (!datos.nombre.trim()) er.nombre = "Ingresa tu nombre";
    else if (!textRegex.test(datos.nombre.trim())) er.nombre = "Solo letras";
    if (!datos.apellido.trim()) er.apellido = "Ingresa tu apellido";
    else if (!textRegex.test(datos.apellido.trim())) er.apellido = "Solo letras";
    for (const c of ["nombreDos", "apellidoDos"]) if (datos[c].trim() && !textRegex.test(datos[c].trim())) er[c] = "Solo letras";
    if (datos.telefono && !/^\+?[0-9\s-]{7,16}$/.test(datos.telefono)) er.telefono = "Teléfono inválido";
    setErrDatos(er);
    if (Object.keys(er).length) return;

    setNombreMostrado(nombreCompleto(Object.fromEntries(Object.entries(datos).map(([k, v]) => [k, v.trim()])))); // ponytail: solo local; falta endpoint de actualización de perfil
    setOkDatos(true);
    setTimeout(() => setOkDatos(false), 4000);
  }

  function guardarClave(e) {
    e.preventDefault();
    const er = {};
    if (!claves.actual) er.actual = "Ingresa tu contraseña actual";
    if (!claveRegex.test(claves.nueva)) er.nueva = "La contraseña no cumple los requisitos";
    else if (claves.nueva === claves.actual) er.nueva = "Debe ser distinta a la actual";
    if (claves.confirmar !== claves.nueva) er.confirmar = "Las contraseñas no coinciden";
    setErrClave(er);
    if (Object.keys(er).length) return;

    setClaves({ actual: "", nueva: "", confirmar: "" });
    setOkClave(true);
    setTimeout(() => setOkClave(false), 4000);
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Portada del perfil */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-unievents-dark via-teal-800 to-unievents-teal px-6 sm:px-8 py-8 text-white shadow-xl">
        <div className="pointer-events-none absolute -top-16 -right-12 w-56 h-56 rounded-full bg-unievents-gold/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-8 w-48 h-48 rounded-full bg-teal-300/20 blur-3xl" />
        <div className="relative flex flex-col items-center gap-6 sm:flex-row">
          <span className="grid h-28 w-28 shrink-0 place-items-center rounded-full border-4 border-white bg-gradient-to-br from-unievents-gold to-orange-500 text-5xl font-black text-white shadow-lg select-none">
            {nombreMostrado[0]?.toUpperCase()}
          </span>
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">{nombreMostrado}</h3>
            <p className="text-sm font-semibold text-teal-50/90">{perfil.correo}</p>
            <div className="flex flex-wrap justify-center gap-2.5 pt-1 sm:justify-start">
              <span className="rounded-lg border border-slate-700/30 bg-slate-800/80 px-3 py-1 text-[10px] font-black uppercase tracking-wider">Cédula {perfil.nacionalidad ? "V" : "E"}-{perfil.cedula}</span>
              <span className="rounded-lg bg-unievents-gold px-3 py-1 text-[10px] font-black uppercase tracking-wider text-unievents-dark">Master</span>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 items-start gap-8 xl:grid-cols-2">
        <Panel titulo="Información personal" subtitulo="Tus datos de acceso son de solo lectura.">
          <form onSubmit={guardarDatos} noValidate className="flex flex-1 flex-col justify-between">
            <div className="space-y-5 p-6">
              {okDatos && <Exito>Datos actualizados correctamente.</Exito>}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input label="Primer nombre" name="nombre" value={datos.nombre} onChange={cambiarDatos} icono={<Ico nombre="usuario" />} error={errDatos.nombre} />
                <Input label="Segundo nombre" name="nombreDos" value={datos.nombreDos} onChange={cambiarDatos} icono={<Ico nombre="usuario" />} error={errDatos.nombreDos} ayuda="Opcional" />
                <Input label="Primer apellido" name="apellido" value={datos.apellido} onChange={cambiarDatos} icono={<Ico nombre="usuario" />} error={errDatos.apellido} />
                <Input label="Segundo apellido" name="apellidoDos" value={datos.apellidoDos} onChange={cambiarDatos} icono={<Ico nombre="usuario" />} error={errDatos.apellidoDos} ayuda="Opcional" />
              </div>
              <Input label="Correo electrónico" name="correo" value={perfil.correo} readOnly disabled icono={<Ico nombre="correo" />} className={BLOQUEADO} />
              <Input label="Cédula" name="cedula" value={`${perfil.nacionalidad ? "V" : "E"}-${perfil.cedula}`} readOnly disabled icono={<Ico nombre="cedula" />} className={BLOQUEADO} />
              <Input label="Teléfono" name="telefono" type="tel" value={datos.telefono} onChange={cambiarDatos} icono={<Ico nombre="telefono" />} error={errDatos.telefono} placeholder="+584121234567" ayuda="Opcional" />
            </div>
            <div className="space-y-2 p-6 pt-0">
              <Button type="submit" className="shadow-md shadow-teal-200">Guardar cambios</Button>
              <p className="text-xs font-medium text-gray-400">Aún no se guarda en el servidor: la actualización de perfil está pendiente en el back.</p>
            </div>
          </form>
        </Panel>

        <Panel titulo="Cambiar contraseña" subtitulo="Usa una contraseña segura que no uses en otros sitios.">
          <form onSubmit={guardarClave} noValidate className="flex flex-1 flex-col justify-between">
            <div className="space-y-5 p-6">
              {okClave && <Exito>Contraseña actualizada correctamente.</Exito>}
              <InputPassword label="Contraseña actual" name="actual" value={claves.actual} onChange={cambiarClave} icono={<Ico nombre="clave" />} error={errClave.actual} placeholder="Ingresa tu contraseña actual" autoComplete="current-password" />
              <div className="space-y-3">
                <InputPassword label="Nueva contraseña" name="nueva" value={claves.nueva} onChange={cambiarClave} icono={<Ico nombre="clave" />} error={errClave.nueva} placeholder="Ingresa tu nueva contraseña" maxLength={16} autoComplete="new-password" />
                <RequisitosClave clave={claves.nueva} />
              </div>
              <InputPassword label="Confirmar contraseña" name="confirmar" value={claves.confirmar} onChange={cambiarClave} icono={<Ico nombre="clave" />} error={errClave.confirmar} placeholder="Confirma tu nueva contraseña" maxLength={16} autoComplete="new-password" />
            </div>
            <div className="space-y-2 p-6 pt-0">
              <Button type="submit" className="shadow-md shadow-teal-200">Actualizar contraseña</Button>
              <p className="text-xs font-medium text-gray-400">Aún no se guarda en el servidor: el cambio de contraseña está pendiente en el back.</p>
            </div>
          </form>
        </Panel>
      </div>
    </div>
  );
}
