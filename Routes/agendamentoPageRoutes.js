
const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('agendamento'); // Apenas renderiza a página inicialmente
});

module.exports = router;