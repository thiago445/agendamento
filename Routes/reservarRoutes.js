const express = require('express');
const router = express.Router();
const { bookTime } = require('../Controllers/SheduleController');

router.post('/', async (req, res) => {
    const { date, time, serviceId, professionalId } = req.body;
    const userId = req.session.userId;
    try {
        const result = await bookTime(date, time, serviceId, professionalId, userId);
        res.json(result); // Envia a resposta JSON
    } catch (error) {
        console.error('Error booking time:', error);
        res.status(500).json({ error: 'Error booking time' });
    }
});


module.exports = router;