const request = require('request')
const geocode=(address,callback)=> {
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' + address +'.json?access_token=pk.eyJ1Ijoic3llZHVtYWlyIiwiYSI6ImNrYzhuOWYzaTAxcGQyc3FubjJ2OGZoYWwifQ.CzRtoAct7Xph6fR0Cgj_GQ&limit=1'

    request({url:url, json:true}, (error,{body}) => {
        //console.log(body.features.length)

        if(error) {
            console.log('Unable to connect to location services',undefined)
        }
        else if(body.features.length === 0) {
            callback(undefined,'Unable to find location geocode. Try another search')
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })
}

module.exports=geocode