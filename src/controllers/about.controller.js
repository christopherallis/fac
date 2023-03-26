const express = require('express');


const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('partials/about');
});

router.get('/services', (req, res, next) => {
    res.render('partials/services');
});




module.exports = router