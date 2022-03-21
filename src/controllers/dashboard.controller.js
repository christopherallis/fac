const path = require('path')

const express = require('express');
const session = require('express-session')
const router = require('express-promise-router')();

const userModel = require('../models/user.model')

router.use(session({
    secret: ")asd#$@fj3028i4rjlkjsdjhfl8(#$@W$Hjklj345l@#$%KLzxc",
    resave: true,
    saveUninitialized: false,
    proxy: (process.env.NODE_ENV == "production"),
    cookie: {
        httpOnly: true,
        secure: (process.env.NODE_ENV == "production"),
        sameSite: true
    }
}))

router.get('/', (req, res, next) => {
    res.redirect(req.baseUrl + '/main')
})

router.get('/login', (req, res, next) => {
    if (req.session.loggedin) {
        res.redirect('./main')
    } else {
        res.render('partials/login.hbs', {
            layout: 'dashboard.hbs'
        })
    }
})
router.post('/login', async (req, res, next) => {
    // login
    try {
        let userInfo = await userModel.checkCredentials(req.body.username, req.body.password)

        if (userInfo) {
            console.log(req.body.username,"logged in...")
            req.session.loggedin = true
            req.session.username = req.body.username
            req.session.userid = userInfo.id
            res.redirect('./main')
        } else {
            throw "failed" 
        }
    } catch (err) {
        console.log(err)
        res.render('partials/login.hbs', {
            layout: 'dashboard.hbs',
            error: true
        })
    }
})
router.get('/logout', (req, res, next) => {
    req.session.destroy()
    res.redirect('./login')
})

// middleware for authenticated actions will go here
router.use((req, res, next) => {
    console.log(req.session)
    if (req.session.loggedin) {
        next()
    } else {
        res.redirect('/dashboard/login')
    }
})

router.use('/static', express.static(path.join(__dirname,'..', 'views', 'dist')));

router.get('/main', (req, res, next) => {
    res.sendFile(path.join(__dirname,'..', 'views', 'dist', 'index.html'))
})






module.exports = router