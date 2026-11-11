import exigirSesion from "@/services/usuarios/exigirSesion";

export const dynamic = "force-dynamic";

// ponytail: página mínima; el login ya redirige aquí según el rol.
export default async function DashboardAdministradorView() {
  await exigirSesion([2]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Bienvenido, Administrador</h1>
      <p className="text-lg text-gray-600">Esta sección está en construcción.</p>
    </div>
  );
}
