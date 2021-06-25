const express = require('express');
const exphbs = require('express-handlebars')
const path = require('path')

const indexRouter = require("./src/routes/index.router")

const port = 3000

const app = express();

// CONFIGURE HBS
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: {
        section: function(name, options) {
            if(!this._fromPage) this._fromPage = {};
            this._fromPage[name] = options.fn(this);
            return null;
        }
    }
}));
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'hbs');

// CONFIGURE STATIC
app.use('/static', express.static(path.join(__dirname, 'static')))

// CONFIGURE ROUTERS
app.use('/', indexRouter);
//app.use('/about', aboutRouter);

// HANDLE 404
app.use((req, res, next) => {
    // TODO 404 error
    res.sendStatus(404);
});

// HANDLE ERRORS
/*app.use((err, req, res, next) => {
    //TODO 500 error
    res.sendStatus(500);
})*/

app.listen(port, () => {
    console.log('App running...')
})