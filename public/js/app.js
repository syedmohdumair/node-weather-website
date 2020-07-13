//console.log('Client side javascript file is loaded!')
const weatherForm = document.querySelector('form') 
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    //console.log('testing')
    const location = search.value
   // console.log(location)

   messageOne.textContent='Loading..'
   messageTwo.textContent=''

   fetch('/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            //console.log(data.error)
           // console.log("errrr")
           messageOne.textContent=data.error
        }
        else {
            messageOne.textContent=data.location
            messageTwo.textContent=data.forecast.temperature
        //console.log(data.location)
        //console.log(data.forecast)
        }
    })
})

})