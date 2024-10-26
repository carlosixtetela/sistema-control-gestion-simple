const express = require('express');
const Test = require('../models/test.model');
const router = express.Router();

// Crear una prueba asociada a un proyecto
router.post('/', async (req, res) => {
  try {
    const { name, description, projectId } = req.body;
    const newTest = await Test.create({ name, description, projectId });
    res.status(201).json(newTest);
  } catch (error) {
    console.error('Error al crear prueba:', error);
    res.status(500).json({ message: 'Error al crear prueba.' });
  }
});

// Listar pruebas por proyecto
router.get('/:projectId', async (req, res) => {
  try {
    const { projectId } = req.params;
    const tests = await Test.findAll({ where: { projectId } });
    res.json(tests);
  } catch (error) {
    console.error('Error al listar pruebas:', error);
    res.status(500).json({ message: 'Error al listar pruebas.' });
  }
});

// Actualizar estado de una prueba
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const test = await Test.findByPk(id);
    if (!test) {
      return res.status(404).json({ message: 'Prueba no encontrada.' });
    }

    test.status = status;
    await test.save();

    res.json({ message: 'Estado actualizado con éxito', test });
  } catch (error) {
    console.error('Error al actualizar estado de prueba:', error);
    res.status(500).json({ message: 'Error al actualizar estado de prueba.' });
  }
});

// Eliminar una prueba
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const test = await Test.findByPk(id);
    if (!test) {
      return res.status(404).json({ message: 'Prueba no encontrada.' });
    }

    await test.destroy();
    res.json({ message: 'Prueba eliminada con éxito' });
  } catch (error) {
    console.error('Error al eliminar prueba:', error);
    res.status(500).json({ message: 'Error al eliminar prueba.' });
  }
});

module.exports = router;
