import imagoTipo from '../assets/ImagoTipo.png';

const Footer = () => {
  return (
    <footer className="bg-unievents-gradient border-t border-gray-100 py-2 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Identidad en el Footer - Logotipo Completo */}
        <div className="flex items-center">
          <img src={imagoTipo} alt="UniEvent Logo" className="w-15 h-auto opacity-90" />
        </div>

        {/* Copyright y Texto Legal */}
        <div className="text-gray-500 text-sm text-center md:text-left">
          <p className='text-center'>© 2026 UniEvent. Todos los derechos reservados.</p>
          <p className="mt-1 text-center">Plataforma de gestión de eventos y cursos universitarios.</p>
        </div>

        {/* Enlaces Rápidos o Redes (Placeholder para futuro) */}
        <div className="flex gap-6">
          <a href="#" className="text-gray-400 hover:text-unievents-teal transition-colors text-sm font-medium">Ayuda</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
