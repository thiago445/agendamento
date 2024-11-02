const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/', async (req, res) => {
    // Verifique as credenciais do usuário aqui
    const user = await User.findOne({ where: { name: req.body.name } });

    if (user && user.password === req.body.password) {
        req.session.userId = user.id; // Armazene o userId na sessão
        res.redirect('/');
    } else {
        res.render('home', { showLoginModal: true, loginError: 'Credenciais inválidas' });
    }
});

module.exports = router;