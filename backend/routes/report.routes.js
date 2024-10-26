const express = require('express');
const router = express.Router();
const Project = require('../models/project.model');
const Test = require('../models/test.model');
const Defect = require('../models/defect.model');

// Ruta para generar un informe general
router.get('/', async (req, res) => {
  try {
    const projectCount = await Project.count();
    const tests = await Test.findAll();
    const defects = await Defect.findAll();

    // Asegurar que siempre se devuelvan objetos, incluso si no hay datos
    const testsByStatus = tests.reduce((acc, test) => {
      acc[test.status] = (acc[test.status] || 0) + 1;
      return acc;
    }, {});

    const defectsByStatus = defects.reduce((acc, defect) => {
      acc[defect.status] = (acc[defect.status] || 0) + 1;
      return acc;
    }, {});

    const report = {
      totalProjects: projectCount,
      totalTests: tests.length,
      testsByStatus,
      defectsByStatus,
    };

    res.status(200).json(report);
  } catch (error) {
    console.error('Error al generar el reporte:', error);
    res.status(500).json({ message: 'Error al generar el reporte.' });
  }
});

// Ruta para generar un informe por proyecto
router.get('/:projectId', async (req, res) => {
  const { projectId } = req.params;

  try {
    // Verificar que el proyecto exista e incluir pruebas y defectos
    const project = await Project.findByPk(projectId, {
      include: [
        {
          model: Test,
          as: 'Tests',
          include: [{ model: Defect, as: 'Defects' }],
        },
      ],
    });

    if (!project) {
      return res.status(404).json({ message: 'Proyecto no encontrado.' });
    }

    const report = {
      projectName: project.name,
      totalTests: project.Tests.length,
      testsByStatus: project.Tests.reduce((acc, test) => {
        acc[test.status] = (acc[test.status] || 0) + 1;
        return acc;
      }, {}),
      defectsByStatus: project.Tests.flatMap((test) => test.Defects).reduce((acc, defect) => {
        acc[defect.status] = (acc[defect.status] || 0) + 1;
        return acc;
      }, {}),
    };

    res.status(200).json(report);
  } catch (error) {
    console.error('Error al generar el reporte del proyecto:', error);
    res.status(500).json({ message: 'Error al generar el reporte del proyecto.' });
  }
});

module.exports = router;
