import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/styles.css'; // Importamos los estilos

const Report = () => {
  const [report, setReport] = useState(null);

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      const response = await axios.get('http://157.230.210.255:3000/api/reports'); // Verifica la URL
      setReport(response.data);
    } catch (error) {
      console.error('Error al generar el reporte:', error);
    }
  };

  if (!report) {
    return <p className="loading">Cargando reporte...</p>;
  }

  const testsByStatus = report.testsByStatus || {};
  const defectsByStatus = report.defectsByStatus || {};

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header">Informe General</h1>

      <div className="report-summary">
        <div className="report-card">
          <h2>Total de Proyectos</h2>
          <p>{report.totalProjects}</p>
        </div>
        <div className="report-card">
          <h2>Total de Pruebas</h2>
          <p>{report.totalTests}</p>
        </div>
      </div>

      <div className="report-section">
        <h2>Pruebas por Estado</h2>
        <ul className="report-list">
          {Object.entries(testsByStatus).map(([status, count]) => (
            <li key={status} className="report-item">
              <span className="report-status">{status}:</span> {count}
            </li>
          ))}
        </ul>
      </div>

      <div className="report-section">
        <h2>Defectos por Estado</h2>
        <ul className="report-list">
          {Object.entries(defectsByStatus).map(([status, count]) => (
            <li key={status} className="report-item">
              <span className="report-status">{status}:</span> {count}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Report;
