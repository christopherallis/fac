const path = require('path')

const express = require('express');
const router = require('express-promise-router')();

const eventModel = require('../../models/event.model')

router.get('/:id',  (req, res, next) => {
    res.send(await eventModel.get())
})

router.push('/', (req, res, next) => {
    let eventName = req.body.eventName
    let desc = req.body.desc
    eventModal.create(eventName, Date.now(), Date.now())
    res.sendStatus(200)
})