import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import axios from 'axios';
import './styles/styles.css'; // Importar los estilos

const ProjectManagement = () => {
  const { projectId } = useParams(); 
  const [tests, setTests] = useState([]);
  const [newTestName, setNewTestName] = useState('');
  const [newTestDescription, setNewTestDescription] = useState('');
  const [editTest, setEditTest] = useState(null);
  const [editStatus, setEditStatus] = useState('');

  useEffect(() => {
    if (projectId) {
      fetchTests();
    }
  }, [projectId]);

  const fetchTests = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/tests/${projectId}`);
      setTests(response.data);
    } catch (error) {
      console.error('Error al obtener pruebas:', error);
    }
  };

  const handleCreateTest = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/tests', {
        name: newTestName,
        description: newTestDescription,
        projectId,
        status: 'pending',
      });
      setNewTestName('');
      setNewTestDescription('');
      fetchTests();
    } catch (error) {
      console.error('Error al crear prueba:', error);
    }
  };

  const handleEditTest = (test) => {
    setEditTest(test);
    setEditStatus(test.status);
  };

  const handleUpdateTest = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/tests/${editTest.id}`, {
        status: editStatus,
      });
      setEditTest(null);
      setEditStatus('');
      fetchTests();
    } catch (error) {
      console.error('Error al actualizar la prueba:', error);
    }
  };

  const handleDeleteTest = async (id) => {
    const confirmDelete = window.confirm('¿Estás seguro de eliminar esta prueba?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/api/tests/${id}`);
      fetchTests();
    } catch (error) {
      console.error('Error al eliminar prueba:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header">Gestión de Pruebas para el Proyecto {projectId}</h1>

      <form onSubmit={handleCreateTest} className="form">
        <input
          type="text"
          placeholder="Nombre de la Prueba"
          value={newTestName}
          onChange={(e) => setNewTestName(e.target.value)}
          required
        />
        <textarea
          placeholder="Descripción de la Prueba"
          value={newTestDescription}
          onChange={(e) => setNewTestDescription(e.target.value)}
          required
        />
        <button type="submit">Agregar Prueba</button>
      </form>

      <h2 className="projects-header">Lista de Pruebas</h2>
      <ul className="tests-list">
        {tests.map((test) => (
          <li key={test.id} className="test-item">
            <div className="test-info">
              <span className="test-name">{test.name}</span>
              <span className="test-status">{test.status}</span>
            </div>
            <div className="test-actions">
              <button className="manage-button" onClick={() => handleEditTest(test)}>Editar</button>
              <button className="delete-button" onClick={() => handleDeleteTest(test.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>

      {editTest && (
        <form onSubmit={handleUpdateTest} className="form">
          <h3>Editando Prueba: {editTest.name}</h3>
          <select
            value={editStatus}
            onChange={(e) => setEditStatus(e.target.value)}
            required
          >
            <option value="pending">Pendiente</option>
            <option value="passed">Pasada</option>
            <option value="failed">Fallida</option>
          </select>
          <button type="submit">Actualizar Prueba</button>
        </form>
      )}
    </div>
  );
};

export default ProjectManagement;
