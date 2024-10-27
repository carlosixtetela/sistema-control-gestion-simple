import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/styles.css'; // Importamos los estilos

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://157.230.210.255:3000/api/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error al obtener proyectos:', error);
    }
  };

  const validateForm = () => name && description && startDate;

  const handleCreateOrUpdateProject = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    try {
      if (editingProject) {
        await axios.put(`http://157.230.210.255:3000/api/projects/${editingProject.id}`, {
          name,
          description,
          startDate,
        });
      } else {
        await axios.post('http://157.230.210.255:3000/api/projects', {
          name,
          description,
          startDate,
        });
      }
      fetchProjects();
      resetForm();
    } catch (error) {
      console.error('Error al gestionar proyecto:', error);
    }
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setName(project.name);
    setDescription(project.description);
    setStartDate(project.startDate);
  };

  const handleDeleteProject = async (id) => {
    const confirm = window.confirm('¿Estás seguro de que deseas eliminar este proyecto?');
    if (!confirm) return;

    try {
      await axios.delete(`http://157.230.210.255:3000/api/projects/${id}`);
      fetchProjects();
    } catch (error) {
      console.error('Error al eliminar proyecto:', error);
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setStartDate('');
    setEditingProject(null);
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header">Gestión de Proyectos</h1>

      <form onSubmit={handleCreateOrUpdateProject} className="form">
        <input
          type="text"
          placeholder="Nombre del Proyecto"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Descripción del Proyecto"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
        <div className="form-buttons">
          <button type="submit">
            {editingProject ? 'Actualizar Proyecto' : 'Crear Proyecto'}
          </button>
          {editingProject && (
            <button type="button" onClick={resetForm}>
              Cancelar Edición
            </button>
          )}
        </div>
      </form>

      <h2 className="projects-header">Lista de Proyectos</h2>
      <ul className="projects-list">
        {projects.map((project) => (
          <li key={project.id} className="project-item">
            <div className="project-info">
              <span className="project-name">{project.name}</span>
              <span className="project-description">{project.description}</span>
              <span className="project-date">{project.startDate}</span>
            </div>
            <div className="project-actions">
              <button onClick={() => handleEditProject(project)} className="manage-button">
                Editar
              </button>
              <button onClick={() => handleDeleteProject(project.id)} className="delete-button">
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectManager;
