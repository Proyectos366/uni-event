"use client";

import DescripcionProfesor from "@/components/dashboard/profesor/DescripcionProfesor";

export default function DashboardProfesorView() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">
        Bienvenido al Dashboard del Profesor
      </h1>

      <DescripcionProfesor />
    </div>
  );
}
