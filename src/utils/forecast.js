const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url ='https://api.darksky.net/forecast/621e5b6eccceb7dd99a7da50522d0aa5/' + latitude + ',' + longitude + '?units=si&lang=it'
    request({ url: url, json:true}, (error, { body}) =>{    
        if(error){                 
            callback({error:error},undefined)    
        }
        else if(body.error){   
            callback({error:body.error},undefined)
        }
        else {   
            if (body.error)   
                callback(body.error,undefined)
            else 
                callback(undefined ,{
                    description: 'Ciao Jessica, ecco le previsioni per ' +  body.daily.summary,
                    body
                 } )            
        }
    })
}

module.exports = {
    forecast:forecast
}