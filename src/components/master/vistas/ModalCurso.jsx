"use client";

import { useState } from "react";
import Modal from "../ui/Modal";
import Input from "@/components/input/Input";
import Ico from "@/components/register/Ico";
import Button from "@/components/botones/Button";
import { CATEGORIAS, MODALIDADES } from "../datos/datosEjemplo";

const FORMATOS = ["image/jpeg", "image/png", "image/webp"];
const MAX_MB = 5;
const VACIO = { imagen: "", titulo: "", categoria: "", docenteId: "", descripcion: "", inicio: "", horario: "", modalidad: "Presencial", cupos: "", precio: "0" };
const select = "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-unievents-dark outline-none focus:border-unievents-teal focus:ring-4 focus:ring-teal-100 transition-all";

// Reduce la imagen elegida a un JPEG de máx. 900 px de ancho para no cargar el estado con archivos pesados.
function reducirImagen(archivo) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(archivo);
    const img = new Image();
    img.onload = () => {
      const escala = Math.min(1, 900 / img.width);
      const lienzo = document.createElement("canvas");
      lienzo.width = Math.round(img.width * escala);
      lienzo.height = Math.round(img.height * escala);
      lienzo.getContext("2d").drawImage(img, 0, 0, lienzo.width, lienzo.height);
      URL.revokeObjectURL(url);
      resolve(lienzo.toDataURL("image/jpeg", 0.82));
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("imagen inválida")); };
    img.src = url;
  });
}

function Campo({ label, error, children }) {
  return (
    <label className="flex flex-col gap-1 text-sm font-semibold text-unievents-teal">
      {label}
      {children}
      {error && <span className="text-xs font-normal text-red-500">{error}</span>}
    </label>
  );
}

// Formulario para crear un curso y asignarle un docente.
export default function ModalCurso({ docentes, onCrear, onCerrar }) {
  const [f, setF] = useState(VACIO);
  const [errores, setErrores] = useState({});
  const cambiar = (e) => {
    setF((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrores((p) => ({ ...p, [e.target.name]: undefined }));
  };

  async function elegirImagen(e) {
    const archivo = e.target.files?.[0];
    e.target.value = ""; // permite volver a elegir el mismo archivo
    if (!archivo) return;
    if (!FORMATOS.includes(archivo.type)) return setErrores((p) => ({ ...p, imagen: "Usa una imagen JPG, PNG o WEBP" }));
    if (archivo.size > MAX_MB * 1024 * 1024) return setErrores((p) => ({ ...p, imagen: `La imagen supera ${MAX_MB} MB` }));
    try {
      const imagen = await reducirImagen(archivo);
      setF((p) => ({ ...p, imagen }));
      setErrores((p) => ({ ...p, imagen: undefined }));
    } catch {
      setErrores((p) => ({ ...p, imagen: "No se pudo leer la imagen" }));
    }
  }

  function enviar(e) {
    e.preventDefault();
    const er = {};
    if (f.titulo.trim().length < 5) er.titulo = "Mínimo 5 caracteres";
    if (!f.categoria) er.categoria = "Selecciona una categoría";
    if (!f.docenteId) er.docenteId = "Asigna un docente";
    if (!f.inicio) er.inicio = "Indica la fecha de inicio";
    if (!f.horario.trim()) er.horario = "Indica el horario";
    if (!(Number(f.cupos) >= 1)) er.cupos = "Al menos 1 cupo";
    if (!(Number(f.precio) >= 0) || f.precio === "") er.precio = "Precio inválido";
    setErrores(er);
    if (Object.keys(er).length) return;

    const hoy = new Date().toISOString().slice(0, 10);
    onCrear({
      imagen: f.imagen,
      titulo: f.titulo.trim(),
      categoria: f.categoria,
      descripcion: f.descripcion.trim(),
      docente: docentes.find((d) => d.id === f.docenteId),
      estado: f.inicio > hoy ? "pendiente" : "activo",
      inicio: f.inicio,
      horario: f.horario.trim(),
      modalidad: f.modalidad,
      cupos: Number(f.cupos),
      inscritos: 0,
      precio: Number(f.precio),
      asistencia: 0,
    });
  }

  return (
    <Modal
      titulo="Nuevo curso"
      subtitulo="Completa los datos y asigna un docente responsable."
      onCerrar={onCerrar}
      pie={
        <>
          <Button variant="back" onClick={onCerrar}>Cancelar</Button>
          <Button type="submit" onClick={enviar} className="shadow-lg shadow-teal-200">Crear curso</Button>
        </>
      }
    >
      <form onSubmit={enviar} noValidate className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="sm:col-span-2">
          <p className="mb-1 text-sm font-semibold text-unievents-teal">Imagen del curso</p>
          {f.imagen ? (
            <div className="relative overflow-hidden rounded-2xl border border-gray-200">
              <img src={f.imagen} alt="Vista previa del curso" className="h-48 w-full object-cover" />
              <button
                type="button"
                onClick={() => setF((p) => ({ ...p, imagen: "" }))}
                className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-red-500 shadow-md hover:bg-red-50 transition cursor-pointer"
              >
                <Ico nombre="x" className="w-4 h-4" /> Quitar
              </button>
            </div>
          ) : (
            <label className="flex h-40 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-teal-200 bg-teal-50/40 text-center transition hover:border-unievents-teal hover:bg-teal-50">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-teal-400 to-unievents-dark text-white shadow-md">
                <Ico nombre="descargar" className="w-6 h-6 rotate-180" />
              </span>
              <span className="text-sm font-bold text-unievents-dark">Haz clic para subir una imagen</span>
              <span className="text-xs font-medium text-gray-400">JPG, PNG o WEBP, hasta 5 MB (opcional)</span>
              <input type="file" accept="image/jpeg,image/png,image/webp" onChange={elegirImagen} className="sr-only" />
            </label>
          )}
          {errores.imagen && <span className="mt-1 block text-xs text-red-500">{errores.imagen}</span>}
        </div>

        <div className="sm:col-span-2">
          <Input label="Nombre del curso" name="titulo" value={f.titulo} onChange={cambiar} icono={<Ico nombre="curso" />} error={errores.titulo} placeholder="Ej: Introducción a Python" />
        </div>

        <Campo label="Categoría" error={errores.categoria}>
          <select name="categoria" value={f.categoria} onChange={cambiar} className={select}>
            <option value="">Seleccionar</option>
            {CATEGORIAS.map((c) => <option key={c}>{c}</option>)}
          </select>
        </Campo>

        <Campo label="Docente asignado" error={errores.docenteId}>
          <select name="docenteId" value={f.docenteId} onChange={cambiar} className={select}>
            <option value="">Seleccionar</option>
            {docentes.map((d) => <option key={d.id} value={d.id}>{d.nombre}</option>)}
          </select>
        </Campo>

        <Input label="Fecha de inicio" name="inicio" type="date" value={f.inicio} onChange={cambiar} icono={<Ico nombre="fecha" />} error={errores.inicio} />
        <Input label="Horario" name="horario" value={f.horario} onChange={cambiar} icono={<Ico nombre="reloj" />} error={errores.horario} placeholder="09:00 - 13:00" />

        <Campo label="Modalidad">
          <select name="modalidad" value={f.modalidad} onChange={cambiar} className={select}>
            {MODALIDADES.map((m) => <option key={m}>{m}</option>)}
          </select>
        </Campo>
        <Input label="Cupos" name="cupos" type="number" min="1" value={f.cupos} onChange={cambiar} icono={<Ico nombre="usuarios" />} error={errores.cupos} placeholder="30" />

        <div className="sm:col-span-2">
          <Input label="Precio (USD)" name="precio" type="number" min="0" step="0.01" value={f.precio} onChange={cambiar} icono={<Ico nombre="dinero" />} error={errores.precio} ayuda="Usa 0 para un curso gratuito" />
        </div>

        <div className="sm:col-span-2">
          <Campo label="Descripción">
            <textarea name="descripcion" value={f.descripcion} onChange={cambiar} rows={3} className={`${select} resize-none`} placeholder="De qué trata el curso" />
          </Campo>
        </div>
      </form>
    </Modal>
  );
}
