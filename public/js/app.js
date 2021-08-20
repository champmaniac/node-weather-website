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
    fetch('/weather?address='+location).then((response)=> {
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