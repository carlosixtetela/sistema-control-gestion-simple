import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/logo.png'; // Importamos el logo
import './styles/styles.css'; // Asegúrate de que la ruta de los estilos sea correcta

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login'); // Redirigir al Login si no ha iniciado sesión
    } else {
      fetchActiveProjects(); // Cargar proyectos activos
    }
  }, [navigate]);

  const fetchActiveProjects = async () => {
    try {
      const response = await axios.get('http://157.230.210.255:3000/api/projects?status=active');
      setProjects(response.data);
    } catch (error) {
      console.error('Error al obtener proyectos activos:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // Eliminar sesión
    navigate('/login'); // Redirigir al Login
  };

  return (
    <div className="dashboard-container">
      

      <nav className="dashboard-nav">
        <Link to="/manage-projects" className="nav-link">Gestionar Proyectos</Link>
        <Link to="/report" className="nav-link">Ver Informe General</Link>
        <Link to="/report-by-project" className="nav-link">Informe por Proyecto</Link>
      </nav>

      <h2 className="projects-header">Lista de Proyectos Activos</h2>
      <ul className="projects-list">
        {projects.map((project) => (
          <li key={project.id} className="project-item">
            <span>{project.name}</span> - <span>{project.description}</span> - <span>{project.startDate}</span>
            <button className="manage-button" onClick={() => navigate(`/project/${project.id}/manage`)}>
              Gestionar Pruebas y Defectos
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
