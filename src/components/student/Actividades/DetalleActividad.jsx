import React, { useState } from 'react';
import Button from '../../../components/Button';
import Input from '../../../components/input/Input';

/**
 * Componente modular DetalleActividad.jsx.
 * Renderiza los detalles completos de una actividad o curso, permitiendo la inscripción
 * directa y abriendo una modal interactiva para confirmar la compra/pago.
 */
const DetalleActividad = ({ activity, onBack, onPurchaseSuccess }) => {
  // Estado para controlar la apertura del modal de compra
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  
  // Estado para el método de pago seleccionado
  const [paymentMethod, setPaymentMethod] = useState('card');
  
  // Estado para el procesamiento del pago
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  // Datos simulados del formulario de tarjeta
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvc: '',
    holder: 'Gabriel Bolivar'
  });

  const handleInputChange = (e) => {
    setCardData({
      ...cardData,
      [e.target.name]: e.target.value
    });
  };

  const handleConfirmPayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simular retraso de procesamiento de red de pago
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentCompleted(true);
      
      // Esperar un momento y notificar el éxito al componente padre
      setTimeout(() => {
        onPurchaseSuccess(activity);
        setShowPurchaseModal(false);
        setPaymentCompleted(false);
      }, 3000);
    }, 2000);
  };

  // Precio formateado
  const price = activity.price || "$25.00 USD";
  const isFree = price === 'Gratis';

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* 1. CABECERA DE VOLVER */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-extrabold text-unievents-teal hover:text-teal-700 transition-colors select-none group cursor-pointer"
      >
        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>Volver al catálogo</span>
      </button>

      {/* 2. RECUADRO PRINCIPAL DE DETALLE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Columna Izquierda: Información de la actividad (Col-8) */}
        <div className="lg:col-span-8 space-y-8 bg-white p-6 sm:p-8 rounded-3xl border border-yellow-100/50 shadow-sm">
          
          {/* Banner visual */}
          <div className="h-64 sm:h-96 w-full rounded-2xl overflow-hidden bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600 flex items-center justify-center text-white relative shadow-inner">
            <svg className="w-24 h-24 text-teal-100 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <div className="absolute top-4 left-4 bg-white/95 text-unievents-teal font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
              {activity.category || 'Actividad'}
            </div>
          </div>

          {/* Título y detalles */}
          <div className="space-y-4">
            <h3 className="text-2xl sm:text-3xl font-black text-unievents-dark leading-tight">
              {activity.title}
            </h3>
            
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-medium">
              {activity.fullDescription || activity.description || "Aprende y domina habilidades clave a lo largo de este completo y didáctico programa educativo diseñado para la excelencia académica y profesional en la plataforma UniEvent."}
            </p>
          </div>

          {/* Objetivos */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <h4 className="text-lg font-black text-unievents-dark">Lo que aprenderás</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {(activity.objectives || [
                "Dominar conceptos teóricos y técnicos con total fluidez.",
                "Desarrollar talleres prácticos basados en desafíos del mundo real.",
                "Recibir mentoría personalizada y retroalimentación interactiva.",
                "Obtener un certificado de asistencia oficial validado."
              ]).map((obj, i) => (
                <div key={i} className="flex gap-2.5 items-start">
                  <svg className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm font-semibold text-gray-500 leading-normal">{obj}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ponente */}
          <div className="space-y-4 pt-6 border-t border-gray-100">
            <h4 className="text-lg font-black text-unievents-dark">Facilitador del evento</h4>
            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-gray-100 max-w-md select-none">
              <div className="w-12 h-12 rounded-full bg-teal-600 flex items-center justify-center text-white font-extrabold text-lg shadow-sm">
                {(activity.instructor || "MSc. Alejandro Silva")[0]}
              </div>
              <div>
                <h5 className="text-sm font-black text-unievents-dark">
                  {activity.instructor || "MSc. Alejandro Silva"}
                </h5>
                <p className="text-xs font-semibold text-gray-400">
                  Especialista de Sistemas y Ponente Invitado
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Columna Derecha: Tarjeta de Pago e Inscripción (Col-4) */}
        <div className="lg:col-span-4 sticky top-6 space-y-6">
          <div className="bg-white rounded-3xl border border-yellow-100 shadow-md p-6 space-y-6">
            
            {/* Precio */}
            <div className="space-y-1">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Inversión del curso
              </span>
              <div className="flex items-baseline gap-1 select-none">
                <span className="text-4xl font-black text-unievents-dark">
                  {price}
                </span>
                {!isFree && <span className="text-xs font-bold text-gray-400">USD</span>}
              </div>
            </div>

            {/* Ficha técnica rápida */}
            <div className="space-y-3 pt-4 border-t border-gray-100">
              {/* Fecha */}
              <div className="flex items-center gap-3 select-none">
                <div className="bg-teal-50 text-unievents-teal p-2 rounded-lg shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide leading-none">Fecha de inicio</p>
                  <p className="text-xs font-extrabold text-unievents-dark mt-0.5">{activity.date}</p>
                </div>
              </div>

              {/* Horario */}
              <div className="flex items-center gap-3 select-none">
                <div className="bg-teal-50 text-unievents-teal p-2 rounded-lg shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide leading-none">Horario y duración</p>
                  <p className="text-xs font-extrabold text-unievents-dark mt-0.5">{activity.time || "09:00 - 13:00"}</p>
                </div>
              </div>

              {/* Modalidad */}
              <div className="flex items-center gap-3 select-none">
                <div className="bg-teal-50 text-unievents-teal p-2 rounded-lg shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide leading-none">Modalidad</p>
                  <p className="text-xs font-extrabold text-unievents-dark mt-0.5">{activity.location || "Aula Virtual Zoom"}</p>
                </div>
              </div>

              {/* Cupos */}
              <div className="flex items-center gap-3 select-none">
                <div className="bg-teal-50 text-unievents-teal p-2 rounded-lg shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide leading-none">Disponibilidad</p>
                  <p className="text-xs font-extrabold text-emerald-600 mt-0.5">{activity.status || "Cupos disponibles"}</p>
                </div>
              </div>
            </div>

            {/* Botón de compra / inscripción */}
            <div className="pt-2">
              <Button 
                onClick={() => setShowPurchaseModal(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3.5 rounded-xl transition-all shadow-md shadow-blue-500/10 active:scale-[0.98] text-sm tracking-wide"
              >
                {isFree ? 'Inscribirse gratis' : 'Realizar compra'}
              </Button>
            </div>

          </div>
        </div>

      </div>

      {/* 3. MODAL DE COMPRA / PAGO (FOTO 2) */}
      {showPurchaseModal && (
        <div className="fixed inset-0 bg-slate-900/85 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-md w-full relative border border-gray-100 flex flex-col justify-between animate-in zoom-in-95 duration-300">
            
            {/* Header del modal */}
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
              <h4 className="text-base font-extrabold text-unievents-dark select-none">
                {isFree ? 'Confirmación de Inscripción' : 'Confirmación de Compra'}
              </h4>
              <button 
                onClick={() => {
                  if (!isProcessing && !paymentCompleted) setShowPurchaseModal(false);
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors bg-gray-100 p-1.5 rounded-full"
                disabled={isProcessing || paymentCompleted}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Cuerpo del modal */}
            <div className="p-6">
              {paymentCompleted ? (
                /* --- PANTALLA DE ÉXITO --- */
                <div className="flex flex-col items-center justify-center text-center py-6 space-y-4 animate-in fade-in duration-500">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shadow-inner">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h5 className="text-lg font-black text-unievents-dark select-none">
                    {isFree ? '¡Inscripción Exitosa!' : '¡Pago Procesado con Éxito!'}
                  </h5>
                  <p className="text-sm text-gray-500 font-semibold max-w-xs leading-relaxed">
                    {isFree 
                      ? 'Tu cupo ha sido reservado. Ya puedes visualizar esta actividad en tu sección "Mis Actividades".'
                      : 'El cobro ha sido procesado de forma segura. Se ha enviado un recibo a tu correo institucional.'
                    }
                  </p>
                </div>
              ) : isProcessing ? (
                /* --- PANTALLA DE CARGA --- */
                <div className="flex flex-col items-center justify-center py-12 space-y-4 animate-in fade-in">
                  <svg className="animate-spin h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <p className="text-sm font-black text-unievents-dark select-none">
                    {isFree ? 'Procesando registro...' : 'Procesando pago de forma segura...'}
                  </p>
                </div>
              ) : (
                /* --- FORMULARIO DE COMPRA / PAGO --- */
                <form onSubmit={handleConfirmPayment} className="space-y-6">
                  
                  {/* Resumen del Evento */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-gray-100 space-y-1.5 select-none">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide leading-none">Actividad seleccionada</p>
                    <p className="text-sm font-black text-unievents-dark leading-tight">{activity.title}</p>
                    <div className="flex justify-between items-center border-t border-gray-150 pt-2.5 mt-2.5">
                      <span className="text-xs font-bold text-gray-400">Total a pagar:</span>
                      <span className="text-base font-black text-unievents-dark">{price}</span>
                    </div>
                  </div>

                  {!isFree ? (
                    /* Si NO es gratis, mostramos las opciones de pago de la foto 2 */
                    <div className="space-y-4">
                      
                      {/* Opciones de Método */}
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('card')}
                          className={`flex-1 py-2 px-3 rounded-xl border text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                            paymentMethod === 'card' 
                              ? 'border-blue-500 bg-blue-50 text-blue-700 font-extrabold shadow-sm' 
                              : 'border-gray-200 text-gray-500 bg-white hover:bg-gray-50'
                          }`}
                        >
                          Tarjeta de Crédito
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('transfer')}
                          className={`flex-1 py-2 px-3 rounded-xl border text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                            paymentMethod === 'transfer' 
                              ? 'border-blue-500 bg-blue-50 text-blue-700 font-extrabold shadow-sm' 
                              : 'border-gray-200 text-gray-500 bg-white hover:bg-gray-50'
                          }`}
                        >
                          Pago Móvil / Transf.
                        </button>
                      </div>

                      {paymentMethod === 'card' ? (
                        /* Formulario Tarjeta */
                        <div className="space-y-4">
                          
                          {/* Titular */}
                          <Input
                            label="Titular de la tarjeta"
                            name="holder"
                            value={cardData.holder}
                            onChange={handleInputChange}
                            placeholder="Nombre del titular"
                            required
                          />

                          {/* Número */}
                          <Input
                            label="Número de tarjeta"
                            name="number"
                            value={cardData.number}
                            onChange={handleInputChange}
                            placeholder="4111 2222 3333 4444"
                            maxLength="19"
                            required
                          />

                          {/* Expira y CVC */}
                          <div className="grid grid-cols-2 gap-4">
                            <Input
                              label="Vencimiento"
                              name="expiry"
                              value={cardData.expiry}
                              onChange={handleInputChange}
                              placeholder="MM/AA"
                              maxLength="5"
                              required
                            />
                            <Input
                              label="CVC"
                              name="cvc"
                              value={cardData.cvc}
                              onChange={handleInputChange}
                              placeholder="123"
                              maxLength="3"
                              required
                            />
                          </div>

                        </div>
                      ) : (
                        /* Formulario Transferencia */
                        <div className="bg-slate-50 p-4 rounded-xl border border-gray-150 text-center space-y-3">
                          <p className="text-xs font-bold text-gray-500">
                            Realiza el pago móvil o transferencia a los siguientes datos y completa la inscripción:
                          </p>
                          <div className="text-xs font-semibold text-gray-500 text-left space-y-1 bg-white p-3 rounded-lg border border-gray-100">
                            <p><strong>Banco:</strong> Banesco (0134)</p>
                            <p><strong>RIF:</strong> J-12345678-9</p>
                            <p><strong>Teléfono:</strong> 0412-1234567</p>
                          </div>
                          <Input
                            label="Número de Referencia de Pago"
                            name="ref"
                            placeholder="Ingresa los últimos 6 dígitos"
                            required
                          />
                        </div>
                      )}

                    </div>
                  ) : (
                    /* Si es gratis, solo se muestra un breve aviso */
                    <p className="text-sm font-semibold text-gray-400 text-center py-2">
                      Al confirmar, quedarás formalmente inscrito de forma totalmente gratuita en el curso.
                    </p>
                  )}

                  {/* Acciones */}
                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => setShowPurchaseModal(false)}
                      className="bg-white hover:bg-gray-100 text-gray-600 font-extrabold px-5 py-2.5 rounded-xl border border-gray-200 text-xs transition-all active:scale-95"
                    >
                      Cancelar
                    </button>
                    <Button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-5 py-2.5 rounded-xl transition-all shadow-sm active:scale-95 text-xs"
                    >
                      {isFree ? 'Confirmar Registro' : 'Confirmar Pago'}
                    </Button>
                  </div>

                </form>
              )}
            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default DetalleActividad;
