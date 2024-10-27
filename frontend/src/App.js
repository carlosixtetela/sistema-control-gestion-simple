import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ProjectManager from './components/ProjectManager';
import ProjectManagement from './components/ProjectManagement';
import Report from './components/Report';
import ReportByProject from './components/ReportByProject';
import Login from './components/Login';
import logo from './assets/logo.png'; // Importamos el logo
import './components/styles/styles.css'; // Importamos los estilos

function Header() {
  const navigate = useNavigate();
  const location = useLocation(); // Hook para detectar la ruta actual

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // Eliminar sesión
    navigate('/login'); // Redirigir al Login
  };

  return (
    <header className="app-header">
      <div className="logo-container">
        <img src={logo} alt="IDL Sistemas Logo" className="app-logo" />
        <h1 className="app-title">IDL Sistemas</h1>
      </div>

      {/* Mostrar el botón solo en la ruta /dashboard */}
      {location.pathname === '/dashboard' && (
        <button className="logout-button" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      )}
    </header>
  );
}

function App() {
  return (
    <Router>
      <Header /> {/* Header global */}
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/manage-projects" element={<ProjectManager />} />
        <Route path="/project/:projectId/manage" element={<ProjectManagement />} />
        <Route path="/report" element={<Report />} />
        <Route path="/report-by-project" element={<ReportByProject />} />
      </Routes>
    </Router>
  );
}

export default App;
