const express = require('express');


const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('partials/about');
});

router.get('/services', (req, res, next) => {
    res.render('partials/services');
});

router.get('/privacy-policy', (req, res, next) => {
    res.render('partials/privacy');
});



module.exports = router