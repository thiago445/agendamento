const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    const userId = req.session.userId;
    if (userId == undefined) {
        res.render('home', { showLoginModal: true });
    } else {
        res.render('home', { showLoginModal: false });
    }
});

module.exports = router;