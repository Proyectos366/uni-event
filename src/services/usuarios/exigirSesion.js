import { redirect } from "next/navigation";
import obtenerCorreoToken from "@/services/usuarios/obtenerCorreoToken";

// Guard para páginas de dashboard. obtenerCorreoToken devuelve status "ok" con token:false
// cuando no hay cookie, así que hay que comprobar ambos casos.
// `roles`: ids de rol permitidos (1 master, 2 administrador, 3 profesor, 4 alumno).
export default async function exigirSesion(roles) {
  const sesion = await obtenerCorreoToken();
  if (sesion.status === "error" || sesion.token === false) redirect("/login");
  if (!roles.includes(Number(sesion.id_rol))) redirect("/login");
  return sesion;
}
