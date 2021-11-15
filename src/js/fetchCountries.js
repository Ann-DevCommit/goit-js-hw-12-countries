export default function fetchCountries(inputContryName) {

}

function fetchCountries (inputContryName) {
   return fetch(`https://restcountries.com/v2/name/${inputContryName}`)
       .then(response => {
           
           if (response.ok) return response.json()
           throw new Error()
       })
            
}