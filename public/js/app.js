console.log('Client Side JavaScript file is loaded');

// fetch('http://puzzle.mead.io/puzzle').then((response)=> {
//     response.json().then((data)=> {
//         console.log(data)
//     })
// }) 


// fetch('http://localhost:3000/weather?address=Kolkata').then((response)=> {
//     response.json().then((data)=> {
//         if(data.error){
//             console.log(data.error)
//         }
//         else{
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     })
// }) 

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')

const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From JavaScript'

weatherForm.addEventListener('submit', (event)=> {
    const location = search.value
    event.preventDefault() // prevent default action i.e no refresh

    messageOne.textContent = 'Fetching weather data...'
    messageTwo.textContent = ''
    fetch('http://localhost:3000/weather?address='+location).then((response)=> {
    response.json().then((data)=> {
        if(data.error){
            messageOne.textContent = data.error
        }
        else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
}) 
})