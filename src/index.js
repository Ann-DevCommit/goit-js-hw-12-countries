import './sass/main.scss';
import { debounce } from 'lodash';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import fetchCountries from './js/fetchCountries'
import countryListTemplate from './templates/country-list.hbs'
import countryCardTemplate from './templates/country-card.hbs'
import './partials/country-search.html'



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

    fetchCountries(inputContryName)
        .then(
            function responseError(countries) {
                    if (countries.status === 404) {
                        errorMessage('404, Таких стран не бывает :)')
                        console.log('404, Таких стран не бывает :)')
                        return
                   }
                    
                    
                const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(inputContryName))
                console.log(countries)
                console.log(filteredCountries)
                return filteredCountries
            }
        )
        .then(renderCountries)
        .catch(error => console.log('catch error. Страна не найдена', error));
}
    



function renderCountries(filteredCountries) {
    if (filteredCountries.length === 1) {

        const countryCardToRender = countryCardTemplate(...filteredCountries)
        console.log(countryCardTemplate(...filteredCountries))
        console.log(countryCardTemplate(filteredCountries))

        console.log(countryCardToRender)
        console.log(typeof countryCardToRender)
        // resultContainerEl.insertAdjacentHTML('beforeend', countryCardToRender)
        resultContainerEl.innerHTML = countryCardToRender
        
        return
    }
    if (((filteredCountries.length >= 2) && (filteredCountries.length <= 10))) {

        console.log(filteredCountries)
        console.log(typeof filteredCountries)

        const countryListToRender = countryListTemplate(filteredCountries)
        console.log(countryListToRender)
        console.log(typeof countryListToRender)
                // resultContainerEl.insertAdjacentHTML('beforeend', countryListToRender)
        resultContainerEl.innerHTML = countryListToRender
        
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
            addClass: 'modal',
            text: `${message}`,
            title: false,
            icon: false,
            closer: false,
            sticker: false,
            delay: 0,
            });
}


