const express = require('express');
const router = express.Router();
const getAllController = require('../Controllers/getAllController');

router.get('/', async (req, res) => {
    try {
        const appointments = await getAllController.getAllAppointments();
        res.json(appointments); // Envia os dados como JSON
    } catch (error) {
        console.error('Erro ao obter agendamentos:', error);
        res.status(500).json({ message: 'Erro ao obter agendamentos.' });
    }
});

module.exports = router;
