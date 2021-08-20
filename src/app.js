const path = require('path') // path is used to get the current directory 
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')


const app = express()

// Define paths for Express config
const pathDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(pathDirectory)) // use is a method to configure the middleware && express.static is used to set the static files



app.get('', (req, res) => { // render is a method to render the view
    res.render('index', {
        title: 'Weather',
        name: 'Prantik'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Prantik'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Prantik'
    })
})

app.get('/weather', (req, res) => {     //The Express route handler can access the query string key/value pairs on req.query
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }

    geoCode(req.query.address,(error,{latitude,longitude,location}={})=>{  //default parameters for latitude,longitude and location are empty object
        if(error){
            return res.send({error}) // shorthand for error: error
        }
        forecast(latitude,longitude,(error,forecastdata)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastdata,
                location, // shorthand for location:location
                address: req.query.address
        
            })
    
        })
    })
})


app.get('/help/*', (req, res) => { 
    res.render('404', { 
        title: '404', 
        name: 'Prantik', 
        errorMessage: 'Help article not found.' 
    }) 
})


app.get('*', (req, res) => { // Express has * in route paths.  This is a special character which matches anything
    res.render('404', { 
        title: '404', 
        name: 'Prantik', 
        errorMessage: 'Page not found.' 
    }) 
})


app.listen(3000, () => { // listen is used to start the server
    console.log('Web app listening on port 3000!')
})