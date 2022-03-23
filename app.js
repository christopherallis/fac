const express = require('express');
const exphbs = require('express-handlebars')
const path = require('path')

const indexRouter = require("./src/controllers/index.controller")
const aboutRouter = require("./src/controllers/about.controller")
const webhookRouter = require("./src/controllers/webhook.controller")
const dashboardRouter = require("./src/controllers/dashboard.controller")

const port = process.env.PORT || 3002

const app = express()

// MIDDLEWARE SETUP

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// CONFIGURE HBS
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: {
        section: function(name, options) {
            if(!this._fromPage) this._fromPage = {}
            this._fromPage[name] = options.fn(this)
            return null
        }
    }
}));
app.set('views', path.join(__dirname, 'src', 'views'))
app.set('view engine', 'hbs')

// ENFORCE HTTPS
app.use((req, res, next) => {
    if ("https" !== req.headers["x-forwarded-proto"] && "production" === process.env.NODE_ENV) {
        res.redirect("https://" + req.hostname + req.url);
    } else {
        next()
    }
})

// CONFIGURE STATIC
app.use(express.static(path.join(__dirname, 'static')))

app.use('/dashboard/static',express.static(path.join(__dirname, 'src', 'views', 'dists')))

// CONFIGURE ROUTERS
app.use('/', indexRouter)
app.use('/about', aboutRouter)
app.use('/webhook', webhookRouter)
app.use('/dashboard', dashboardRouter)

// HANDLE 404
app.use((req, res, next) => {
    // TODO 404 error
    res.sendStatus(404)
})

// HANDLE ERRORS
/*app.use((err, req, res, next) => {
    //TODO 500 error
    res.sendStatus(500);
})*/

app.listen(port, () => {
    console.log('App running...')
})