import Button from "@/components/botones/Button";

/**
 * Tarjeta de curso/evento. La usan el catálogo público y el dashboard de estudiante.
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
  const statusStyles = {
    success: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
    warning: 'bg-amber-100 text-amber-800 border border-amber-200',
    danger: 'bg-rose-100 text-rose-800 border border-rose-200',
  };
  const esCurso = type === 'curso';

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full">
      {/* Imagen o placeholder con degradado */}
      <div className="h-48 relative overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        ) : (
          <div className={`w-full h-full flex items-center justify-center text-white bg-gradient-to-br ${esCurso ? 'from-teal-400 to-unievents-dark' : 'from-unievents-gold to-orange-500'}`}>
            <svg className="w-14 h-14 opacity-90" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              {esCurso
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m-6-3.5V12l6 3 6-3v4.5" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />}
            </svg>
          </div>
        )}
        <span className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-unievents-teal uppercase tracking-wider shadow-sm">
          {category || (esCurso ? 'Curso' : 'Evento')}
        </span>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <svg className="w-4 h-4 text-unievents-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {date}
        </div>
        <h3 className="text-xl font-bold text-unievents-dark mb-2 line-clamp-2 group-hover:text-unievents-teal transition-colors">{title}</h3>
        <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">{description}</p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          {!hidePrice ? (
            <span className="text-xl font-black text-unievents-teal">{price}</span>
          ) : (
            status && (
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusStyles[statusType] || statusStyles.success}`}>{status}</span>
            )
          )}
          <Button onClick={onVerMas} className="!px-5 !py-1.5 text-sm group-hover:bg-unievents-dark">
            Ver más →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardEvent;
