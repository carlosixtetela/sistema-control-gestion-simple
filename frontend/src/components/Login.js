import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/styles.css'; // Importar los estilos adaptados del CodePen

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Credenciales quemadas (Hardcoded)
  const validCredentials = {
    email: 'admin@example.com',
    password: 'password123',
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Verificar las credenciales ingresadas con las quemadas
    if (email === validCredentials.email && password === validCredentials.password) {
      localStorage.setItem('isLoggedIn', 'true'); // Guardar sesión
      navigate('/dashboard'); // Redirigir al Dashboard
    } else {
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
