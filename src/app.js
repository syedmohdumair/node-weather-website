const path =require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast =require('./utils/forecast')

const app = express()

//Define paths for express directory
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Set up handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Acts as an index page, Setup static directory serve
app.use(express.static(publicDirectoryPath))

// For index page
app.get('',(req,res) => {
    res.render('index',{
        title:'Weather App',
        name:'Abcde'
    })
})
//FOr About page
app.get('/about',(req,res) => {
    res.render('about',{
        title:'About mE',
        name:'fghi'
    })
})
//For help page
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Ijklm'
    })
})

/*
app.get('',(req,res) => {
    res.send('<h1> Weather </h1>')
}) 

app.get('/help',(req,res) => {
    res.send({
        name:'Abc',
        age:1
    })
})

app.get('/about',(req,res)=>{
    res.send('<h1>About </h1>')
})
*/

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast:forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

// for search query string
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error : 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'SMU',
        errorMessage:'Help article not found'
    })
})
// for 404 page
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'SMU',
        errorMessage:'Page not found'
    })
})

app.listen(3000,() => {
    console.log('Server is up on port 3000')
})