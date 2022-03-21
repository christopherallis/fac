const express = require('express');

const router = express.Router();

const tokenValue = process.env.META_VERIFY_TOKEN || "token"

var facebook_updates = [];

router.get('/facebook/', (req, res, next) => {
    console.log(req.query)
    if (req.query["hub.verify_token"] == tokenValue) {
        res.send(req.query["hub.challenge"]);
    } else {
        res.sendStatus(401);
    }
});

router.get('/facebook/view/', (req, res, next) => {
    res.send('<pre>' + JSON.stringify(facebook_updates, null, 2) + '</pre>');
});

router.post('/facebook/', (req, res, next)  => {
    console.log(req.body)
    facebook_updates.unshift(req.body)
    res.sendStatus(200);
});





module.exports = router