

const path = require('path')

const express = require('express');
const router = require('express-promise-router')();

const ticketModel = require('../../models/ticket.model')


router.get('/:id?',  async (req, res, next) => {
    let jsonResponse
    if (req.params['id'] !== undefined) {
        jsonResponse = await ticketModel.get(req.params.id)
    } else {
        console.log(req.query)
        if (req.query['eventid'] !== undefined) {
            jsonResponse = await ticketModel.getWithEvent(req.query.eventid)
        } else {
            res.sendStatus(400)
        }
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
            await ticketModel.create(list[i], personId)
        }
    } else {
        await ticketModel.create(eventid, personId)
    }
    res.sendStatus(200)
})

router.post('/consume', async (req, res, next) => {
    let eventid = req.body.eventid
    let uuid = req.body.uuid

    try {
        let [success, person] = await ticketModel.consume(eventid, uuid)
        
        res.json({success: success, person: person})
    } catch(e) {
        console.log(e)
        res.sendStatus(404)
    }

})

module.exports = router