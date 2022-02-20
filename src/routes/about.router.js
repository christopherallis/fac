const express = require('express');


const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('partials/about');
});

module.exports = router