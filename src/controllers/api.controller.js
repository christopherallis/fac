const express = require('express');

const eventRouter = require('./api/event.controller')
const personRouter = require('./api/person.controller')
const ticketRouter = require('./api/ticket.controller')

const router = require('express-promise-router')()

router.use('/event', eventRouter)
router.use('/person', personRouter)
router.use('/ticket', ticketRouter)

module.exports = router