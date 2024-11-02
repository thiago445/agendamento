const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Não foi possível fazer o logout.');
        }
        res.redirect('/'); 
    });
});

module.exports= router;