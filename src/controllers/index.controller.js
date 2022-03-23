const express = require('express');


const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('partials/index');
});

router.get('/contact', (req, res, next) => {
    res.render('partials/contact');
});

module.exports = router