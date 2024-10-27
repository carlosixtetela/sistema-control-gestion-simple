import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/styles.css'; // Importamos los estilos

const ReportByProject = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [report, setReport] = useState(null);

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

  const fetchReport = async (projectId) => {
    try {
      const response = await axios.get(`http://157.230.210.255:3000/api/reports/${projectId}`);
      setReport(response.data);
    } catch (error) {
      console.error('Error al generar reporte:', error);
      alert('No se pudo generar el reporte. Verifica si el proyecto existe.');
    }
  };

  const handleProjectChange = (e) => {
    const projectId = e.target.value;
    setSelectedProjectId(projectId);
    fetchReport(projectId);
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header">Informe por Proyecto</h1>

      <div className="form">
        <select onChange={handleProjectChange} value={selectedProjectId || ''}>
          <option value="">Selecciona un proyecto</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>

      {report && (
        <div className="report-section">
          <h2 className="report-header">Informe del Proyecto: {report.projectName}</h2>
          
          <div className="report-summary">
            <div className="report-card">
              <h2>Total de Pruebas</h2>
              <p>{report.totalTests}</p>
            </div>
          </div>

          <div className="report-subsection">
            <h3>Pruebas por Estado</h3>
            <ul className="report-list">
              {Object.entries(report.testsByStatus).map(([status, count]) => (
                <li key={status} className="report-item">
                  <span className="report-status">{status}:</span> {count}
                </li>
              ))}
            </ul>
          </div>

          <div className="report-subsection">
            <h3>Defectos por Estado</h3>
            <ul className="report-list">
              {Object.entries(report.defectsByStatus).map(([status, count]) => (
                <li key={status} className="report-item">
                  <span className="report-status">{status}:</span> {count}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportByProject;
