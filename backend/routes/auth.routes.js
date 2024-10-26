const express = require('express');
const User = require('../models/user.model');
const router = express.Router();

// Ruta de Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email, password } });
    if (!user) {
      return res.status(401).json({ message: 'Usuario o contraseña incorrectos.' });
    }
    res.json({ message: 'Login exitoso.', user });
  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ message: 'Error del servidor.' });
  }
});

module.exports = router;
