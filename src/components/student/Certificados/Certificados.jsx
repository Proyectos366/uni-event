import React, { useState } from 'react';
import jsPDF from 'jspdf';
import Button from '../../../components/Button';
import templateCertificado from '../../../assets/Certificado UniEvent.jpg';

/**
 * Vista de Mis Certificados (Certificados.jsx).
 * Muestra los certificados obtenidos por el estudiante en una cuadrícula premium,
 * permite la previsualización interactiva en tiempo real sobre la plantilla oficial y
 * la descarga de un certificado en PDF usando jsPDF.
 */
const Certificados = () => {
  // Estado para controlar qué certificado se está previsualizando en el Modal
  const [previewCert, setPreviewCert] = useState(null);
  
  // Estado para simular la descarga en progreso
  const [downloadingId, setDownloadingId] = useState(null);

  // Listado de certificados del estudiante
  const certificatesData = [
    {
      id: 1,
      title: "PYTHON 2025",
      date: "22 Jul, 2025",
      description: "Certificado de participación en el evento de desarrollo Back-End.",
      eventFullTitle: "Curso Completo de Programación y Desarrollo Back-End con Python",
      verifyCode: "VER-PY-2025-081"
    },
    {
      id: 2,
      title: "NMAD 2025",
      date: "25 Jul, 2025",
      description: "Certificado de participación en el evento de Ciberseguridad.",
      eventFullTitle: "Seminario de Nuevos Modelos y Amenazas Digitales en Ciberseguridad",
      verifyCode: "VER-NM-2025-442"
    },
    {
      id: 3,
      title: "React Native de Desarrollo Mobile 2025",
      date: "5 May, 2025",
      description: "Certificado de asistencia al taller práctico de desarrollo móvil.",
      eventFullTitle: "Taller Avanzado de Desarrollo de Aplicaciones Mobile con React Native",
      verifyCode: "VER-RN-2025-901"
    }
  ];

  // Función para descargar el PDF dinámicamente con jsPDF
  const handleDownloadPDF = async (cert) => {
    setDownloadingId(cert.id);
    try {
      // Creamos un documento jsPDF en orientación landscape (horizontal)
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [800, 600]
      });

      // Cargar la imagen del template de certificado en base64 o como objeto imagen
      const img = new Image();
      img.src = templateCertificado;

      img.onload = () => {
        // Dibujamos el template de fondo
        doc.addImage(img, 'JPEG', 0, 0, 800, 600);

        // --- Agregar los datos dinámicos encima del certificado ---
        
        // 1. Nombre del estudiante
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(26);
        doc.setTextColor(19, 78, 74); // #134e4a (unievents-dark)
        doc.text("Gabriel Bolivar", 400, 275, { align: 'center' });

        // 2. Título completo de la actividad/evento
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(16);
        doc.setTextColor(20, 184, 166); // #14b8a6 (unievents-teal)
        doc.text(cert.eventFullTitle, 400, 345, { align: 'center', maxWidth: 500 });

        // 3. Fecha de emisión
        doc.setFont('Helvetica', 'normal');
        doc.setFontSize(11);
        doc.setTextColor(107, 114, 128); // #6b7280
        doc.text(`Fecha: ${cert.date}`, 275, 410, { align: 'center' });

        // 4. Código de verificación
        doc.setFont('Courier', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(156, 163, 175); // #9ca3af
        doc.text(`Código: ${cert.verifyCode}`, 525, 410, { align: 'center' });

        // Guardar el PDF con el nombre personalizado
        doc.save(`Certificado_UniEvent_${cert.title.replace(/\s+/g, '_')}.pdf`);
        setDownloadingId(null);
      };
    } catch (error) {
      console.error("Error al generar PDF:", error);
      setDownloadingId(null);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* 1. GRILLA DE CERTIFICADOS (MOCKUP ORIGINAL) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl">
        {certificatesData.map((cert) => (
          <div 
            key={cert.id} 
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between gap-5 hover:shadow-md transition-shadow relative overflow-hidden"
          >
            {/* Detalles de la tarjeta */}
            <div className="space-y-2.5">
              <h4 className="text-lg font-black text-unievents-dark leading-tight">
                {cert.title}
              </h4>
              
              {/* Fecha con icono */}
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{cert.date}</span>
              </div>

              {/* Descripción */}
              <p className="text-sm text-gray-500 font-medium leading-relaxed">
                {cert.description}
              </p>
            </div>

            {/* Acciones e Indicador */}
            <div className="flex flex-wrap items-center justify-between border-t border-gray-50 pt-4 gap-3">
              
              <div className="flex items-center gap-2">
                {/* Botón Descargar PDF */}
                <button
                  onClick={() => handleDownloadPDF(cert)}
                  disabled={downloadingId !== null}
                  className="flex items-center gap-1.5 border border-blue-500 hover:bg-blue-500 hover:text-white text-blue-500 font-extrabold px-3.5 py-2 rounded-xl text-xs transition-all active:scale-95 disabled:opacity-50 disabled:cursor-wait"
                >
                  {downloadingId === cert.id ? (
                    <>
                      <svg className="animate-spin h-3.5 w-3.5 text-blue-500 hover:text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Generando...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <span>Descargar PDF</span>
                    </>
                  )}
                </button>

                {/* Botón Visualizar Certificado */}
                <button
                  onClick={() => setPreviewCert(cert)}
                  className="flex items-center gap-1.5 border border-unievents-teal hover:bg-unievents-teal hover:text-white text-unievents-teal font-extrabold px-3.5 py-2 rounded-xl text-xs transition-all active:scale-95"
                >
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>Visualizar</span>
                </button>
              </div>

              {/* Badge de Obtenido */}
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider select-none">
                Obtenido
              </span>

            </div>

          </div>
        ))}
      </div>

      {/* 2. MODAL DE PREVISUALIZACIÓN DEL CERTIFICADO EN TIEMPO REAL */}
      {previewCert && (
        <div className="fixed inset-0 bg-slate-900/85 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          
          {/* Contenedor del Modal */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-4xl w-full relative border border-gray-100 flex flex-col justify-between animate-in zoom-in-95 duration-300">
            
            {/* Cabecera del Modal */}
            <div className="px-6 py-4 bg-gray-50/80 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h4 className="text-base font-extrabold text-unievents-dark">
                  Previsualización del Certificado Oficial
                </h4>
                <p className="text-xs font-semibold text-gray-400">
                  {previewCert.title} — Código: {previewCert.verifyCode}
                </p>
              </div>
              
              {/* Botón cerrar */}
              <button 
                onClick={() => setPreviewCert(null)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-full p-2.5 transition-all cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Cuerpo del Modal: Lienzo del Certificado */}
            <div className="p-6 bg-slate-100 flex justify-center items-center">
              
              {/* Lienzo del Certificado */}
              <div className="relative w-full max-w-3xl aspect-[4/3] bg-white rounded-xl shadow-lg border border-gray-200/60 overflow-hidden select-none">
                
                {/* Imagen del Template de Fondo */}
                <img 
                  src={templateCertificado} 
                  alt="Template Certificado Oficial UniEvent" 
                  className="w-full h-full object-cover pointer-events-none"
                />

                {/* --- Textos Absolutos posicionados exactamente --- */}
                
                {/* 1. Nombre del Estudiante */}
                <div className="absolute top-[44.5%] left-1/2 -translate-x-1/2 w-full text-center px-4">
                  <h2 className="text-[20px] sm:text-[28px] font-black text-unievents-dark tracking-wide font-serif drop-shadow-xs select-text">
                    Gabriel Bolivar
                  </h2>
                </div>

                {/* 2. Nombre del Evento / Curso */}
                <div className="absolute top-[56.5%] left-1/2 -translate-x-1/2 w-[70%] text-center leading-tight">
                  <p className="text-[11px] sm:text-[16px] font-extrabold text-teal-600 tracking-normal select-text">
                    {previewCert.eventFullTitle}
                  </p>
                </div>

                {/* 3. Fecha */}
                <div className="absolute top-[67%] left-[34%] -translate-x-1/2">
                  <span className="text-[8px] sm:text-[11px] font-bold text-gray-500 select-text">
                    Fecha: {previewCert.date}
                  </span>
                </div>

                {/* 4. Código de Validación */}
                <div className="absolute top-[67%] right-[34%] translate-x-1/2">
                  <span className="text-[8px] sm:text-[11px] font-mono font-bold text-gray-400 select-text">
                    Cód: {previewCert.verifyCode}
                  </span>
                </div>

              </div>

            </div>

            {/* Pie de Página del Modal */}
            <div className="px-6 py-4 bg-gray-50/80 border-t border-gray-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setPreviewCert(null)}
                className="bg-white hover:bg-gray-100 text-gray-600 font-extrabold px-5 py-2.5 rounded-xl border border-gray-200 text-xs transition-all active:scale-95"
              >
                Cerrar vista
              </button>
              
              <Button
                onClick={() => {
                  handleDownloadPDF(previewCert);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-5 py-2.5 rounded-xl transition-all shadow-sm active:scale-95"
              >
                Descargar en PDF
              </Button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default Certificados;
