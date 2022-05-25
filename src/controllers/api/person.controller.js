

const path = require('path')

const express = require('express');
const router = require('express-promise-router')();


const ticketModel = require('../../models/ticket.model')
const personModel = require('../../models/person.model')


router.get('/:id?',  async (req, res, next) => {
    let jsonResponse
    if (req.params['id'] !== undefined) {
        jsonResponse = await personModel.get(req.params.id)
    } else {
        jsonResponse = await personModel.getAll()
    }
    res.json(jsonResponse)
})

router.post('/', async (req, res, next) => {
    let firstName = req.body.firstname
    let lastName = req.body.lastname
    let desc = req.body.desc
    personModel.create(firstName, lastName)
    res.sendStatus(200)
})

router.get('/:id/ticket',  async (req, res, next) => {
    let jsonResponse
    if (req.params['id'] !== undefined) {
        jsonResponse = await ticketModel.getWithPerson(req.params.id)
    }
    console.log(jsonResponse)
    res.json(jsonResponse)
})

module.exports = router