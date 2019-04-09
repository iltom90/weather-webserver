const path = require('path')
const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000



const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('/about', (req, res )=> {
    res.render('about',{
        title : 'About App',
        name : 'Thomas'
    })
})

app.get('', (req, res )=> {
    res.render('index',{
        title : 'Weather App',
        name : 'Thomas'
    })
})

app.get('/weather', (req, res )=> {
    if (!req.query.location){
        res.send('You have to provide a location')
    }else{
        geocode.geocode(req.query.location, (error, { latitude, longitude, location} = {}) => {
            if (error)
                res.send(error)
            else {
                forecast.forecast(latitude, longitude, (error,forecastData) => {
                    if (error)
                        res.send(error)
                    else 
                        res.send({
                            location : location,
                            forecastData: forecastData.body,
                            weather: 'Previsioni per: ' + location + '. ' + forecastData.description
                        })
                })
            }
        })
    }
})

app.get('/help/*', (req, res) =>{
    res.send('My 404 pages help')
})

app.get('*', (req, res) =>{
    res.render('404',{
        errorMessage : '404 not found'
    })
})

app.listen(port, () =>{
    console.log('Server is up on port 3000')
})