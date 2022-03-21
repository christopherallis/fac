const express = require('express');


const router = express.Router();

router.get('/user', (req, res, next) => {
    res.render('partials/index');
});

module.exports = router