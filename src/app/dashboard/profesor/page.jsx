import exigirSesion from "@/services/usuarios/exigirSesion";
import DescripcionProfesor from "@/components/dashboard/profesor/DescripcionProfesor";

export const dynamic = "force-dynamic";

export default async function DashboardProfesorView() {
  await exigirSesion([3]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">
        Bienvenido al Dashboard del Profesor
      </h1>

      <DescripcionProfesor />
    </div>
  );
}
