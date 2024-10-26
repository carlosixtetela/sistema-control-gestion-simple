const express = require('express');
const Project = require('../models/project.model');
const router = express.Router();

// Crear un nuevo proyecto
router.post('/', async (req, res) => {
  try {
    const { name, description, startDate } = req.body;
    const newProject = await Project.create({ name, description, startDate });
    res.status(201).json(newProject);
  } catch (error) {
    console.error('Error al crear proyecto:', error);
    res.status(500).json({ message: 'Error al crear proyecto.' });
  }
});

// Listar todos los proyectos
router.get('/', async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (error) {
    console.error('Error al listar proyectos:', error);
    res.status(500).json({ message: 'Error al listar proyectos.' });
  }
});

// Actualizar un proyecto
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, startDate } = req.body;

    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({ message: 'Proyecto no encontrado.' });
    }

    project.name = name;
    project.description = description;
    project.startDate = startDate;
    await project.save();

    res.json(project);
  } catch (error) {
    console.error('Error al actualizar proyecto:', error);
    res.status(500).json({ message: 'Error al actualizar proyecto.' });
  }
});

// Eliminar un proyecto
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({ message: 'Proyecto no encontrado.' });
    }

    await project.destroy();
    res.json({ message: 'Proyecto eliminado con éxito.' });
  } catch (error) {
    console.error('Error al eliminar proyecto:', error);
    res.status(500).json({ message: 'Error al eliminar proyecto.' });
  }
});

module.exports = router;
