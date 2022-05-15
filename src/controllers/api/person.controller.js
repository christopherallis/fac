

const path = require('path')

const express = require('express');
const router = require('express-promise-router')();

const personModel = require('../../models/person.model')

router.get('/:id',  (req, res, next) => {
    personModel.get()
})