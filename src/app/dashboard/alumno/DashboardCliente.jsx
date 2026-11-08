"use client";

import { useRouter } from "next/navigation";
import Dashboard from "@/components/student/Dashboard/Dashboard";

export default function DashboardCliente() {
  const router = useRouter();

  async function cerrarSesion() {
    await fetch("/api/login"); // GET = logout: borra la cookie
    router.push("/login");
  }

  return <Dashboard onLogout={cerrarSesion} />;
}
