import exigirSesion from "@/services/usuarios/exigirSesion";
import obtenerPerfil from "@/services/usuarios/obtenerPerfil";
import DashboardCliente from "@/components/dashboard/master/DashboardCliente";

export const dynamic = "force-dynamic";

// Solo el rol master (1). Gestión de usuarios, cursos, estudiantes y estadísticas.
export default async function DashboardMasterView() {
  await exigirSesion([1]);
  return <DashboardCliente perfil={await obtenerPerfil()} />;
}
