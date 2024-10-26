const express = require('express');
const Test = require('../models/test.model');
const router = express.Router();

// Validación del cuerpo de la solicitud para crear pruebas
const validateTestCreation = (req, res, next) => {
  const { name, description, projectId, status } = req.body;

  if (!name || !description || !projectId) {
    return res.status(400).json({ message: 'Los campos nombre, descripción y projectId son obligatorios.' });
  }

  if (status && !['pending', 'passed', 'failed'].includes(status)) {
    return res.status(400).json({ message: 'El estado de la prueba es inválido.' });
  }

  next(); // Continua si la validación pasa
};

// Crear una prueba asociada a un proyecto
router.post('/', validateTestCreation, async (req, res) => {
  try {
    const { name, description, projectId, status = 'pending' } = req.body; // Valor por defecto

    const newTest = await Test.create({ name, description, projectId, status });
    res.status(201).json(newTest);
  } catch (error) {
    console.error('Error al crear prueba:', error);
    res.status(500).json({ message: 'Error al crear la prueba. Inténtelo de nuevo más tarde.' });
  }
});

// Listar pruebas por proyecto
router.get('/:projectId', async (req, res) => {
  try {
    const { projectId } = req.params;

    if (isNaN(projectId)) {
      return res.status(400).json({ message: 'El ID del proyecto debe ser un número válido.' });
    }

    const tests = await Test.findAll({ where: { projectId } });

    if (tests.length === 0) {
      return res.status(404).json({ message: 'No se encontraron pruebas para este proyecto.' });
    }

    res.json(tests);
  } catch (error) {
    console.error('Error al listar pruebas:', error);
    res.status(500).json({ message: 'Error al listar las pruebas. Intente nuevamente más tarde.' });
  }
});

// Actualizar estado de una prueba
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'passed', 'failed'].includes(status)) {
      return res.status(400).json({ message: 'El estado proporcionado es inválido.' });
    }

    const test = await Test.findByPk(id);
    if (!test) {
      return res.status(404).json({ message: 'Prueba no encontrada.' });
    }

    test.status = status;
    await test.save();

    res.json({ message: 'Estado de la prueba actualizado con éxito.', test });
  } catch (error) {
    console.error('Error al actualizar estado de prueba:', error);
    res.status(500).json({ message: 'Error al actualizar el estado de la prueba.' });
  }
});

// Eliminar una prueba
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ message: 'El ID de la prueba debe ser un número válido.' });
    }

    const test = await Test.findByPk(id);
    if (!test) {
      return res.status(404).json({ message: 'Prueba no encontrada.' });
    }

    await test.destroy();
    res.json({ message: 'Prueba eliminada con éxito.' });
  } catch (error) {
    console.error('Error al eliminar prueba:', error);
    res.status(500).json({ message: 'Error al eliminar la prueba.' });
  }
});

module.exports = router;
