const express = require('express');
const exphbs = require('express-handlebars')
const path = require('path')

const indexRouter = require("./src/controllers/index.controller")
const aboutRouter = require("./src/controllers/about.controller")

const port = process.env.PORT || 3002

const app = express()

const isProduction = (process.env.NODE_ENV == "production")


// MIDDLEWARE SETUP
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// REDIRECT FROM FRIENDLYARABIC.CHURCH TO BCCLEMMONS.COM
app.use((req, res, next) => {
    if (req.hostname == "friendlyarabic.church") {
        res.redirect(301, `https://bcclemmons.com${req.path}`)
    } else {
        next()
    }
})

// ENFORCE HTTPS
app.use((req, res, next) => {
    if ("https" !== req.headers["x-forwarded-proto"] && "production" === process.env.NODE_ENV) {
        res.redirect("https://" + req.hostname + req.url)
    } else {
        next()
    }
})

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


if (isProduction) {
    
} else {
    // add CORS header for developement only
    // TODO do I need this anymore??
    console.log("Add COR header")
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "http://localhost:8080")
        res.header("Access-Control-Allow-Methods", "POST,GET,DELETE,PUT")
        res.header("Access-Control-Allow-Headers", "Content-Type")
        next()
    }) 
}

// CONFIGURE STATIC
app.use(express.static(path.join(__dirname, 'static')))

// CONFIGURE ROUTERS
app.use('/', indexRouter)
app.use('/about', aboutRouter)

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