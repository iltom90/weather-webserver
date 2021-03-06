const whaterForm = document.querySelector('form')
const search = document.querySelector('input')
const weatherDesc = document.querySelector('#weather')
const errors = document.querySelector('#error')



whaterForm.addEventListener('submit', (e) =>{
    e.preventDefault()    
    errors.textContent=''
    weatherDesc.textContent=''
    const location = search.value
    
    fetch('/weather?location=' + location).then((response)=>{
        response.json().then((data) =>{
            if (data.error){                
                errors.textContent= data.error
            }else{
                weatherDesc.textContent = 'Ciao Jessica, ecco le previsioni per ' + data.location + '. ' + data.weather
            }            
        })   
    })
})
