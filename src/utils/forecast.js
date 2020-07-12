/*
const request = require('request')
const forecast = (latitude,longitude,callback) => {
    const url='http://api.weatherstack.com/current?access_key=ebb1a64a1de906885cf05c26b037b8c2&query='+ latitude + ',' + longitude

    request({url:url,json:true},(error,response) => {
        if(error){
            callback('Unable to connect to weather service app',undefined)
        }
        else if(response.body.error) {
            callback('Unable to find this location',undefined)
        }
        else{
            callback(undefined,response.body.current)
        }
    })
}

module.exports=forecast

*/

//Using shorthand and destructuring
/*
const request = require('request')
const forecast = (latitude,longitude,callback) => {
    const url='http://api.weatherstack.com/current?access_key=ebb1a64a1de906885cf05c26b037b8c2&query='+ latitude + ',' + longitude

    request({url,json:true},(error,{body}) => {
        if(error){
            callback('Unable to connect to weather service app',undefined)
        }
        else if(body.error) {
            callback('Unable to find this location',undefined)
        }
        else{
            //callback(undefined,response.body.current)
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports=forecast
*/

const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=864ae9241c6077eea5891cb552660b0d&query='+ latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        //console.log(body)
         if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find locationsss', undefined)
        } else {
            callback(undefined, body.current)
        } 
    })
}

module.exports = forecast