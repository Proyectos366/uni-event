import React from 'react';
import EventsBoard from './components/EventsBoard';

const CatalogView = ({ type }) => {
  return (
    <div className="animate-in fade-in duration-500">
      <EventsBoard 
        title={type === 'curso' ? "Catálogo de Cursos" : "Próximos Eventos"} 
        type={type} 
      />
    </div>
  );
};

export default CatalogView;
