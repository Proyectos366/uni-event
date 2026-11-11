import exigirSesion from "@/services/usuarios/exigirSesion";
import DashboardCliente from "@/components/dashboard/alumno/DashboardCliente";

export const dynamic = "force-dynamic";

export default async function DashboardAlumnoView() {
  await exigirSesion([4]);
  return <DashboardCliente />;
}
