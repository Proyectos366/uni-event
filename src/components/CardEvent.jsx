import React from 'react';
import Button from './Button';

/**
 * Componente CardEvent para renderizar cursos y eventos en cuadrícula.
 */
const CardEvent = ({ 
  title, 
  description, 
  date, 
  type, 
  imageUrl, 
  price = "Gratis", 
  category, 
  status, 
  statusType = 'success', 
  hidePrice = false,
  onVerMas
}) => {
  // Configuración de estilos para el badge de estado
  const statusStyles = {
    success: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
    warning: 'bg-amber-100 text-amber-800 border border-amber-200',
    danger: 'bg-rose-100 text-rose-800 border border-rose-200',
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
      {/* Contenedor de la Imagen y Etiqueta */}
      <div className="h-48 bg-gray-100 relative overflow-hidden">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-teal-50 text-unievents-teal">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        {/* Etiqueta dinámica de tipo o categoría */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-unievents-teal uppercase tracking-wider shadow-sm">
          {category || (type === 'curso' ? 'Curso' : 'Evento')}
        </div>
      </div>
      
      {/* Cuerpo de la Tarjeta */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <svg className="w-4 h-4 text-unievents-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {date}
        </div>
        <h3 className="text-xl font-bold text-unievents-dark mb-3 line-clamp-2 group-hover:text-unievents-teal transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">
          {description}
        </p>
        
        {/* Pie de la Tarjeta con Precio/Estado y Botón */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
          {!hidePrice ? (
            <span className="text-2xl font-black text-unievents-teal">{price}</span>
          ) : (
            status && (
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusStyles[statusType] || statusStyles.success}`}>
                {status}
              </span>
            )
          )}
          <Button 
            onClick={onVerMas}
            variant="secondary" 
            className="!px-4 !py-1 text-sm border-unievents-teal text-unievents-teal hover:bg-unievents-teal hover:text-white"
          >
            Ver más
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardEvent;
