const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { json } = require('body-parser');

router.use('/', function(req,res){
    const userId = req.session.userId;
    const user = User.findByPk(userId);
    res.json(user);
})

module.exports= router;