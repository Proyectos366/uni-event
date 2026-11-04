import React, { useState } from 'react';
import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';
import InputEmail from '../../components/input/types/InputEmail';
import InputPassword from '../../components/input/types/InputPassword';
import imagoTipo from '../../assets/ImagoTipo.png';

const LoginView = ({ onBack, onRecover, onRegister, onLoginSuccess }) => {
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLoginSuccess) {
      onLoginSuccess();
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-teal-400 to-teal-600 py-20 px-6">
      <div className="bg-unievents-bg p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
        {/* Logotipo Imagotipo */}
        <img src={imagoTipo} alt="UniEvent Full Logo" className="w-40 mx-auto mb-2" />

        {/* Título y retorno al inicio */}
        <h2 className="text-3xl font-bold text-unievents-dark mb-10 cursor-pointer" onClick={onBack}>Ingresa a tu cuenta</h2>

        {/* Formulario de Inicio de Sesión */}
        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          <InputEmail
            value={formData.email}
            onChange={handleChange}
          />

          <InputPassword
            value={formData.password}
            onChange={handleChange}
          />

          <Checkbox
            id="remember"
            label="Recordarme"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />

          <Button type="submit" variant="primary" className="w-full !py-3 shadow-md">
            Iniciar sesión
          </Button>
        </form>

        {/* Enlaces a otras vistas */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={onRecover}
            className="block w-full text-sm text-unievents-teal font-bold hover:underline mb-2 text-center"
          >
            ¿Olvidaste tu contraseña?
          </button>
          <p className="text-sm text-gray-500">
            ¿No tienes cuenta? <button onClick={onRegister} className="text-unievents-teal font-bold hover:underline ml-1">Regístrate aquí</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
