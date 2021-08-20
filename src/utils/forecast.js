const request = require('request')

const forecast =(latitude,longitude,callback)=>{
    const url ='https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=05bbbe80d1f6f8dff44580425f70ecb9'

    request({url,json:true},(error, {body}) => {
        if(error){
            callback('Unable to connect to the weather service',undefined)
        }
        else if(body.error){
            callback('Unable to find location',undefined)
        } else{
            callback(undefined,'The Current Condition is '+body.weather[0].main+ '. It is currently ' + body.main.temp + ' Kelvin '+ ' & Humidity is : '+body.main.humidity+' out at '+ body.name)
            
        }
    })

}


module.exports=forecast