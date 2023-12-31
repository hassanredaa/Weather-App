const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()



app.set('view engine', 'hbs')
app.set('views' , path.join(__dirname,'../templates/views'))
hbs.registerPartials(path.join(__dirname,'../templates/partials'))
app.use(express.static(path.join(__dirname,'../public')))

app.get('',(req, res) => {
    res.render('index',{
        title: 'Weather app',
        name: 'Hassan'
    })
})

app.get('/about' , (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Hassan'
    })
})

app.get('/help', (req, res) =>{
    res.render('help' ,{
        text: 'This is some helpful text',
        title: 'Help',
        name: 'hassan'
        
    })
})

app.get('/weather' , (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'you must provide a address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
       if(error){ return res.send({error})}
       forecast(latitude,longitude, (error,forecastData) => {
        if (error){
            return res.send({error})
        }
        res.send({
            forecast: forecastData,
            location,
            address: req.query.address

        })
       })
    })

})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'you must provide a search term'
        })
    }
    res.send({
       products:[] 
    })
})

app.get('/help/*' , (req, res) => {
    res.render('404',{
        text: 'Help not found',
        title: 'Help Error',
        name: 'hassan'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        text: 'My 404 page',
        title: '404',
        name: 'hassan'
    })
})

app.listen(3000, () => {
    console.log('server is up on port 3000')
})