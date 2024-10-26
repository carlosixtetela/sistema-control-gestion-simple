const express = require('express');
const Project = require('../models/project.model');
const Test = require('../models/test.model');
const Defect = require('../models/defect.model');
const router = express.Router();

// Generar reporte general
router.get('/', async (req, res) => {
  try {
    const totalProjects = await Project.count();
    const totalTests = await Test.count();
    const testsByStatus = await Test.findAll({
      attributes: ['status', [Test.sequelize.fn('COUNT', '*'), 'count']],
      group: ['status'],
    });

    const defectsByStatus = await Defect.findAll({
      attributes: ['status', [Defect.sequelize.fn('COUNT', '*'), 'count']],
      group: ['status'],
    });

    const report = {
      totalProjects,
      totalTests,
      testsByStatus,
      defectsByStatus,
    };

    res.json(report);
  } catch (error) {
    console.error('Error al generar reporte:', error);
    res.status(500).json({ message: 'Error al generar reporte.' });
  }
});

module.exports = router;
