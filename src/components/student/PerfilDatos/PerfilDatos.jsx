import React, { useState } from 'react';
import Input from '../../../components/input/Input';
import InputEmail from '../../../components/input/types/InputEmail';
import InputPassword from '../../../components/input/types/InputPassword';
import Button from '../../../components/Button';

/**
 * Vista de Mis Datos (PerfilDatos.jsx).
 * Despliega información personal, cambio seguro de contraseña en una grilla simétrica
 * y estadísticas de participación del estudiante ocupando el ancho completo en la parte inferior.
 */
const PerfilDatos = () => {
  // Estado local para datos personales
  const [personalData, setPersonalData] = useState({
    nombre: 'Gabriel Bolivar',
    email: 'gabrielbolivar@gmail.com',
    telefono: '0424-3540261',
    departamento: ''
  });

  // Estado local para cambio de contraseña
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Estado para mensajes de feedback simulados
  const [personalSuccess, setPersonalSuccess] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const handlePersonalChange = (e) => {
    setPersonalData({
      ...personalData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handlePersonalSubmit = (e) => {
    e.preventDefault();
    setPersonalSuccess(true);
    setTimeout(() => setPersonalSuccess(false), 4000);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setPasswordSuccess(true);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setTimeout(() => setPasswordSuccess(false), 4000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* 1. BANNER SUPERIOR DE PERFIL */}
      <div className="bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 px-8 py-8 rounded-3xl text-white flex flex-col sm:flex-row items-center gap-6 shadow-md border border-teal-300/30">
        
        {/* Contenedor de la foto de perfil con borde y overlay de cámara */}
        <div className="relative shrink-0">
          <div className="w-28 h-28 rounded-full border-4 border-white overflow-hidden shadow-lg bg-teal-100 flex items-center justify-center">
            {/* Fallback de Avatar SVG premium con degradado */}
            <svg className="w-20 h-20 text-teal-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
          
          {/* Badge de cámara para subir imagen */}
          <button className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 border border-white cursor-pointer shadow-md transition-all active:scale-95">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>

        {/* Detalles del usuario */}
        <div className="text-center sm:text-left space-y-2">
          <h3 className="text-2xl sm:text-3xl font-black tracking-wide drop-shadow-sm select-none">
            {personalData.nombre}
          </h3>
          <p className="text-sm font-semibold text-teal-50/90 leading-none">
            {personalData.email}
          </p>
          
          {/* Badges de Cédula y Rol */}
          <div className="flex flex-wrap gap-2.5 justify-center sm:justify-start pt-1">
            <span className="bg-slate-800/80 backdrop-blur-sm text-white text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-wider select-none border border-slate-700/30">
              V-28051690
            </span>
            <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-wider select-none border border-blue-500/30">
              Estudiante
            </span>
          </div>
        </div>

      </div>

      {/* 2. GRID DE FORMULARIOS SIMÉTRICOS (INFORMACIÓN Y CONTRASEÑA LADO A LADO) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Columna Izquierda: Información Personal */}
        <form onSubmit={handlePersonalSubmit} className="bg-white rounded-2xl border border-yellow-100 shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            {/* Header del bloque */}
            <div className="border-b border-gray-100 p-5 bg-gray-50/50">
              <h4 className="text-lg font-black text-unievents-dark">
                Información personal
              </h4>
            </div>

            {/* Inputs del formulario */}
            <div className="p-6 space-y-5">
              
              {/* Alerta de Éxito al guardar cambios */}
              {personalSuccess && (
                <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 p-4 rounded-xl flex gap-2.5 items-center text-sm font-semibold animate-in fade-in slide-in-from-top-3 duration-300">
                  <svg className="w-5 h-5 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>¡Cambios de información personal guardados con éxito!</span>
                </div>
              )}

              {/* Nombre completo */}
              <Input
                label="Nombre completo"
                name="nombre"
                value={personalData.nombre}
                onChange={handlePersonalChange}
                placeholder="Ingresa tu nombre completo"
                required
              />

              {/* Correo electrónico (Deshabilitado/Lectura) */}
              <InputEmail
                value={personalData.email}
                disabled
                className="bg-gray-100/80 border-gray-200 text-gray-400 cursor-not-allowed select-none"
                title="El correo electrónico no puede ser modificado"
              />

              {/* Teléfono */}
              <Input
                label="Teléfono"
                name="telefono"
                value={personalData.telefono}
                onChange={handlePersonalChange}
                placeholder="Ingresa tu número telefónico"
                type="tel"
                required
              />

              {/* Facultad / Departamento Select */}
              <div className="flex flex-col gap-1 w-full text-left">
                <label className="text-sm font-semibold text-unievents-teal mb-1">
                  Facultad / Departamento
                </label>
                <div className="relative">
                  <select
                    name="departamento"
                    value={personalData.departamento}
                    onChange={handlePersonalChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none transition-all bg-white text-sm font-semibold text-unievents-dark appearance-none cursor-pointer"
                  >
                    <option value="">Seleccionar</option>
                    <option value="Ingeniería de Sistemas">Ingeniería de Sistemas</option>
                    <option value="Ingeniería Industrial">Ingeniería Industrial</option>
                    <option value="Administración de Empresas">Administración de Empresas</option>
                    <option value="Diseño Gráfico">Diseño Gráfico</option>
                  </select>
                  <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Botón Guardar Cambios en el pie */}
          <div className="p-6 pt-0">
            <Button 
              type="submit"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-6 py-2.5 rounded-xl transition-all shadow-sm shadow-blue-500/10 active:scale-[0.98]"
            >
              Guardar cambios
            </Button>
          </div>
        </form>

        {/* Columna Derecha: Cambiar Contraseña */}
        <form onSubmit={handlePasswordSubmit} className="bg-white rounded-2xl border border-yellow-100 shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            <div className="border-b border-gray-100 p-5 bg-gray-50/50">
              <h4 className="text-lg font-black text-unievents-dark">
                Cambiar contraseña
              </h4>
            </div>

            <div className="p-6 space-y-5">
              
              {/* Alerta de Éxito al cambiar contraseña */}
              {passwordSuccess && (
                <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 p-4 rounded-xl flex gap-2.5 items-center text-sm font-semibold animate-in fade-in slide-in-from-top-3 duration-300">
                  <svg className="w-5 h-5 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>¡Contraseña actualizada con éxito!</span>
                </div>
              )}

              {/* Contraseña actual */}
              <InputPassword
                label="Contraseña actual"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                placeholder="Ingresa tu contraseña actual"
                required
              />

              {/* Nueva contraseña */}
              <InputPassword
                label="Nueva contraseña"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                placeholder="Ingresa tu nueva contraseña"
                required
              />

              {/* Confirmar contraseña */}
              <InputPassword
                label="Confirmar contraseña"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                placeholder="Confirma tu nueva contraseña"
                required
              />

            </div>
          </div>

          {/* Botón Actualizar Contraseña en el pie */}
          <div className="p-6 pt-0">
            <Button 
              type="submit"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-6 py-2.5 rounded-xl transition-all shadow-sm shadow-blue-500/10 active:scale-[0.98]"
            >
              Actualizar contraseña
            </Button>
          </div>
        </form>

      </div>

      {/* 3. BLOQUE DE ESTADÍSTICAS DE PARTICIPACIÓN (ANCHO COMPLETO - ABAJO) */}
      <div className="bg-white rounded-2xl border border-yellow-100 shadow-sm overflow-hidden">
        
        {/* Header */}
        <div className="border-b border-gray-100 p-5 bg-gray-50/50">
          <h4 className="text-lg font-black text-unievents-dark">
            Estadísticas de participación
          </h4>
        </div>

        {/* Métrica en Cuadrícula de 4 Columnas premium */}
        <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          
          {/* Tarjeta 1: Eventos Inscritos */}
          <div className="bg-teal-50/30 border border-teal-100/50 p-6 rounded-2xl text-center select-none shadow-sm flex flex-col justify-center items-center hover:scale-[1.02] hover:bg-teal-50/50 transition-all duration-300">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Eventos inscritos
            </span>
            <span className="text-3xl font-black text-unievents-dark leading-none">
              12
            </span>
          </div>

          {/* Tarjeta 2: Eventos Asistidos */}
          <div className="bg-teal-50/30 border border-teal-100/50 p-6 rounded-2xl text-center select-none shadow-sm flex flex-col justify-center items-center hover:scale-[1.02] hover:bg-teal-50/50 transition-all duration-300">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Eventos asistidos
            </span>
            <span className="text-3xl font-black text-unievents-dark leading-none">
              10
            </span>
          </div>

          {/* Tarjeta 3: Certificados Obtenidos */}
          <div className="bg-teal-50/30 border border-teal-100/50 p-6 rounded-2xl text-center select-none shadow-sm flex flex-col justify-center items-center hover:scale-[1.02] hover:bg-teal-50/50 transition-all duration-300">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Certificados obtenidos
            </span>
            <span className="text-3xl font-black text-unievents-dark leading-none">
              8
            </span>
          </div>

          {/* Tarjeta 4: Eventos Organizados */}
          <div className="bg-teal-50/30 border border-teal-100/50 p-6 rounded-2xl text-center select-none shadow-sm flex flex-col justify-center items-center hover:scale-[1.02] hover:bg-teal-50/50 transition-all duration-300">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Eventos organizados
            </span>
            <span className="text-3xl font-black text-unievents-dark leading-none">
              2
            </span>
          </div>

        </div>
      </div>

    </div>
  );
};

export default PerfilDatos;
