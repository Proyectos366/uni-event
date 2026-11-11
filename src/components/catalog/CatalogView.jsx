import EventsBoard from './components/EventsBoard';

const TEXTOS = {
  curso: { titulo: 'Catálogo de cursos', sub: 'Programas académicos para impulsar tu formación profesional.' },
  evento: { titulo: 'Próximos eventos', sub: 'Charlas, ferias y competencias de la comunidad universitaria.' },
};

const CatalogView = ({ type }) => {
  const t = TEXTOS[type];
  return (
    <>
      <header className="relative overflow-hidden bg-gradient-to-br from-unievents-dark via-teal-800 to-unievents-teal text-white">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-unievents-gold/20 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">{t.titulo}</h1>
          <p className="mt-3 text-lg text-teal-50/90 max-w-2xl">{t.sub}</p>
        </div>
      </header>
      <EventsBoard title={t.titulo} type={type} hideHeader />
    </>
  );
};

export default CatalogView;
