const request = require('request')

const geocode = (address, callback ) => {
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibWF0dGZpY2tlIiwiYSI6ImNqNnM2YmFoNzAwcTMzM214NTB1NHdwbnoifQ.Or19S7KmYPHW8YjRz82v6g&cachebuster=1554732125895&autocomplete=true'

    request({ url, json:true}, (error, { body }) =>{   
        
        if(body){        
            if(body.features.length > 0)
                callback(undefined,{
                    latitude:body.features[0].center[0],
                    longitude: body.features[0].center[1],
                    location : body.features[0].place_name
                    })
            else
                callback({error: 'location not found'},undefined)
        }else
            callback({ error: error},undefined)
    })
}

module.exports = {
    geocode: geocode
}