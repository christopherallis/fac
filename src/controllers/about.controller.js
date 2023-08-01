const express = require('express');


const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('partials/about');
});

router.get('/sof', (req, res, next) => {
    res.render('partials/about/sof');
})

router.get('/history', (req, res, next) => {
    res.render('partials/about/history');
})

router.get('/leadership', (req, res, next) => {
    res.render('partials/about/leadership');
})





module.exports = router