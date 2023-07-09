const request = require('postman-request')

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaGFzc2FucmVkYSIsImEiOiJjbGpwemFrOWwwMWtsM2dtajRlNXlmMTcxIn0.j6jaKtEZ0Wy-7mMQ3iD3SA&limit=1'
    request({url ,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to location services',undefined)
        }
        else if(body.features.length === 0){
            callback('Unable to find location',undefined)
        }
        else{
            const latitude = body.features[0].center[1]
            const longitude = body.features[0].center[0]
            callback(undefined,
                {latitude,longitude,location:body.features[0].place_name})
        }
    })
}

module.exports = geocode