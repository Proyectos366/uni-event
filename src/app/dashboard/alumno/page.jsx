import { redirect } from "next/navigation";
import obtenerCorreoToken from "@/services/usuarios/obtenerCorreoToken";
import DashboardCliente from "@/components/dashboard/alumno/DashboardCliente";

export const dynamic = "force-dynamic";

// Sin sesión válida (cookie JWT) se vuelve al login. Es la única protección: no hay middleware.
export default async function DashboardAlumnoView() {
  const sesion = await obtenerCorreoToken();
  if (sesion.status === "error") redirect("/login");
  return <DashboardCliente />;
}
