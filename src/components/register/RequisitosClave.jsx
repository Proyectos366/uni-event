import Ico from "./Ico";
import { requisitosClave } from "./validaciones";

// Lista en vivo de lo que exige el back para la contraseña.
export default function RequisitosClave({ clave }) {
  return (
    <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs">
      {requisitosClave.map((r) => {
        const ok = r.ok(clave);
        return (
          <li key={r.texto} className={`flex items-center gap-1.5 transition-colors ${ok ? "text-emerald-600" : "text-gray-400"}`}>
            <span className={`grid place-items-center w-4 h-4 rounded-full ${ok ? "bg-emerald-100" : "bg-gray-100"}`}>
              <Ico nombre="check" className="w-2.5 h-2.5" />
            </span>
            {r.texto}
          </li>
        );
      })}
    </ul>
  );
}
