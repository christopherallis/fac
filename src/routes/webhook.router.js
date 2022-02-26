const express = require('express');
const got = require('got');

const router = express.Router();

const localtunnel = process.env.LOCALTUNNEL

router.get('/facebook/', (req, res, next) => {
    console.log(req.query)
    res.send(req.query["hub."])
});

router.post('/facebook/', (req, res, next)  => {
    console.log(req.body)
});

router.get('/dev/facebook/', (req, res, next) => {
    res.status(200).send((await got.get(localtunnel + req.originalUrl)).body);
});

router.post('/dev/facebook/', (req, res, next) => {
    res.status(200).send((await got.post(localtunnel + req.originalUrl, {
       body: req.body
    })).body);
});



module.exports = router