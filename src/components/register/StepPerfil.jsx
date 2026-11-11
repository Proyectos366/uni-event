import Input from "../input/Input";
import Ico from "./Ico";
import Segmentado from "./Segmentado";
import { PREFIJOS, FECHA_MIN, fechaMax, soloLetras, soloNumeros } from "./validaciones";

// Paso 2: datos personales, con los nombres de campo y formatos que espera vCamposCrearUsuario.
export default function StepPerfil({ formData, updateFormData, errors = {} }) {
  const cambiar = (e) => updateFormData({ [e.target.name]: e.target.value });
  const letras = (e) => updateFormData({ [e.target.name]: soloLetras(e.target.value) });
  const numeros = (e) => updateFormData({ [e.target.name]: soloNumeros(e.target.value) });

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="text-xl font-bold text-unievents-dark">Información personal</h3>
        <p className="text-sm text-gray-500">Usa los datos de tu documento de identidad.</p>
      </div>

      {/* Cédula con nacionalidad integrada: V (1 = venezolano) o E (2 = extranjero), como espera el back */}
      <div className="flex flex-col gap-1">
        <label htmlFor="cedula" className="text-sm font-semibold text-unievents-teal mb-1">Cédula</label>
        <div className={`flex rounded-xl border bg-white transition-all focus-within:border-unievents-teal focus-within:ring-4 focus-within:ring-teal-100 ${errors.cedula ? "border-red-500 bg-red-50" : "border-gray-200"}`}>
          <select
            name="nacionalidad"
            value={formData.nacionalidad}
            onChange={cambiar}
            aria-label="Nacionalidad"
            className="rounded-l-xl border-r border-gray-200 bg-gray-50 pl-3 pr-2 py-3 font-bold text-unievents-dark outline-none cursor-pointer"
          >
            <option value="1">V-</option>
            <option value="2">E-</option>
          </select>
          <div className="relative flex-1">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"><Ico nombre="cedula" /></span>
            <input
              id="cedula"
              name="cedula"
              value={formData.cedula}
              onChange={numeros}
              placeholder="12345678"
              inputMode="numeric"
              maxLength={8}
              className="w-full rounded-r-xl bg-transparent pl-11 pr-4 py-3 text-unievents-dark placeholder:text-gray-400 outline-none"
            />
          </div>
        </div>
        {errors.cedula ? (
          <span className="text-xs text-red-500 mt-1">{errors.cedula}</span>
        ) : (
          <span className="text-xs text-gray-400 mt-1">Solo números, 7 u 8 dígitos</span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Primer nombre" name="nombre" value={formData.nombre} onChange={letras} icono={<Ico nombre="usuario" />} error={errors.nombre} autoComplete="given-name" />
        <Input label="Segundo nombre" name="nombreDos" value={formData.nombreDos} onChange={letras} icono={<Ico nombre="usuario" />} error={errors.nombreDos} ayuda="Opcional" />
        <Input label="Primer apellido" name="apellido" value={formData.apellido} onChange={letras} icono={<Ico nombre="usuario" />} error={errors.apellido} autoComplete="family-name" />
        <Input label="Segundo apellido" name="apellidoDos" value={formData.apellidoDos} onChange={letras} icono={<Ico nombre="usuario" />} error={errors.apellidoDos} ayuda="Opcional" />
      </div>

      <div>
        {/* El back convierte 1 -> true (hombre) y 2 -> false (mujer) */}
        <Segmentado
          label="Género"
          name="genero"
          value={formData.genero}
          onChange={cambiar}
          opciones={[{ valor: "1", label: "Hombre" }, { valor: "2", label: "Mujer" }]}
          error={errors.genero}
        />
      </div>

      <Input
        label="Fecha de nacimiento"
        name="f_n"
        type="date"
        value={formData.f_n}
        onChange={cambiar}
        min={FECHA_MIN}
        max={fechaMax()}
        icono={<Ico nombre="fecha" />}
        error={errors.f_n}
      />

      {/* Teléfono: prefijo + número; el back recibe el formato internacional (+58412...) */}
      <div className="flex flex-col gap-1">
        <label htmlFor="telefono" className="text-sm font-semibold text-unievents-teal mb-1">Teléfono</label>
        <div className="flex gap-2">
          <select
            name="prefijo"
            value={formData.prefijo}
            onChange={cambiar}
            aria-label="Código de país"
            className="rounded-xl border border-gray-200 bg-white px-3 py-3 text-unievents-dark outline-none focus:border-unievents-teal focus:ring-4 focus:ring-teal-100 transition-all"
          >
            {PREFIJOS.map((p) => (
              <option key={p.valor} value={p.valor}>{p.etiqueta}</option>
            ))}
          </select>
          <div className="relative flex-1">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"><Ico nombre="telefono" /></span>
            <input
              id="telefono"
              name="telefono"
              type="tel"
              inputMode="numeric"
              value={formData.telefono}
              onChange={numeros}
              placeholder="4121234567"
              maxLength={12}
              autoComplete="tel-national"
              className={`w-full rounded-xl border bg-white pl-11 pr-4 py-3 text-unievents-dark placeholder:text-gray-400 outline-none focus:border-unievents-teal focus:ring-4 focus:ring-teal-100 transition-all ${errors.telefono ? "border-red-500 bg-red-50" : "border-gray-200"}`}
            />
          </div>
        </div>
        {errors.telefono ? (
          <span className="text-xs text-red-500 mt-1">{errors.telefono}</span>
        ) : (
          <span className="text-xs text-gray-400 mt-1">Sin el 0 inicial. Ej: 4121234567</span>
        )}
      </div>
    </div>
  );
}
