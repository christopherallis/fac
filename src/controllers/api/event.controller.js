const path = require('path')

const express = require('express')
const router = require('express-promise-router')()

const eventModel = require('../../models/event.model')

router.get('/:id?',  async (req, res, next) => {
    let jsonResponse
    if (req.params['id'] !== undefined) {
        jsonResponse = await eventModel.get(req.params.id)
    } else {
        jsonResponse = await eventModel.getAll()
    }
    console.log(jsonResponse)
    res.json(jsonResponse)
})

router.post('/', async (req, res, next) => {
    let eventName = req.body.eventName
    let desc = req.body.desc
    eventModel.create(eventName, Date.now(), Date.now())
    res.sendStatus(200)
})

module.exports = router