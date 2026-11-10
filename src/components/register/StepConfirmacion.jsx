import { armarTelefono } from "./validaciones";

// Paso 3: resumen. El rol no se elige aquí: el back asigna alumno (4) por defecto.
export default function StepConfirmacion({ formData, error }) {
  const filas = [
    ["Correo", formData.correo],
    ["Cédula", `${formData.nacionalidad === "1" ? "V" : "E"}-${formData.cedula}`],
    ["Nombre", [formData.nombre, formData.nombreDos, formData.apellido, formData.apellidoDos].filter(Boolean).join(" ")],
    ["Género", formData.genero === "1" ? "Hombre" : "Mujer"],
    ["Nacimiento", formData.f_n],
    ["Teléfono", armarTelefono(formData.prefijo, formData.telefono)],
  ];

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="text-xl font-bold text-unievents-dark">Confirma tus datos</h3>
        <p className="text-sm text-gray-500">Revisa que todo esté correcto antes de crear tu cuenta.</p>
      </div>

      <dl className="rounded-2xl border border-gray-100 bg-gray-50/60 divide-y divide-gray-100 text-sm">
        {filas.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4 px-4 py-3">
            <dt className="font-semibold text-gray-500">{k}</dt>
            <dd className="font-semibold text-unievents-dark text-right break-all">{v || "—"}</dd>
          </div>
        ))}
      </dl>

      {error && (
        <p role="alert" className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
