"use client";

import { useRouter } from "next/navigation";
import MasterDashboard from "@/components/master/Dashboard/MasterDashboard";

export default function DashboardCliente({ perfil }) {
  const router = useRouter();

  async function cerrarSesion() {
    await fetch("/api/login/cerrar-sesion"); // GET: borra la cookie
    router.push("/login");
  }

  return <MasterDashboard perfil={perfil} onLogout={cerrarSesion} />;
}
