"use client";

import { useRouter } from "next/navigation";
import Dashboard from "@/components/student/Dashboard/Dashboard";

export default function DashboardCliente({ perfil }) {
  const router = useRouter();

  async function cerrarSesion() {
    await fetch("/api/login/cerrar-sesion"); // GET = logout: borra la cookie
    router.push("/login");
  }

  return <Dashboard onLogout={cerrarSesion} perfil={perfil} />;
}
  