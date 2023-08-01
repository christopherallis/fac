const express = require('express');
//const ytLive = require('../lib/youtube-live')

const router = require('express-promise-router')()

router.get('/', async (req, res, next) => {
    //await ytLive.getLive()
    res.render('partials/index');
});

router.get('/ministry', async (req, res, next) => {
    res.render('partials/ministry');
});

router.get('/contact', async (req, res, next) => {
    res.render('partials/contact');
});

module.exports = router