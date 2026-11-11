import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Layout de las páginas públicas (home, cursos, eventos); login/registro van a pantalla completa.
export default function SitioLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
