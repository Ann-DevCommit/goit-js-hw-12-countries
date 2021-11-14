export default function fetchCountries(inputContryName) {

}

function fetchCountries (inputContryName) {
   return fetch(`https://restcountries.com/v2/name/${inputContryName}`)
        .then(response => response.json())
    // .then()
                // response => response.json(),
                // function responseError(error) {
                //     if (error.status === 404) {
                //         console.log('404, Таких стран не бывает :)')
                        
                //     }
                //     return 
                //     // else {
                //     //     throw error
                //     // }
                // }
            
}