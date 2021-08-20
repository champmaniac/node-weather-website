const request = require('request')
const geoCode = (address,callback)=>{
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiY2hhbXBtYW5pYWMiLCJhIjoiY2tzaDd3bGx2MXJ4OTJvbzMwdXk3eXc0bSJ9.G_hKaW1X3CI3gbIyRVJ6MQ&limit=1'

    request({url,json:true},(error, {body}) => { // Destructuring the response object --> {body}
        if(error){
            callback('Unable to connect to the weather service',undefined)
        }
        else if(body.features.length==0){
            callback('Unable to find location',undefined)
        } else{
            const longitude = body.features[0].center[0]
            const latitude = body.features[0].center[1]
            callback(undefined,{
                latitude:latitude,
                longitude:longitude,
                location:body.features[0].place_name
            })
        }
    })

}

module.exports = geoCode