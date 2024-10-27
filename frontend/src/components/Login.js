import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/styles.css'; // Importar los estilos adaptados del CodePen

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem('isLoggedIn', 'true'); // Guardar sesión
        navigate('/dashboard'); // Redirigir al Dashboard
      }
    } catch (error) {
      console.error('Error en el login:', error);
      alert('Credenciales incorrectas. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="container">
      <div className="form">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Iniciar Sesión</button>
        </form>
        <p className="message">
          ¿No tienes una cuenta? <a href="#">Regístrate</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
