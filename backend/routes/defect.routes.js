const express = require('express');
const Defect = require('../models/defect.model');
const router = express.Router();

// Crear un defecto asociado a una prueba
router.post('/', async (req, res) => {
  try {
    const { title, description, testId } = req.body;
    const newDefect = await Defect.create({ title, description, testId });
    res.status(201).json(newDefect);
  } catch (error) {
    console.error('Error al crear defecto:', error);
    res.status(500).json({ message: 'Error al crear defecto.' });
  }
});

// Listar defectos por prueba
router.get('/:testId', async (req, res) => {
  try {
    const { testId } = req.params;
    const defects = await Defect.findAll({ where: { testId } });
    res.json(defects);
  } catch (error) {
    console.error('Error al listar defectos:', error);
    res.status(500).json({ message: 'Error al listar defectos.' });
  }
});

// Actualizar un defecto
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const defect = await Defect.findByPk(id);
    if (!defect) return res.status(404).json({ message: 'Defecto no encontrado.' });

    defect.status = status;
    await defect.save();
    res.json({ message: 'Estado actualizado con éxito', defect });
  } catch (error) {
    console.error('Error al actualizar defecto:', error);
    res.status(500).json({ message: 'Error al actualizar defecto.' });
  }
});

// Eliminar un defecto
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const defect = await Defect.findByPk(id);
    if (!defect) return res.status(404).json({ message: 'Defecto no encontrado.' });

    await defect.destroy();
    res.json({ message: 'Defecto eliminado con éxito' });
  } catch (error) {
    console.error('Error al eliminar defecto:', error);
    res.status(500).json({ message: 'Error al eliminar defecto.' });
  }
});

module.exports = router;
