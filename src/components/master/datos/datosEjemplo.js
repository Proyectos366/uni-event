// Datos de ejemplo del panel master. El back aún no tiene modelos de cursos, inscripciones ni ventas;
// cuando existan, estas constantes se reemplazan por llamadas a la API (misma forma de objetos).
// Todo es determinista (sin Math.random) para que el servidor y el navegador rendericen lo mismo.

export const CATEGORIAS = ["Tecnología", "Diseño", "Ciencia", "Educación", "Seguridad", "Negocios"];
export const MODALIDADES = ["Presencial", "Virtual", "Híbrido"];
export const ESTADOS = { activo: "Activo", pendiente: "Por iniciar", finalizado: "Finalizado" };

export const MESES = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov"];
export const VENTAS_MENSUALES = [820, 1150, 1480, 1320, 1760, 2100, 1890, 2340, 2680, 2510, 2950];
export const INSCRITOS_MENSUALES = [18, 26, 34, 30, 41, 49, 44, 55, 62, 58, 67];
export const ASISTENTES_MENSUALES = [15, 22, 30, 27, 36, 43, 39, 49, 55, 52, 60];

export const DOCENTES_EJEMPLO = [
  { id: "ej-1", nombre: "Alejandro Silva" },
  { id: "ej-2", nombre: "Christian Romero" },
  { id: "ej-3", nombre: "Andrea Paz" },
  { id: "ej-4", nombre: "Carlos Ruiz" },
  { id: "ej-5", nombre: "Marisol Díaz" },
];

const d = (i) => DOCENTES_EJEMPLO[i];

export const CURSOS_EJEMPLO = [
  { id: 1, titulo: "Programación Web Frontend", categoria: "Tecnología", docente: d(1), estado: "activo", inicio: "2026-09-08", horario: "18:00 - 21:00", modalidad: "Híbrido", cupos: 40, inscritos: 36, precio: 25, asistencia: 88, descripcion: "HTML, CSS, JavaScript y React desde las bases." },
  { id: 2, titulo: "Introducción al Diseño de Interfaces", categoria: "Diseño", docente: d(2), estado: "activo", inicio: "2026-09-15", horario: "14:00 - 17:00", modalidad: "Presencial", cupos: 30, inscritos: 24, precio: 15, asistencia: 91, descripcion: "Fundamentos de UX, color, tipografía y prototipado." },
  { id: 3, titulo: "Machine Learning con Python", categoria: "Ciencia", docente: d(3), estado: "activo", inicio: "2026-10-01", horario: "08:00 - 12:00", modalidad: "Virtual", cupos: 25, inscritos: 25, precio: 30, asistencia: 84, descripcion: "Modelos de regresión y clasificación paso a paso." },
  { id: 4, titulo: "Seminario de Investigación Académica", categoria: "Educación", docente: d(0), estado: "finalizado", inicio: "2026-05-12", horario: "09:00 - 13:00", modalidad: "Presencial", cupos: 50, inscritos: 42, precio: 0, asistencia: 79, descripcion: "Metodologías para el trabajo de grado." },
  { id: 5, titulo: "Ciberseguridad y Hacking Ético", categoria: "Seguridad", docente: d(3), estado: "activo", inicio: "2026-10-20", horario: "09:00 - 18:00", modalidad: "Virtual", cupos: 60, inscritos: 38, precio: 20, asistencia: 86, descripcion: "Vectores de ataque, defensa y auditoría." },
  { id: 6, titulo: "Emprendimiento y Modelos de Negocio", categoria: "Negocios", docente: d(4), estado: "pendiente", inicio: "2026-12-02", horario: "16:00 - 19:00", modalidad: "Híbrido", cupos: 35, inscritos: 12, precio: 18, asistencia: 0, descripcion: "De la idea al plan de negocio validado." },
  { id: 7, titulo: "Redacción Académica", categoria: "Educación", docente: d(0), estado: "finalizado", inicio: "2026-03-10", horario: "10:00 - 12:00", modalidad: "Virtual", cupos: 40, inscritos: 31, precio: 10, asistencia: 82, descripcion: "Escritura clara para tesis y artículos." },
  { id: 8, titulo: "UX Research Aplicado", categoria: "Diseño", docente: d(2), estado: "pendiente", inicio: "2026-11-30", horario: "10:00 - 14:00", modalidad: "Presencial", cupos: 28, inscritos: 9, precio: 22, asistencia: 0, descripcion: "Entrevistas y pruebas de usabilidad con usuarios reales." },
];

const NOMBRES = ["María", "José", "Luisa", "Carlos", "Andrea", "Pedro", "Daniela", "Luis", "Valentina", "Miguel", "Camila", "Jorge", "Sofía", "Ángel", "Gabriela", "Diego", "Paola", "Ricardo", "Isabel", "Fernando", "Patricia", "Héctor", "Verónica", "Rafael"];
const APELLIDOS = ["González", "Rodríguez", "Pérez", "Martínez", "Hernández", "López", "Ramírez", "Torres", "Flores", "Rivas", "Mendoza", "Castillo", "Vargas", "Rojas", "Medina", "Salazar", "Ortega", "Contreras"];

const sinTildes = (t) => t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

// Estudiantes inscritos en un curso (determinista a partir del id del curso y la posición).
export function estudiantesDeCurso(curso) {
  return Array.from({ length: curso.inscritos }, (_, i) => {
    const nombre = NOMBRES[(curso.id * 7 + i * 3) % NOMBRES.length];
    const apellido = APELLIDOS[(curso.id * 5 + i * 11) % APELLIDOS.length];
    const mes = 1 + ((curso.id + i) % 9);
    const dia = 1 + ((i * 7 + curso.id) % 27);
    return {
      id: `${curso.id}-${i}`,
      nombre: `${nombre} ${apellido}`,
      cedula: 10000000 + ((curso.id * 7919 + i * 104729) % 20000000),
      correo: `${sinTildes(nombre)}.${sinTildes(apellido)}${i + 1}@correo.com`,
      inscripcion: `2026-${String(mes).padStart(2, "0")}-${String(dia).padStart(2, "0")}`,
      pago: curso.precio === 0 ? "gratis" : i % 6 === 0 ? "pendiente" : "pagado",
      asistencia: curso.estado === "pendiente" ? 0 : 60 + ((i * 13 + curso.id * 7) % 41),
    };
  });
}
