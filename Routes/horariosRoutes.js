const express = require('express');
const router = express.Router();
const { getAvailableTimeSlots } = require('../Controllers/SheduleController');
const Professional = require('../models/Professional');

router.get('/:date', async (req, res) => {
    const { date } = req.params;
    const { serviceId, professionalId } = req.query;

    const professional = await Professional.findByPk(professionalId);
    const availableSlots = await getAvailableTimeSlots(date, professional.id);
    res.json(availableSlots);
});

module.exports = router;