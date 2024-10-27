const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db.config');
const authRoutes = require('./routes/auth.routes');
const projectRoutes = require('./routes/project.routes');
const testRoutes = require('./routes/test.routes');
const defectRoutes = require('./routes/defect.routes');
const reportRoutes = require('./routes/report.routes');


const app = express();
app.use(cors());
app.use(express.json());

// Rutas de proyectos
app.use('/api/projects', projectRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/tests', require('./routes/test.routes'));
app.use('/api/defects', defectRoutes);// Rutas de defectos
app.use('/api/reports', reportRoutes);// Rutas de reportes

//sincronizacion del Modelo
const startServer = async () => {
  try {
    await sequelize.sync({ force: false, alter: false });
    console.log('Modelos sincronizados correctamente.');

    // Iniciar el servidor
    app.listen(process.env.PORT || 3000, () => {
      console.log('Servidor corriendo en http://localhost:3000');
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
};

startServer();
