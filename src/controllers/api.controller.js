const express = require('express');

const eventRouter = require('./api/event.controller')
const personRouter = require('./api/person.controller')

const router = require('express-promise-router')()

router.use('/event', eventRouter)
router.use('/person', personRouter)


module.exports = router