

const path = require('path')

const express = require('express');
const router = require('express-promise-router')();

const ticketModel = require('../../models/ticket.model')


router.get('/:id?',  async (req, res, next) => {
    let jsonResponse
    if (req.params['id'] !== undefined) {
        jsonResponse = await ticketModel.get(req.params.id)
    } else {
        jsonResponse = await ticketModel.getAll()
    }
    console.log(jsonResponse)
    res.json(jsonResponse)
})

router.post('/', async (req, res, next) => {
    
    let personId = req.body.personid

    let eventid = req.body.eventid
    let list = req.body.list
    if (list !== undefined) {
        for (let i in list) {
            ticketModel.create(list[i], personId)
        }
    } else {
        ticketModel.create(eventid, personId)
    }
    res.sendStatus(200)
})

module.exports = router