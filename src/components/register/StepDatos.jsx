import InputEmail from "../input/types/InputEmail";
import InputPassword from "../input/types/InputPassword";
import Ico from "./Ico";
import RequisitosClave from "./RequisitosClave";

// Paso 1: credenciales (correo, claveUno, claveDos). Reglas iguales a las del back.
export default function StepDatos({ formData, updateFormData, errors = {} }) {
  const cambiar = (e) => updateFormData({ [e.target.name]: e.target.value.trim() });

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="text-xl font-bold text-unievents-dark">Datos de acceso</h3>
        <p className="text-sm text-gray-500">Credenciales para iniciar sesión en el sistema.</p>
      </div>

      <InputEmail
        name="correo"
        value={formData.correo}
        onChange={cambiar}
        icono={<Ico nombre="correo" />}
        error={errors.correo}
        autoComplete="email"
      />

      <div className="flex flex-col gap-3">
        <InputPassword
          name="claveUno"
          value={formData.claveUno}
          onChange={cambiar}
          icono={<Ico nombre="clave" />}
          error={errors.claveUno}
          maxLength={16}
          autoComplete="new-password"
        />
        <RequisitosClave clave={formData.claveUno} />
      </div>

      <InputPassword
        name="claveDos"
        label="Confirmar contraseña"
        value={formData.claveDos}
        onChange={cambiar}
        icono={<Ico nombre="clave" />}
        error={errors.claveDos}
        maxLength={16}
        autoComplete="new-password"
      />
    </div>
  );
}
