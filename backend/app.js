const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db.config');
const authRoutes = require('./routes/auth.routes');
const projectRoutes = require('./routes/project.routes');

const app = express();
app.use(cors());
app.use(express.json());

// Rutas de proyectos
app.use('/api/projects', projectRoutes);
app.use('/api/auth', authRoutes);

const startServer = async () => {
  try {
    await sequelize.sync();
    console.log('Base de datos sincronizada.');

    app.listen(3000, () => {
      console.log('Servidor corriendo en http://localhost:3000');
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
};

startServer();
