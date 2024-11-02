// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/', async (req, res) => {
  try {
    const { name,password, telephone } = req.body;
    await User.create({ name,password, telephone });
    res.redirect('/');
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).send('Erro ao criar usuário');
  }
});

module.exports = router;