

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
    let uuid = req.body.uuid
    let agegroup = req.body.agegroup
    console.log(firstName, lastName, uuid, agegroup)
    await personModel.create(firstName, lastName, uuid, agegroup)
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

router.put('/:id', async (req, res, next) => {
    // update
})

module.exports = router