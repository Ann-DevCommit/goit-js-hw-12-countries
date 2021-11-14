import './sass/main.scss';
import { debounce } from 'lodash';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import fetchCountries from './js/fetchCountries'
import countryListTemplate from './templates/country-list.hbs'
import countryCardTemplate from './templates/country-card.hbs'
import './partials/country-search.html'


// console.log(alert)
// console.log(error)



  
// const country = 'sp'

// fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(response => response.json())
//     .then(r => console.log(r))
//     .catch(error => console.log("error", error));
    
// fetch(`https://restcountries.com/v2/name/Macau`)
//     .then(response => response.json())
//     .then(r => console.log(r))
//     .catch(error => console.log("error", error));
    
const inputEl = document.querySelector('.country-input')
const resultContainerEl = document.querySelector('.js-result-container')

console.log(inputEl)
console.log(resultContainerEl)

inputEl.addEventListener('input', debounce(onCountrySearch, 500))



function onCountrySearch(event) {

    const inputContryName = event.target.value
    console.log(event.target.value)

    if (!inputContryName)
        return;

    fetchCountries(inputContryName).then(
        function responseError(countries) {
            if (countries.status === 404) {
                        errorMessage('404, Таких стран не бывает :)')
                        console.log('404, Таких стран не бывает :)')
                        return
                        
                    }
                    
                    // countries => {
            const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(inputContryName))
                console.log(countries)
                console.log(filteredCountries)
                return filteredCountries
            }
                // }
        
            
     )
         .then(renderCountries)
         .catch(error => console.log('catch error. Страна не найдена', error));
    
    
    
    
    
}
    

// function getApi (inputContryName){
//      fetch(`https://restcountries.com/v2/name/${inputContryName}`)
//          .then(response => response.json())
//          .then(countries => {
//                          if (countries.status === 404){
//                          console.log('404, Таких стран не бывает :)')
//                          return
//                         }
//                     }
             
//                 )
//          .catch(error => console.log('Страна не найдена', error));
// }
      


function renderCountries(filteredCountries) {
    if (filteredCountries.length === 1) {

        // { name } = filteredCountries;
        // resultContainerEl.insertAdjacentElement('beforeend', countryCardTemplate(...filteredCountries))
        // countryCardTemplate(...filteredCountries)
        console.log(filteredCountries)
        return
    }
    if (((filteredCountries.length >= 2) && (filteredCountries.length <= 10))) {
        resultContainerEl.insertAdjacentElement('beforeend', countryCardTemplate(...filteredCountries))
        console.log(filteredCountries)
        return
    }
    if ((filteredCountries.length < 1)) {
        errorMessage('Таких стран не бывает :)')
        console.log('Таких стран не бывает :)')
        
    }
    else {
        errorMessage('Введите более специфичное значение')
        console.log('Введите более специфичное значение')
    }
}

function errorMessage(message) {
    error({
            text: `${message}`,
            title: false,
            icon: false,
            closer: false,
            sticker: false,
            delay: 1000,
            });
}


// function chackCommonName(countries, inputContryName) {
//     const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(`${inputContryName}`))
//     if (!filteredCountries) {
//         alert('Страна не найдена')
//         return
//     }
//     return console.log(inputContryName)
// }

// console.log(2 <= 1 )

// function getApi() {
//     fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(response => response.json())
//     .then(r => console.log(r))
//     .catch(error => console.log("error", error));
// }
const users = [
  { id: '000', name: 'Mango', isActive: true },
  { id: '001', name: 'Poly', isActive: false },
  { id: '002', name: 'Ajax', isActive: true },
  { id: '003', name: 'Chelsey', isActive: false },
];

const any = users.filter(user => user.name.toLowerCase().includes('hhhhhhan'))
console.log(any)