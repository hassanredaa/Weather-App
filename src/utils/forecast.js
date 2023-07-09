const request = require('postman-request')

const forecast = (x,y,callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=630424790f4789aeb4834c4c146b846e&query=' + y + ',' + x
    request({url,json:true}, (error,{body}) => {
    if(error){
        callback('Unable to connect',undefined)
    }
    else if(body.error){
        callback(body.error.info,undefined)
    }
    else{
    callback(undefined,body.current.weather_descriptions[0] + ' .The current temp is '+ body.current.temperature + ' degrees & it feels like '+ body.current.feelslike + ' degrees.')
    }
})

}

module.exports = forecast